const request = require("supertest");
const app = require("../server");

describe("Contacts API", () => {
  it("should add a new contact", async () => {
    const response = await request(app)
      .post("/contacts")
      .send({ name: "EKB", email: "erolkaan@gmail.com" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Contact added successfully." });
  });
  it("should not add a contact with missing fields", async () => {
    const response = await request(app)
      .post("/contacts")
      .send({ name: "Dolll" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Name and Email are required." });
  });
  it("should not add a duplicate contact", async () => {
    await request(app)
      .post("/contacts")
      .send({ name: "Jane Doe", email: "jane.doe@example.com" });

    const response = await request(app)
      .post("/contacts")
      .send({ name: "EKB", email: "erolkaan@gmail.com" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Contact with this email already exists.",
    });
  });
  it("should retrieve all contacts", async () => {
    const response = await request(app).get("/contacts");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
  it("should search contacts by name or email", async () => {
    const response = await request(app)
      .get("/contacts/search")
      .query({ query: "EKB" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "EKB",
          email: "erolkaan@gmail.com",
        }),
      ])
    );
  });

  it("should return an error for missing search query", async () => {
    const response = await request(app).get("/contacts/search");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Query parameter is required." });
  });
});
