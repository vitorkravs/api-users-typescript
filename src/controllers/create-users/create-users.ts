import validator from "validator";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateUserParams,
  ICreateUserRepository,
  IcreateUserController,
} from "./protocols";

export class CreateUserController implements IcreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    HttpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!HttpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      const emailIsValid = validator.isEmail(HttpRequest.body!.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: `E-mail is invalid`,
        };
      }

      const user = await this.createUserRepository.createUser(
        HttpRequest.body!
      );

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "something went wrong",
      };
    }
  }
}
