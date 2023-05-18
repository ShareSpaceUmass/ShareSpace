const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { Users } = require("../models");
chai.use(chaiHttp);
const expect = chai.expect;

// Unit tests for user management functions
describe("User Management", () => {

  // Define a user object
  const user = {
    email: "testuser@umass.edu",
    fName: "Test",
    lName: "User",
    gender: "male",
  };

  // Create the user object before running the tests
  before(async () => {
    await Users.create(user);
  });

  // Delete the user object after running the tests
  after(async () => {
    await Users.destroy({ where: { email: user.email } });
  });

  // Register a new user
  describe("POST /users", () => {
    it("should create a new user", (done) => {
      chai
        .request(app)
        .post("/users")
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("message").equal("User registered succesfully");
          done();
        });
    });

    it("should not create a new user if email is already registered", (done) => {
      chai
        .request(app)
        .post("/users")
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("message").equal("Email is already registered.");
          done();
        });
    });
  });

  // Authenticate a user
//   describe("POST /users/login", () => {
//     it("should send a magic link email to the user", (done) => {
//       chai
//         .request(app)
//         .post("/users/login")
//         .send({ email: user.email })
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.have.property("message").equal("Magic link sent successfully");
//           done();
//         });
//     });
//   });

  // Delete an existing user
  describe("DELETE /users/deleteUser", () => {
    it("should delete an existing user", (done) => {
      chai
        .request(app)
        .delete("/users/deleteUser")
        .send({ email: user.email })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("message").equal("User deleted successfully");
          done();
        });
    });

  });
});