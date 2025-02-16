import { Dispatch, SetStateAction } from "react";
import { handleTextCompletion } from "../KI/ai";

interface TextResponseParams {
  setMessage: Dispatch<SetStateAction<string>>;
  setResponse: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  message: string;
  typeMessage: (text: string) => Promise<void>;
}

export const handleTextGenerateResponse = async ({
  setMessage,
  setResponse,
  setIsLoading,
  message,
  typeMessage,
}: TextResponseParams): Promise<void> => {
  if (!message.trim()) return;

  setIsLoading(true);
  try {
    const apiResponse = await handleTextCompletion(message);
    if (apiResponse && apiResponse.content) {
      setMessage("");
      for (let i = 0; i < apiResponse.content.length; i++) {
        const text = apiResponse.content[i];
        if (text) await typeMessage(text);
      }
      setResponse((prev: string) => prev + "\n\n\n");
    }
  } catch (error) {
    console.error("Fehler beim Generieren der Antwort:", error);
    setResponse(
      (prev: string) => prev + "\n\nFehler beim Generieren der Antwort."
    );
  } finally {
    setIsLoading(false);
  }
};
