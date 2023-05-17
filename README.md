Note: Documentation Still In Progress...

# Ticketing System API

This is an API for a ticketing system that allows users to create, view, and manage tickets.

## Technologies Used

- Node.js
- TypeScript
- Express
- MySQL
- Sequelize
- sequelize-typescript
- bcrypt
- crypto
- jsonwebtoken
- passport
- passport-jwt

## Installation

To run this API on your local machine, you will need to have Node.js and MySQL installed. Once you have these installed, follow these steps:

1. Clone this repository to your local machine.
2. Open a terminal and navigate to the project directory.
3. Run `npm install` to install the required dependencies.
4. Set up your environment variables. Create a `dbConfig.ts` file in the src/config directory of the project and add the following code:
```
var dbConfig = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "[password]",
  DB: "[Database Name]",
  DIALECT: "mysql",

  pool: {
    max: 5,
    min: 0,
    aquire: 30000,
    idle: 10000,
  },
};

export default dbConfig;

```
5. Run `npm start` to start the server.
6. The API will now be available at `http://localhost:8080`.

## Features

The following features are available:

### `GET api/tickets`

This endpoint is responsible for retrieving a list of tickets with the specified id, status, category, and priority properties from the server.

#### Query parameters

- id: A string representing the ticket ID.
- status: A string representing the status of the ticket (e.g. "open", "closed", "pending").
- category: A string representing the category of the ticket (e.g. "technical", "billing", "general").
- priority: A string representing the priority of the ticket (e.g. "high", "medium", "low").

### `GET /tickets/:id`

Get the details of a specific ticket.

#### Path parameters

- `id`: The ID of the ticket.

### `POST /tickets`

Create a new ticket.

#### Request body

- `title`: The title of the ticket.
- `description`: The description of the ticket.
- `priority`: The priority of the ticket. Possible values: `low`, `medium`, `high`.
- `status`: The status of the ticket. Possible values: `open`, `closed`.

### `PUT /tickets/:id`

Update the status or priority of a ticket.

#### Path parameters

- `id`: The ID of the ticket.

#### Request body

- `priority` (optional): The new priority of the ticket. Possible values: `low`, `medium`, `high`.
- `status` (optional): The new status of the ticket. Possible values: `open`, `closed`.

### `DELETE /tickets/:id`

Delete a ticket.

#### Path parameters

- `id`: The ID of the ticket.

### `POST api/comments`

This endpoint is responsible for creating and adding a comment to a ticket posted by a user

#### Request body

- `ticketId` (required): The ticket ID the comment is for (number)
- `userId` (required): The user ID who posted the comment (number)
- `commentBody` (required): The body of the comment (string)


## Error Handling

This API uses standard HTTP status codes to indicate success or failure of requests. In case of an error, a JSON response with the following format will be returned:
```
{
  "error": {
    "code": <HTTP status code>,
    "message": "<error message>"
  }
}
```

## Testing

This API uses [Jest](https://jestjs.io/) for testing. To run the tests, run `npm test` in the terminal.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on this repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# 
