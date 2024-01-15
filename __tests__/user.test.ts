import supertest from "supertest";
import {server} from "../src/utils/server"

const app = server()

const userPayload:any = {
	"id": "clre430xw0000bjapuyvfhunz",
	"firstName": null,
	"lastName": null,
	"email": "test@test.com",
	"verified": false,
	"password": "f2b00a62497ae729ad1fb5cf73a0f89f415b745e9a9714956d7b59da8fc9d22f",
	"salt": "+t6sHXVeU3sj0W6rICRWDXjK7DVpLtFHftglRaiIsxbN08ihXwZZFT+w1aSaMBYKJw9LZIlomlLzQpzd0t7ETMy5+LP7/gLXwFYAfj27CNRCTgVGm+1q4p8p1+vTjIK0BzngfhhiS5B7F3ZCmu5ZZyUCPupLIJydUG2Vm/+PcTQ=",
	"createdAt": "2024-01-14T23:12:35.204Z",
	"updatedAt": "2024-01-14T23:12:35.204Z"
};
const profilePayload:any = {
	"id": "clre430zh0002bjapbkjs5qbw",
	"userId": "clre430xw0000bjapuyvfhunz",
	"name": "",
	"gender": 0,
	"silhouette": 0,
	"accessories": false,
	"budget": null,
	"season": null,
	"styles": [],
	"createdAt": "2024-01-14T23:12:35.261Z",
  "updatedAt": "2024-01-15T00:34:13.989Z",
}
const userInput = {
  email: "test@test.com",
  // file deepcode ignore NoHardcodedPasswords/test: Example password
  password: "Password123",
};
const commonHeaders = { authorization: "Bearer GAt+Iyrfs+ioBySjUU4juA==" }

describe("user", () => {
    // user login
  
    describe("user login", () => {
      describe("given the username and password are valid", () => {
        it("should return the user payload", async () => {
  
          const { statusCode, body } = await supertest(app)
            .post("/auth/login")
            .send(userInput);
  
          expect(statusCode).toBe(200);
          expect(body).toEqual(userPayload);
        });
      });
    });
});

describe("profile", () => {
  describe("user get profile", () => {
    describe("given user is authenticated", () => {
      it("should return the profile payload", async () => {

        const { statusCode, body } = await supertest(app)
          .get("/users/clre430xw0000bjapuyvfhunz/profile")
          .set(commonHeaders)
          .send();

        expect(statusCode).toBe(200);
        expect(body).toEqual(profilePayload);
      });
    });
  });
  describe("user get profile", () => {
    describe("given user is not authenticated", () => {
      it("should return the profile payload", async () => {

        const { statusCode, body } = await supertest(app)
          .get("/users/clre430xw0000bjapuyvfhunz/profile")
          .send();

        expect(statusCode).toBe(401);
      });
    });
  });
  describe("user get profile", () => {
    describe("given user is not authorized", () => {
      it("should return the profile payload", async () => {

        const { statusCode, body } = await supertest(app)
          .get("/users/clre430xw0000bjapuyvfhunzd/profile")
          .set(commonHeaders)
          .send();

        expect(statusCode).toBe(403);
      });
    });
  });

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

});