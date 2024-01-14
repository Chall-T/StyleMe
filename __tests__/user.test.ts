import supertest from "supertest";
import { app } from "../src";
import { login, register } from "../src/controllers/authentication";


const userPayload = {
  email: "jane.doe@example.com",
  name: "Jane Doe",
};

const userInput = {
  email: "test@example.com",
  // file deepcode ignore NoHardcodedPasswords/test: Example password
  password: "Password123",
};


describe("user", () => {
    // user registration
  
    describe("user registration", () => {
      describe("given the username and password are valid", () => {
        it("should return the user payload", async () => {
  
          const { statusCode, body } = await supertest(app)
            .post("/auth/register")
            .send(userInput);
  
          expect(statusCode).toBe(200);
          expect(body).toEqual(userPayload);
        });
      });
  
  
      // describe("given the user service throws", () => {
      //   it("should return a 409 error", async () => {
      //     const createUserServiceMock = jest
      //       .spyOn(UserService, "createUser")
      //       .mockRejectedValueOnce("Oh no! :(");
  
      //     const { statusCode } = await supertest(createServer())
      //       .post("/api/users")
      //       .send(userInput);
  
      //     expect(statusCode).toBe(409);
  
      //     expect(createUserServiceMock).toHaveBeenCalled();
      //   });
      // });
    });
  });