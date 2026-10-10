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
    const { projectName, briefText } = req.body ?? {};

    if (
      typeof briefText !== 'string' ||
      briefText.trim().length < 100
    ) {
      return res.status(400).json({
        error: 'Please provide a project brief of at least 100 characters.',
      });
    }

    if (briefText.length > 30000) {
      return res.status(400).json({
        error: 'The project brief must be 30,000 characters or fewer.',
      });
    }

    const safeProjectName =
      typeof projectName === 'string'
        ? projectName.trim().slice(0, 200)
        : 'Untitled project';

    const response = await openai.responses.create({
      model: 'gpt-5.6-luna',
      store: false,
      instructions: `
You are Odi, the AI Business Analysis Assistant created by Arcklen Group.

Analyse the supplied project brief as an experienced Business Analyst.

Use professional UK English. Be specific, structured and evidence-based.

Return these sections:

1. Project summary
2. Business problem and drivers
3. Objectives and intended outcomes
4. Scope
   - In scope
   - Out of scope
   - Items requiring clarification
5. Stakeholders
   - Stakeholders explicitly identified
   - Potential stakeholders to validate
6. Business and functional needs
7. Non-functional needs, if supported by the brief
8. Assumptions
9. Constraints
10. Risks
11. Dependencies
12. Open questions for stakeholders
13. Recommended Business Analysis techniques, with reasons
14. Recommended next steps

Evidence rules:
- Do not invent facts, requirements, stakeholders or commitments.
- Distinguish information explicitly stated in the brief from reasonable inferences.
- Label inferred content clearly as "Inference — validate".
- Label possible risks or stakeholders not confirmed by the brief as "Potential — validate".
- Where information is missing, state "Not specified in the brief".
- Do not present proposed requirements as approved requirements.
- Do not invent dates, budgets, regulations, systems or success measures.
- Make open questions specific enough to use in a stakeholder workshop.
- If the brief is too vague to support a conclusion, say so.

Format the response with clear headings and readable bullet points.
        `,
      input: `
Project name: ${safeProjectName}

Project brief:
${briefText.trim()}
      `,
    });

    return res.status(200).json({
      projectName: safeProjectName,
      analysis: response.output_text,
    });
  } catch (error) {
    console.error('Odi Project Brief Analysis error:', error);

    return res.status(500).json({
      error: 'Odi could not analyse this project brief right now. Please try again.',
    });
  }
}