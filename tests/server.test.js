const app = require("../app");
const request = require("supertest")
const mongoose = require("mongoose")

require("dotenv").config();


beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(process.env["MONGO_URL"],   { useNewUrlParser: true,useUnifiedTopology: true  });
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



describe("POST /api/shorturl", () => {

    let short_url = null
    it("should shorten a URL", async () => {
        return request(app)
            .post("/api/shorturl")
            .set('Content-Type', "application/json")
            .expect('Content-Type', /json/)
            .send({
                url: "https://www.facebook.com/groups/3164348350526480/?hoisted_section_header_type=recently_seen&multi_permalinks=3330217577272889"
            })
            .expect(200)
            .then((res) => {
                short_url = JSON.parse(res.text).short_url
                expect(res.statusCode).toBe(200);
                expect(Object.keys(JSON.parse(res.text)).includes("short_url")).toBe(true)
            })
    });
});


describe("POST /api/shorturl/:id", () => {

    let short_url = null
    it("id does not exist", async () => {
        return request(app)
            .get("/api/shorturl/999")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.text.includes("not refering to a URL in db")).toBe(true)
             
            })
    });
});



afterAll(async () => {
    await mongoose.disconnect();
  });


