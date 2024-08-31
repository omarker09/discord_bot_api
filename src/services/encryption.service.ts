import { v4 as uuidv4 } from "uuid" 

class EncryptionService {
    public GenerateUUID = async (): Promise<string> => {
        const v4: string =  uuidv4()
        return v4;
    }
}

export default new EncryptionService();