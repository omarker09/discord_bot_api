var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
export class GeminiAI {
    // the default contrcutor must have prompt.
    constructor({ promptParam }) {
        // declear private states
        this.prompt = "";
        this.api_key = process.env.GEMINI_API_KEY;
        if (!promptParam) {
            console.error("[prompt] Should not be empty.");
            return;
        }
        this.prompt = promptParam;
    }
    PrintAI() {
        return __awaiter(this, void 0, void 0, function* () {
            // initialize Gemini AI
            const genAI = new GoogleGenerativeAI(this.api_key || "");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            // Waitng for response and convert it to text
            const result = yield model.generateContent(this.prompt);
            const response = result.response.text();
            // return the response
            return response;
        });
    }
}
