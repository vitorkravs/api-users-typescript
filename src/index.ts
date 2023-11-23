import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./Repositories/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/get-users/get-users";

import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./Repositories/create-users/mongo-create-users";
import { CreateUserController } from "./controllers/create-users/create-users";
import { MongoUpdateUserReposiory } from "./Repositories/update-users/mongo-update-users";
import { UpdateUserController } from "./controllers/update-user/update-user";
import { MongoDeleteUserRepository } from "./Repositories/delete-users/mongo-delete-users";
import { DeleteUserController } from "./controllers/delete-users/delete-users";

config();

const main = async () => {
  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch("/users/:id", async (req, res) => {
    const mongoUpdateUserReposiory = new MongoUpdateUserReposiory();

    const updateUserController = new UpdateUserController(
      mongoUpdateUserReposiory
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/users/:id", async (req, res) => {
    const mongoDeleteUserReposiory = new MongoDeleteUserRepository();

    const deleteUserController = new DeleteUserController(
      mongoDeleteUserReposiory
    );

    const { body, statusCode } = await deleteUserController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port, ${port} `));
};

main();
