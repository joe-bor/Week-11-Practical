const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const server = app.listen(8080, () => {
  console.log("Testing on Port: 8080");
});
const Todo = require("../models/todo");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.close(); // disconnects from temp mongodb
  mongoServer.stop(); // stops temp database from running
  server.close(); // stops server from listening on  port 8080
});

describe("Positive Testing the todo-api endpoints", () => {
  test('It should create a new "todo" document', async () => {
    const response = await request(app).post("/todos").send({
      title: "Creating A New Todo",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.todo.title).toEqual("Creating A New Todo");
    expect(response.body.todo).toHaveProperty("created_at");
  });

  test("It should return the list of todos", async () => {
    const response = await request(app).get("/todos");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });

  test("It should a specific todo do", async () => {
    const todo = new Todo({
      title: "Show Routes",
    });
    await todo.save();
    const response = await request(app).get(`/todos/${todo._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toEqual("Show Routes");
  });

  test("It should update a todo ", async () => {
    const todo = new Todo({
      title: "Updating a todo document",
    });
    await todo.save();
    const response = await request(app).put(`/todos/${todo._id}`).send({
      completed: true,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.todo.title).toEqual("Updating A Todo Document");
    expect(response.body.todo.completed).toBe(true);
  });

  test("It should delete a todo", async () => {
    const todo = new Todo({
      title: "This todo should end up being deleted",
    });
    await todo.save();
    const response = await request(app).delete(`/todos/${todo._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("Document Deleted");
    // expect()
  });
}); //! End of Positive Testing

describe("Negative Testing the todo-api endpoints", () => {
  test("Create route should return an error if the title field of request is empty", async () => {
    const response = await request(app).post("/todos").send({
      title: "",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("It should return an error if given an invalid id", async () => {
    const response = await request(app).put("/todos/123").send({
      title: "Update Route should return an error",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("It should return an error when document is not found", async () => {
    const response = await request(app).delete("/todos/456");

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
