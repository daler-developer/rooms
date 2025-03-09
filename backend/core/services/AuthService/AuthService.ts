import { inject, injectable } from "inversify";
import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { TYPES } from "../../../types";
import { UserRepository } from "../../repositories/UserRepository/UserRepository";
import { IncorrectPasswordError } from "../../errors/auth";
import { UserNotFound } from "../../errors/users";
import { UserWithEmailAlreadyExists } from "../../errors/auth";
import { AddUserDto } from "../../repositories/UserRepository/dto/AddUserDto";

@injectable()
class AuthService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

  async checkEmailAvailabilityForRegistration(email: string) {
    const user = await this.userRepository.getOneByEmail(email);

    return !Boolean(user);
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.userRepository.getOneByEmail(email);

    if (!user) {
      throw new UserNotFound();
    }

    if (user.password !== password) {
      throw new IncorrectPasswordError();
    }

    const token = jwt.sign({ userId: user.id }, "jwt-secret", { expiresIn: "2 days" });

    return {
      user,
      token,
    };
  }

  async register(addUserDto: AddUserDto) {
    const exists = Boolean(await this.userRepository.getOneByEmail(addUserDto.email));

    if (exists) {
      throw new UserWithEmailAlreadyExists();
    }

    const user = await this.userRepository.addOne(addUserDto);

    const token = jwt.sign({ userId: user.id }, "jwt-secret", { expiresIn: "2 days" });

    return {
      user,
      token,
    };
  }

  async startSession() {
    const sessionToken = jwt.sign({ sessionId: uuidv4() }, "jwt-secret", { expiresIn: "10 days" });

    return {
      sessionToken,
    };
  }

  decodeSessionToken(sessionToken: string) {
    return jwt.verify(sessionToken, "jwt-secret");
  }

  createAuthToken(userId: number) {
    return jwt.sign({ userId }, "jwt-secret", { expiresIn: "2 days" });
  }

  decodeAuthToken(token: string) {
    return jwt.verify(token, "jwt-secret");
  }
}

export default AuthService;
