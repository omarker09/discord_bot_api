var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from "dotenv";
dotenv.config();
export class NinjaAPI {
    static GetRndomJokes() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let generatedJoke = "";
            try {
                const response = yield fetch(this.ninjaBaseUrl, {
                    headers: {
                        'x-api-key': this.apikey,
                    },
                });
                const responseJson = yield response.json();
                generatedJoke = ((_a = responseJson[0]) === null || _a === void 0 ? void 0 : _a.joke) || "No joke found.";
            }
            catch (err) {
                console.error("Error occurred: " + err);
            }
            return generatedJoke;
        });
    }
}
NinjaAPI.ninjaBaseUrl = 'https://api.api-ninjas.com/v1/jokes';
NinjaAPI.apikey = process.env.NINJA_API_KEY || "";
