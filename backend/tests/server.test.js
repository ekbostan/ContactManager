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
});
