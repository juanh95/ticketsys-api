let User = require("../dist/database/models/User");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../dist/server");
const { describe, it } = require("mocha");
let should = chai.should();

chai.use(chaiHttp);

describe("Users", () => {
   describe("/GET users", () => {
      it("it should get all the users", (done) => {
         chai
            .request(server)
            .get("/api/users/?all=any")
            .end((err, res) => {
               res.should.have.status(200);
               res.body.data.should.be.a("array");
               // res.body.length.should.be.eql(0);
               done();
            });
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
               done();
            });
      });
   });
});
