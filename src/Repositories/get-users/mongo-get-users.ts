import { IgetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IgetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firtsName: "vitor",
        lastName: "kravszenko",
        email: "vitorkrvas@gmail.com",
        password: "123",
      },
    ];
  }
}
