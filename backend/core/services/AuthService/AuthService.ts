import { injectable } from "inversify";
import * as jwt from "jsonwebtoken";

@injectable()
class AuthService {
  createAuthToken(userId: number) {
    return jwt.sign({ userId }, "jwt-secret", { expiresIn: "2 days" });
  }

  decodeAuthToken(token: string) {
    return jwt.verify(token, "jwt-secret");
  }
}

export default AuthService;
