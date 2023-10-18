let User = require("../dist/database/models/User");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../dist/server");

let issueJWT = require("../dist/crypto/utils");

const { describe, it } = require("mocha");
const { checkGroupMembership } = require("../dist/lib/isMember");

let should = chai.should();

chai.use(chaiHttp);

console.log("Running Tests...");

const fs = require("fs");
const path = require("path");
const jsonwebtoken = require("jsonwebtoken");
const pathToKey = path.join(__dirname, ".", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf-8");

function test_issueJWT(user) {
   // Extract user id and set expiration time for token
   const id = user.id;
   // Milliseconds from now
   const expiresIn = 0;
   // Create payload with user id and issued at time
   const payload = {
      sub: id,
      iat: Date.now(),
   };
   // Sign payload using private key, specified expiration time and RSA256 algorithm
   const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
      expiresIn: expiresIn,
      algorithm: "RS256",
   });
   // Return object with bearer token and expiration time
   return {
      token: "Bearer " + signedToken,
   };
}

describe("Users", () => {
   describe("/GET users", () => {
      it("it should get all the users", async (done) => {
         chai
            .request(server)
            .get("/api/users/?all=any")
            .end((err, res) => {
               res.should.have.status(200);
               res.body.data.should.be.a("array");
            });
         done();
      });
   });

   describe("/POST user", () => {
      it("it should NOT create a user with an existing email", (done) => {
         let newUser = {
            firstName: "Kendra",
            lastName: "H",
            email: "kendra@ticket.com",
            department: "IT",
            pwd: "admin123",
            phone: "123-456-7890",
         };

         chai
            .request(server)
            .post("/api/users/register")
            .send(newUser)
            .end((err, res) => {
               res.should.have.status(409);
               res.body.msg.should.include("already exists");
            });
         done();
      });
   });
});

describe("Authentication", () => {
   let test_user;

   describe("/POST user/login", () => {
      it("it should let a valid user receive a JWT token", (done) => {
         let existingUser = {
            email: "kendra@ticket.com",
            pwd: "admin123",
         };

         chai
            .request(server)
            .post("/api/users/login")
            .send(existingUser)
            .end((err, res) => {
               chai.expect(res).to.have.status(200);
               test_user = res.body.user;
               chai.expect(res.body).to.have.property("token");
            });
         done();
      });
      it("it should not let an invalid user receive a JWT token", (done) => {
         let existingUser = {
            email: "kendra45@ticket.com",
            pwd: "admin12345",
         };

         chai
            .request(server)
            .post("/api/users/login")
            .send(existingUser)
            .end((err, res) => {
               chai.expect(res).to.have.status(404);
               chai
                  .expect(res.error.text)
                  .to.contain("Error: User was not found");
            });
         done();
      });
   });

   describe("/POST user/myaccount", () => {
      it("it should not allow expired tokens for authentication", (done) => {
         let test_token = test_issueJWT(test_user); // issuing a token that expires instantly

         chai
            .request(server)
            .get("/api/users/myaccount")
            .set({ Authorization: test_token })
            .end((err, res) => {
               chai.expect(res).to.have.status(401);
               chai.expect(res.error.text).to.contain("Unauthorized");
               done();
            });
      });
   });
});

describe("Tickets", () => {
   let test_ticket = {
      status: "Closed",
      description: "Fan is not spinning",
      title: "Fan Replacement",
      category: "Hardware",
      priority: "3",
      affectedItem: "Personal Computer",
      phone: "956-123-1231",
      reportedId: 2,
      affectedId: 2,
      assignedId: 2,
   };

   let existingUser = {
      email: "kendra@ticket.com",
      pwd: "admin123",
   };

   let validTestToken;

   chai
      .request(server)
      .post("/api/users/login")
      .send(existingUser)
      .end((err, req) => {
         validTestToken = req.body.token;
         return;
      });

   describe("/POST tickets/", () => {
      it("it should let a valid user create a ticket", (done) => {
         chai
            .request(server)
            .post("/api/tickets")
            .send(test_ticket)
            .set({ Authorization: validTestToken })
            .end((err, res) => {
               chai.expect(res).to.have.status(200);
               chai.expect(res.body).to.contain(test_ticket);
               done();
            });
      });

      it("it should not let an invalid user create a ticket", (done) => {
         chai
            .request(server)
            .post("/api/tickets")
            .send(test_ticket)
            .end((err, res) => {
               chai.expect(res).to.have.status(401);
               done();
            });
      });

      it("it should not let a ticket with missing fields get created", (done) => {
         chai
            .request(server)
            .post("/api/tickets")
            .send({ nothing: "nothing" })
            .set({ Authorization: validTestToken })
            .end((err, res) => {
               chai.expect(res).to.have.status(400);
               chai.expect(res.body).to.have.property("MissingFieldsError");
               done();
            });
      });
   });

   describe("/GET tickets/", () => {
      it("it should not return any tickets if the user is unauthorized", (done) => {
         chai
            .request(server)
            .get("/api/tickets/")
            .end((err, res) => {
               chai.expect(res).to.have.status(401);
               done();
            });
      });

      it("it should return the first page of tickets when no page parameter is specified", (done) => {
         chai
            .request(server)
            .get("/api/tickets/")
            .set({ Authorization: validTestToken })
            .end((err, res) => {
               let data = res.body.data;
               chai.expect(res).to.have.status(200);
               chai.expect(data.currentPage).to.equal(1);
               chai.expect(data.totalTickets).to.be.greaterThan(0);
               chai.expect(data.totalPages).to.be.greaterThan(1);
               done();
            });
      });

      it("it should return the specified page of tickets when a page parameter is specified", (done) => {
         chai
            .request(server)
            .get("/api/tickets?page=2")
            .set({ Authorization: validTestToken })
            .end((err, res) => {
               let data = res.body.data;
               chai.expect(res).to.have.status(200);
               chai.expect(data.currentPage).to.equal("2");
               chai.expect(data.totalTickets).to.be.greaterThan(0);
               chai.expect(data.totalPages).to.be.greaterThan(1);
               done();
            });
      });
   });

   describe("/GET tickets/:id", () => {
      it("it should return a ticket with comments if the ticket ID is specified", (done) => {
         chai
            .request(server)
            .get("/api/tickets/41")
            .set({ Authorization: validTestToken })
            .end((err, res) => {
               chai.expect(res).to.have.status(200);
               chai.expect(res.body).to.have.property("comments");
               done();
            });
      });
   });
});

describe("Comments", () => {
   let existingUser = {
      email: "kendra@ticket.com",
      pwd: "admin123",
   };

   let validTestToken;

   chai
      .request(server)
      .post("/api/users/login")
      .send(existingUser)
      .end((err, req) => {
         validTestToken = req.body.token;
         return;
      });

   describe("/POST comments/", () => {
      let test_comment = {
         ticketId: 41,
         commentBody: "Hello, this is a test",
      };

      let invalid_test_comment = {
         ticketId: 41,
         commentBody: "",
      };

      it("it should let a valid user post a comment to a ticket", (done) => {
         chai
            .request(server)
            .post("/api/comments/")
            .set({ Authorization: validTestToken })
            .send(test_comment)
            .end((err, res) => {
               chai.expect(res).to.have.status(200);
               chai.expect(res.body).to.have.property("createdAt");
               chai.expect(res.body.createdAt).to.exist.and.to.not.be.empty;
               done();
            });
      });

      it("it should not let an invalid user post a comment to a ticket", (done) => {
         chai
            .request(server)
            .post("/api/comments/")
            .send(test_comment)
            .end((err, res) => {
               chai.expect(res).to.have.status(401);
               done();
            });
      });

      it("it should not let a user post an empty comment", (done) => {
         chai
            .request(server)
            .post("/api/comments/")
            .set({ Authorization: validTestToken })
            .send(invalid_test_comment)
            .end((err, res) => {
               chai.expect(res).to.have.status(400);
               done();
            });
      });
   });
});
