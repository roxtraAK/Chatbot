import OpenAI from "openai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

const API_KEY =
  "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";

const openai = new OpenAI({
  apiKey: API_KEY || "",
  dangerouslyAllowBrowser: true,
});

export async function handleCompletion(
  inputMessage: string
): Promise<ChatCompletionMessage | undefined> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: `
                          Your are a professional bodybuilder and can answer questions about training, nutrition, supplements and performance enhancing drugs. If yo
                          cant answer the question, please let the user know. 
            
                        `,
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `tell me everyhing you know about ${inputMessage}`,
            },
          ],
        },
      ],
    });

    return response.choices[0].message;
  } catch (ex) {
    console.error(ex);
  }

  return undefined;
}
