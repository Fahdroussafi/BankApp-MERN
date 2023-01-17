const request = require("supertest");
const app = require("./index");

describe("GET accounts", () => {
  it("should return all accounts", async () => {
    const res = await request(app).get(
      "/api/accounts/get-all-accounts"
    );
    expect(res.statusCode).toEqual(200);
  });
});

