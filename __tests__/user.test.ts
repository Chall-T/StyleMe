// import supertest from "supertest";
// import { server } from "../src/utils/server";
// // import * as UserController from "../src/controllers/users";
// // import * as AuthController from "../src/controllers/authentication";
// import * as UserService from "../src/database/users";
// const app = server();

// const userPayload: any = {
//   id: "clre430zh0002bjapbkjs532w",
//   firstName: "John",
//   lastName: "Smith",
//   email: "test@test.com",
//   verified: false,
//   password: "Password123",
// };

// const profilePayload: any = {
//   id: "clre430xw0000bjapuydasdsa",
//   userId: "clre430zh0002bjapbkjs532w",
//   name: "John",
//   gender: 0,
//   silhouette: 0,
//   accessories: false,
//   budget: null,
//   season: null,
//   styles: [],
//   createdAt: "2024-01-14T23:12:35.261Z",
//   updatedAt: "2024-01-15T00:34:13.989Z",
// };
// const userInput = {
//   email: "test@test.com",
//   // file deepcode ignore NoHardcodedPasswords/test: Example password
//   password: "Password123",
//   passwordConfirmation: "Password123",
//   firstName: "John",
//   lastName: "Smith",
// };
// const commonHeaders = { authorization: "Bearer GAt+Iyrfs+ioBySjUU4juA==" };

// describe("user", () => {
//   describe("user register", () => {
//     describe("given the data is valid", () => {
//       it("should return the user payload", async () => {
//         const registerUserMock = jest
//           .spyOn(UserService, "createUser")
//           // @ts-ignore
//           .mockReturnValueOnce(userPayload);
//         const { statusCode, body } = await supertest(app)
//           .post("/auth/register")
//           .send(userInput);

//         expect(statusCode).toBe(200);
//         expect(body).toEqual(userPayload);
//         expect(registerUserMock).toHaveBeenCalledWith(userInput);
//       });
//     });
//   });
//   // user login

//   describe("user login", () => {
//     describe("given the username and password are valid", () => {
//       it("should return the user payload", async () => {
//         const registerUserMock = jest
//           .spyOn(AuthController, "login")
//           // @ts-ignore
//           .mockReturnValueOnce(userPayload);
//         const { statusCode, body } = await supertest(app)
//           .post("/auth/login")
//           .send(userInput);

//         expect(statusCode).toBe(200);
//         expect(body).toEqual(userPayload);
//         expect(registerUserMock).toHaveBeenCalledWith(userInput);
//       });
//     });
//     describe("given the passwords do not match", () => {
//       it("should return a 400", async () => {
//         const loginUserMock = jest
//           .spyOn(AuthController, "login")
//           // @ts-ignore
//           .mockReturnValueOnce(userPayload);
//         const { statusCode, body } = await supertest(app)
//           .post("/auth/login")
//           .send({ ...userInput, passwordConfirmation: "doesnotmatch" });

//         expect(statusCode).toBe(400);

//         expect(loginUserMock).not.toHaveBeenCalled();
//       });
//     });
//     describe("given the user service throws", () => {
//       it("should return a 400", async () => {
//         const loginUserMock = jest
//           .spyOn(AuthController, "login")
//           // @ts-ignore
//           .mockReturnValueOnce("Oh no! :(");
//         const { statusCode, body } = await supertest(app)
//           .post("/auth/login")
//           .send(userInput);

//         expect(statusCode).toBe(409);

//         expect(loginUserMock).toHaveBeenCalled();
//       });
//     });
//   });
// });

// describe("profile", () => {
//   describe("user get profile", () => {
//     describe("given user is authenticated", () => {
//       it("should return the profile payload", async () => {
//         const { statusCode, body } = await supertest(app)
//           .get("/users/clre430xw0000bjapuyvfhunz/profile")
//           .set(commonHeaders)
//           .send();

//         expect(statusCode).toBe(200);
//         expect(body).toEqual(profilePayload);
//       });
//     });
//   });
//   describe("user get profile", () => {
//     describe("given user is not authenticated", () => {
//       it("should return the profile payload", async () => {
//         const { statusCode, body } = await supertest(app)
//           .get("/users/clre430xw0000bjapuyvfhunz/profile")
//           .send();

//         expect(statusCode).toBe(401);
//       });
//     });
//   });
//   describe("user get profile", () => {
//     describe("given user is not authorized", () => {
//       it("should return the profile payload", async () => {
//         const { statusCode, body } = await supertest(app)
//           .get("/users/clre430xw0000bjapuyvfhunzd/profile")
//           .set(commonHeaders)
//           .send();

//         expect(statusCode).toBe(403);
//       });
//     });
//   });

  // describe("user change profile", () => {
  //   describe("given user is authenticated", () => {
  //     it("should return the profile payload", async () => {

  //       const { statusCode, body } = await supertest(app)
  //         .put("/users/clre430xw0000bjapuyvfhunz/profile")
  //         .set(commonHeaders)
  //         .send({accessories: false});

  //       expect(statusCode).toBe(200);
  //       expect(body).toContain(profilePayload)
  //     });
  //   });
  // });
// });
