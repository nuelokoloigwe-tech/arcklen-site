import OpenAI from 'openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type InterviewHistoryItem = {
  question: string;
  answer?: string;
  feedback?: string;
};

const today = new Date().toISOString().slice(0, 10);

function parseJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Odi returned an invalid interview response.');
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      action,
      interviewType,
      jobText,
      cvText,
      history = [],
      question,
      answer,
    } = req.body ?? {};

    if (typeof jobText !== 'string' || jobText.trim().length < 100) {
      return res.status(400).json({
        error: 'Please provide at least 100 characters of job description.',
      });
    }

    const safeHistory: InterviewHistoryItem[] = Array.isArray(history)
      ? history.slice(-8)
      : [];

    if (action === 'start') {
      const response = await openai.responses.create({
        model: 'gpt-5.6-luna',
        store: false,
        instructions: `
You are Odi, an AI Business Analysis Interview Practice Assistant created by Arcklen Group.

Generate the first realistic interview question for a Business Analyst candidate.

Reference date: ${today}.
Interview focus: ${typeof interviewType === 'string' ? interviewType : 'Job-specific Business Analyst interview'}.

Use the supplied job description as the primary source for role-specific questioning. If CV text is supplied, use only the candidate's stated experience to make the question more personalised.

Do not invent experience, employers, qualifications, technologies, achievements, metrics or responsibilities.
Do not claim a date is current, future or past unless the supplied evidence establishes it.

The question should sound like a real UK Business Analyst interview question, not a generic quiz question. It should test a capability that matters for the supplied role.

Return valid JSON only with this shape:
{
  "question": "...",
  "questionType": "...",
  "whatItTests": "..."
}
        `,
        input: `JOB DESCRIPTION:\n${jobText.trim()}\n\nCV (optional):\n${typeof cvText === 'string' ? cvText.trim() : ''}`,
      });

      const data = parseJson(response.output_text);
      return res.status(200).json(data);
    }

    if (action === 'answer') {
      if (typeof question !== 'string' || question.trim().length < 5) {
        return res.status(400).json({ error: 'Please provide the interview question.' });
      }

      if (typeof answer !== 'string' || answer.trim().length < 10) {
        return res.status(400).json({ error: 'Please provide an interview answer of at least 10 characters.' });
      }

      const response = await openai.responses.create({
        model: 'gpt-5.6-luna',
        store: false,
        instructions: `
You are Odi, an AI Business Analysis Interview Practice Assistant.

Evaluate one Business Analyst interview answer against the supplied job description and candidate evidence.
Reference date: ${today}.

Be constructive and specific. Focus on:
- relevance to the question and role
- structure and clarity
- use of evidence and examples
- stakeholder, requirements, delivery, change or process thinking where relevant
- whether the answer demonstrates the capability being tested
- unsupported claims or missing evidence

Do not invent experience, employers, qualifications, technologies, achievements, metrics, outcomes or responsibilities. If the candidate makes a claim that is not supported by the supplied CV, identify it as something they should substantiate rather than treating it as fact.

Give concise feedback suitable for interview practice. Then provide the next question, unless this is the end of the supplied practice history. Prefer a useful follow-up when the answer needs probing.

Return valid JSON only with this shape:
{
  "feedback": {
    "overall": "...",
    "strengths": ["..."],
    "improvements": ["..."],
    "evidenceUse": "...",
    "structureAndClarity": "...",
    "relevance": "..."
  },
  "nextQuestion": "...",
  "nextQuestionType": "...",
  "nextQuestionReason": "..."
}
        `,
        input: `JOB DESCRIPTION:\n${jobText.trim()}\n\nCV:\n${typeof cvText === 'string' ? cvText.trim() : ''}\n\nINTERVIEW TYPE:\n${typeof interviewType === 'string' ? interviewType : ''}\n\nPREVIOUS PRACTICE:\n${JSON.stringify(safeHistory)}\n\nCURRENT QUESTION:\n${question.trim()}\n\nCANDIDATE ANSWER:\n${answer.trim()}`,
      });

      const data = parseJson(response.output_text);
      return res.status(200).json(data);
    }

    if (action === 'finish') {
      const response = await openai.responses.create({
        model: 'gpt-5.6-luna',
        store: false,
        instructions: `
You are Odi, an AI Business Analysis Interview Practice Assistant.

Summarise the candidate's interview practice using only the supplied job description, CV and interview history.
Reference date: ${today}.

Do not invent experience or make claims unsupported by the evidence. Do not provide a fake numerical score. Identify observable strengths, recurring improvement areas, role-specific preparation areas and useful answer themes to practise next.

Return valid JSON only with this shape:
{
  "summary": "...",
  "strengths": ["..."],
  "improvementAreas": ["..."],
  "preparationAreas": ["..."],
  "nextSteps": ["..."]
}
        `,
        input: `JOB DESCRIPTION:\n${jobText.trim()}\n\nCV:\n${typeof cvText === 'string' ? cvText.trim() : ''}\n\nINTERVIEW HISTORY:\n${JSON.stringify(safeHistory)}`,
      });

      const data = parseJson(response.output_text);
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: 'Unsupported interview action.' });
  } catch (error) {
    console.error('Odi Interview Practice error:', error);
    return res.status(500).json({
      error: 'Odi could not process the interview practice right now. Please try again.',
    });
  }
}
