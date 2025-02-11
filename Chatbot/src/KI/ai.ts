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
      max_tokens: 1000,
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: `
                          You can answer every Question you get asked about the topic you are an expert in.
            
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
