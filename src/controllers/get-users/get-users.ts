import { IGetUsersController, IgetUsersRepository } from "./protocols";

export class GetUsersController implements IGetUsersController {
  constructor(private readonly getUsersRepository: IgetUsersRepository) {}

  async handle() {
    try {
      //validar requisição
      //direcionar chamada para repository
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "something went wrong",
      };
    }
  }
}
