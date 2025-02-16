import { Dispatch, SetStateAction } from "react";
import { handleImageCompletion } from "../KI/ai";

interface ImageResponseParams {
  setMessage: Dispatch<SetStateAction<string>>;
  setResponse: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  message: string;
}

export const handleImageGenerateResponse = async ({
  setMessage,
  setResponse,
  setIsLoading,
  message,
}: ImageResponseParams): Promise<void> => {
  if (!message.trim()) return;

  setIsLoading(true);
  try {
    const apiResponse = await handleImageCompletion(message);
    if (apiResponse) {
      setMessage("");
      setResponse((prev) => prev + apiResponse + "\n\n");
    }
  } catch (error) {
    console.error("Fehler beim Generieren des Bildes:", error);
    setResponse((prev) => prev + "\n\nFehler beim Generieren des Bildes.");
  } finally {
    setIsLoading(false);
  }
};
