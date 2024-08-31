
class AuthController {
    public Auth = async (): Promise<string> => {
        return "private_key"
    }
}

export default new AuthController()