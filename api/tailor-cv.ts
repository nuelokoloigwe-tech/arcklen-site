import OpenAI from 'openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const { cvText, jobText } = req.body ?? {};

    if (typeof cvText !== 'string' || cvText.trim().length < 100) {
      return res.status(400).json({
        error: 'Please provide at least 100 characters of CV text.',
      });
    }

    if (typeof jobText !== 'string' || jobText.trim().length < 100) {
      return res.status(400).json({
        error: 'Please provide at least 100 characters of job description.',
      });
    }

    const response = await openai.responses.create({
      model: 'gpt-5.6-luna',
      store: false,
      instructions: `
You are Odi, an AI Business Analysis Assistant created by Arcklen Group.

Your task is to tailor a candidate's CV for a specific Business Analyst or related role.

Use ONLY information contained in the candidate's CV. Use the job description only to understand the target role, its requirements, terminology and priorities.

Critical rules:
- Do not invent employers, responsibilities, qualifications, technologies, achievements, metrics, dates, industries, projects or outcomes.
- Do not add experience merely because the job description asks for it.
- Do not claim the candidate has a skill unless the CV provides evidence for it.
- Do not change factual meaning.
- Do not fabricate metrics or make existing metrics stronger than the evidence supports.
- Preserve employment history, qualifications and dates from the CV.
- You may reorder, condense and rewrite existing content to improve relevance, clarity, ATS searchability and achievement focus.
- You may emphasise existing evidence that is particularly relevant to the target role.
- Where the CV does not support a requirement, do not manufacture wording to fill the gap.
- Keep the output suitable for a professional UK CV.

Return a complete tailored CV in plain text using this structure where the source CV contains the relevant information:

PROFESSIONAL PROFILE

KEY SKILLS

PROFESSIONAL EXPERIENCE

EDUCATION & QUALIFICATIONS

CERTIFICATIONS / TRAINING

TOOLS & TECHNOLOGIES

Use the candidate's existing information and preserve factual accuracy.

The Professional Profile should be concise and clearly position the candidate for the target role.

For each relevant role, rewrite bullets to prioritise evidence that aligns with the job description while remaining faithful to the original CV.

Do not include commentary before or after the CV.
Do not include a match score.
Do not include a list of gaps.
Do not say that information is missing.
Return only the tailored CV text.
      `,
      input: `TARGET JOB DESCRIPTION:\n\n${jobText.trim()}\n\nCANDIDATE CV:\n\n${cvText.trim()}`,
    });

    return res.status(200).json({
      tailoredCv: response.output_text,
    });
  } catch (error) {
    console.error('Odi CV tailoring error:', error);

    return res.status(500).json({
      error: 'Odi could not tailor the CV right now. Please try again.',
    });
  }
}
