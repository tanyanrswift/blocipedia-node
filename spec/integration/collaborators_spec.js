/*const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/wikis/";
const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;
const Collaborator = require("../../src/db/models").Collaborator;

describe("routes : collaborators", () => {

    beforeEach((done) => {

        sequelize.sync({force: true})
        .then(() => {
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
    
      });

    describe("GET /collaborators/add", () => {

        it("should render a view with an add form", (done) => {
            request.get(`${base}add`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Add Collaborator");
                done();
            });
        });
    });

    describe("GET /collaborators/remove", () => {

        it("should render a view with a remove form", (done) => {
            request.get(`${base}remove`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Remove Collaborator");
                done();
            });
        });
    });

    describe("POST /collaborators/create", () => {

        it("should create a new collaborator and redirect", (done) => {
            
        })
    })
});*/