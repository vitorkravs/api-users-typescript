import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IcreateUserController {
  handle(
    HttpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>>;
}

export interface CreateUserParams {
  firtsName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
