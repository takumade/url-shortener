const app = require("../app");
const request = require("supertest")
const mongoose = require("mongoose")

require("dotenv").config();


beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(process.env["MONGO_URL"],   { useNewUrlParser: true,useUnifiedTopology: true  });
  });
  
  
  afterAll(async () => {
    await mongoose.disconnect();
  });



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


