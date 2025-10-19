import OpenAI from "openai";
import { envVers } from "./env";


export const OpenAi = new OpenAI({
    apiKey: envVers.OPEN_AI_API_SECRATE
});