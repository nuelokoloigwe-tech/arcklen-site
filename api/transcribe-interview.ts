import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI, { toFile } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed.',
    });
  }

  try {
    const { audio, mimeType } = req.body ?? {};

    if (typeof audio !== 'string' || !audio) {
      return res.status(400).json({
        error: 'No audio was provided.',
      });
    }

    const buffer = Buffer.from(audio, 'base64');

    if (!buffer.length) {
      return res.status(400).json({
        error: 'The recorded audio is empty.',
      });
    }

    // Keep recordings reasonably small.
    if (buffer.length > 10 * 1024 * 1024) {
      return res.status(413).json({
        error:
          'The recording is too large. Please keep your answer concise and try again.',
      });
    }

    const safeMimeType =
      typeof mimeType === 'string' && mimeType.startsWith('audio/')
        ? mimeType
        : 'audio/webm';

    const extension = safeMimeType.includes('mp4')
      ? 'm4a'
      : safeMimeType.includes('ogg')
        ? 'ogg'
        : safeMimeType.includes('wav')
          ? 'wav'
          : 'webm';

    const file = await toFile(
      buffer,
      `interview-answer.${extension}`,
      {
        type: safeMimeType,
      }
    );

    const transcription = await openai.audio.transcriptions.create({
      file,
      model: 'gpt-4o-mini-transcribe',
      prompt:
        'Business Analyst interview answer. Preserve Business Analysis terminology, including requirements, stakeholders, processes, Agile, change, transformation, UAT, acceptance criteria, risk, governance, and delivery.',
    });

    return res.status(200).json({
      transcript: transcription.text?.trim() || '',
    });
  } catch (error) {
    console.error('Interview transcription error:', error);

    return res.status(500).json({
      error:
        'Odi could not transcribe your answer right now. Please try again.',
    });
  }
}