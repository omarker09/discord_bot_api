import dotenv from "dotenv";

dotenv.config();

export class NinjaAPI {
    private static ninjaBaseUrl: string = 'https://api.api-ninjas.com/v1/jokes';
    private static apikey: string = process.env.NINJA_API_KEY || "";

    public static async GetRndomJokes(): Promise<string> {
        let generatedJoke: string = "";

        try {
            const response = await fetch(this.ninjaBaseUrl, {
                headers: {
                    'x-api-key': this.apikey,
                },
            });
            const responseJson = await response.json();
            generatedJoke = responseJson[0]?.joke || "No joke found.";
        } catch (err) {
            console.error("Error occurred: " + err);
        }

        return generatedJoke;
    }
}