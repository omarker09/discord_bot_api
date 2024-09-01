import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { fsync } from "fs";

dotenv.config();

export interface GeminiAiTypes {
    promptParam: string
}

export class GeminiAI {
    // declear private states
    private prompt: string = "";
    private api_key: string | undefined = process.env.GEMINI_API_KEY

    // the default contrcutor must have prompt.
    constructor({ promptParam }: GeminiAiTypes) {
        if (!promptParam) {
            console.error("[prompt] Should not be empty.");
            return;
        }
        this.prompt = promptParam;
    }

    public async PrintAI(): Promise<string> {
        // initialize Gemini AI
        const genAI = new GoogleGenerativeAI(this.api_key || "");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Waitng for response and convert it to text
        const result = await model.generateContent(this.prompt);
        const response: string = result.response.text();

        // return the response
        return response
    }
}
