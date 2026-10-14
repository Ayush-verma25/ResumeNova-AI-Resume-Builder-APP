import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";

const respondWithAIError = (res, error) => {
  const status = error.status ?? error.statusCode ?? error.response?.status;

  if (status === 429) {
    return res.status(429).json({
      message:
        "The AI provider quota has been reached. Wait for the quota to reset or check the provider's plan and limits, then try again.",
    });
  }

  return res.status(400).json({ message: error.message });
};

// controller for enhancing resume's professional summary
// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (typeof userContent !== "string" || !userContent.trim()) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the professional summery of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return respondWithAIError(res, error);
  }
};

// controller for enhancing resume's job description
// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (typeof userContent !== "string" || !userContent.trim()) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be 1-2 sentences also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return respondWithAIError(res, error);
  }
};

// controller for uploading a resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (typeof resumeText !== "string" || !resumeText.trim()) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt = `Extract information from resumes into the requested JSON structure.
Put each detail in its matching field. The professional_summary must contain only an explicitly stated profile or summary, never the full resume or content from other sections. Do not invent information; use empty strings for missing scalar values and empty arrays for missing lists. Return only a valid JSON object with exactly this structure. Each experience item must contain company, position, start_date, end_date, description, and is_current. Each project item must contain name, type, and description. Each education item must contain institution, degree, field, graduation_date, and gpa.
{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [],
  "project": [],
  "education": []
}`;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `Extract the information from this resume:\n\n${resumeText}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const enhancedData = response.choices[0].message.content;
    const parsedData = JSON.parse(enhancedData);
    const resumeData = { ...parsedData };
    delete resumeData.userId;
    delete resumeData._id;
    delete resumeData.public;
    const newResume = await Resume.create({ ...resumeData, userId, title });
    return res.json({ resumeId: newResume._id });
  } catch (error) {
    return respondWithAIError(res, error);
  }
};
