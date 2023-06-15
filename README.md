# **`RESTful Todo API`**

- This is a simple API built using Express and Mongoose with full CRUD (Create, Update, Delete, Read) functionality

---

## _Installation_

- Clone the repository

  - https://github.com/joe-bor/Week-11-Practical.git

- Install dependencies

  - cd to the directory where you cloned the repo

  - then run `npm install` in the terminal

- Interact with the server
  - `npm start` to start the server
  - use tools like Postman, cURL or Insomnia to send HTTP Requests

---

## _API Endpoints_

- `GET /todos`

  - Retrieves all the todos from the database

- `POST /todos`

  - Creates a new todo document

  - below is the schema of the model, take
    note that `title` is _required_

```
  title: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
```

- `GET /todos/:id`

  - Retrieves a specific todo document by its ID

- `PUT /todos/:id`

  - Updates a specific todo document by its ID

- `DELETE /todos/:id`
  - Deletes a specific todo document

---

## _Testing_

- Test with Jest and Supertest

  - run `npm test` on your terminal

- The test covers both positive testing and negative testing. Ensuring the api handles valid inputs and errors appropriately

---

## _Load Testing_

- Artillery is used for stress testing our servers to see how it would react to multiple users interacting with it concurrently
- Below is the YAML file used:

```
config:
  target: "http://localhost:4000"
  phases:
    - duration: 60
      arrivalRate: 20
scenarios:
  - flow:
      - post:
          url: "/todos"
          json:
            title: "Testing todo"
  - flow:
      - get:
          url: "/todos"
```

- Here we simulate users creating a todo document, followed by accessing the index route to retrieve the collection of todos

## _Results_

```
--------------------------------
Summary report @ 18:23:24(-0700)
--------------------------------

http.codes.200: ................................................................ 1200
http.downloaded_bytes: ......................................................... 29229322
http.request_rate: ............................................................. 20/sec
http.requests: ................................................................. 1200
http.response_time:
  min: ......................................................................... 81
  max: ......................................................................... 608
  median: ...................................................................... 96.6
  p95: ......................................................................... 186.8
  p99: ......................................................................... 262.5
http.responses: ................................................................ 1200
vusers.completed: .............................................................. 1200
vusers.created: ................................................................ 1200
vusers.created_by_name.0: ...................................................... 614
vusers.created_by_name.1: ...................................................... 586
vusers.failed: ................................................................. 0
vusers.session_length:
  min: ......................................................................... 81.9
  max: ......................................................................... 609.6
  median: ...................................................................... 98.5
  p95: ......................................................................... 190.6
  p99: ......................................................................... 267.8
```

- The results turned out to be successful, all 1200 requests returned a status code of 200
- Also http.response_time.p99 indicates that most of the requests were process in under 268ms

---

## _Improvements_

- Add authentication and authorization, maybe with the use of JWT tokens

- Implement pagination for the index route to limit the response being sent back to the client

- Implement validation and ensure client inputs are being sanitized before being processed
