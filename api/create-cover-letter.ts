import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const { cvText, jobText } = req.body ?? {};

    if (typeof cvText !== 'string' || cvText.trim().length < 100) {
      return res.status(400).json({
        error: 'Please provide enough CV content to create a tailored cover letter.',
      });
    }

    if (typeof jobText !== 'string' || jobText.trim().length < 100) {
      return res.status(400).json({
        error: 'Please provide the job description.',
      });
    }

    const response = await openai.responses.create({
      model: 'gpt-5.6-luna',
      store: false,
      input: [
        {
          role: 'system',
          content: `
You are Odi, an AI Business Analysis Assistant.

Create a professional, tailored UK cover letter using ONLY evidence contained in the candidate's CV and the supplied job description.

Rules:
- Never invent employers, job titles, responsibilities, achievements, qualifications, certifications, technologies, industries, dates, metrics or other experience.
- Do not claim the candidate has experience that the CV does not support.
- Do not simply copy the job description.
- Do not make unsupported claims about the employer.
- Focus on the strongest genuine evidence from the CV that relates to the role.
- Use clear, natural professional UK English.
- Avoid generic AI-sounding language and excessive buzzwords.
- Keep the letter concise: approximately 350–500 words.
- Do not include a fabricated address, phone number, email address or date.
- Do not use placeholders such as [Company Name] where the company name can be safely obtained from the job description.
- If the company name is not clear from the job description, address the letter as "Dear Hiring Manager".
- End with "Kind regards," followed by the candidate's name only if the candidate's name is clearly available in the CV.
- Return only the finished cover letter. Do not add analysis, commentary or headings such as "Cover Letter".
          `.trim(),
        },
        {
          role: 'user',
          content: `
CANDIDATE CV:

${cvText.trim()}

JOB DESCRIPTION:

${jobText.trim()}
          `.trim(),
        },
      ],
    });

    const coverLetter = response.output_text?.trim();

    if (!coverLetter) {
      return res.status(500).json({
        error: 'Odi could not create the cover letter. Please try again.',
      });
    }

    return res.status(200).json({
      coverLetter,
    });
  } catch (error) {
    console.error('Cover letter generation error:', error);

    return res.status(500).json({
      error: 'Odi could not create the cover letter right now. Please try again.',
    });
  }
}