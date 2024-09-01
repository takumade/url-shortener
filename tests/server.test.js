const app = require("../app");
const request = require("supertest")
const mongoose = require("mongoose")

require("dotenv").config();


beforeAll(done => {
    done()
  })
  


describe("GET /api/hello", () => {
    it("should return a greeting message", async () => {
        return request(app)
            .get("/api/hello")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    });
});



afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.close()
    done()
  })