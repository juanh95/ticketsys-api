Note: Documentation Still In Progress...

# Ticketing System API

This is an API for a ticketing system that allows users to create, view, and manage tickets.

## Technologies Used

-  Node.js
-  TypeScript
-  Express
-  MySQL
-  Sequelize
-  sequelize-typescript
-  bcrypt
-  crypto
-  jsonwebtoken
-  passport
-  passport-jwt

## Server Data Flow

![alt text](https://github.com/juanh95/ticketsys-api/blob/main/db_pic.drawio.png)

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

## API Routes

#

### Create A Ticket

**Endpoint**

```
POST /api/tickets/
```

**Request Body**

-  `status` (required): The status of the ticket (string)
-  `description` (required): The description or details of the ticket (string)
-  `title` (required): The title or summary of the ticket (string)
-  `category` (required): A cateogry for the ticket (string)
-  `priority` (required): 1-Critical or 2-High or 3-Moderate or 4-Low (string)
-  `affectedItem` (required): The specific item currently impacted (string)
-  `phone` (required): The phone number associated with the ticket (string)
-  `reportedId` (required): User ID of the one reporting the ticket (string)
-  `affectedId` (required): User ID of the one affected (string)
-  `assignedId` (optional): User ID of the one the ticket is assigned to (string)

**Example Request**

```
{
	"status" : "New",
	"description" : "Hypervisor is showing slow perfmance rates. A restart is needed to collect logs",
	"title": "Hypervisor Restart",
	"category": "Infrastructure",
	"priority" : "2-High",
	"affectedItem": "VMWare",
	"phone": "111-111-1111",
	"reportedId": 1,
	"affectedId": 2,
	"assignedId": 3
}
```

**Returns: A Ticket JSON with the listed properties**

## List Tickets

**Endpoint**

```
GET /api/tickets/(:id)
```

**Path Parameters:**

-  id (optional): Specifies the unique identifier of the ticket.

**Query Parameters**

-  status (optional): Filters the tickets based on their status.
-  priority (optional): Filters the tickets based on their priority.
-  category (optional): Filters the tickets based on their category.

> Note: Including the ID will pull up a single ticket, regarless of query parameters included. To list all tickets, use `.../tickets/?all=all`

**Example Request**

Single Ticket:

```
GET .../api/tickets/3
```

Multiple Tickets:

```
GET .../api/tickets/?status=open&priority=high&category=hardware
```

All Tickets:

```
GET .../api/tickets/?all=all
```

## Update Ticket

**Endpoint**

```
POST /api/tickets/:id
```

**Path Parameters:**

-  id (required): Specifies the unique identifier of the ticket.

**Example Request**

```
#Route
POST .../api/tickets/3

# Request Body
{
  "status" : "Closed
  "category" : "Personal Computer
}
```

#

## User Routes

### Create User

**Endpoint**

```
POST /api/users/register
```

**Request Body**

-  `firstName` (required): The first name of the user (string)
-  `lastName` (required): The last name of the user (string)
-  `email` (required): User's email, will also be used as the username (string)
-  `department` (required): The user's department (string)
-  `pwd` (required): The user's password (string)
-  `phone` (required): The user's contact phone (string)

**Example Request**

```
{
	"firstName" : "John",
	"lastName" : "Doe",
	"email": "john@service.com",
	"department": "IT - Networking",
	"pwd" : "password",
	"phone": "111-111-1111",
}
```

### Login

**Endpoint**

```
POST /api/users/login
```

**Request Body**

-  `email` (required): User's email, will also be used as the username (string)
-  `pwd` (required): The user's password (string)

**Example Request**

```
{
	"email": "john@service.com",
	"pwd" : "password",
}
```

### Update User Info

**Endpoint**

```
PUT /api/users/
```

> Note: At this time the user must be logged in to enter their information. Passport authenticates the user by token stored in the browser before allowing the update.

**Request Body**

-  `firstName` (optional): The first name of the user (string)
-  `lastName` (optional): The last name of the user (string)
-  `email` (optional): User's email, will also be used as the username (string)
-  `department` (optional): The user's department (string)
-  `phone` (optional): The user's contact phone (string)

**Example Request**

```
{
	"email": "john.doe@service.com",
	"department" : "IT - Cloud",
    "phone" : "222-222-2222"
}
```

#

## Comments

### Create Comment

**Endpoint**

```
PUT /api/comments/
```

**Request Body**

-  `ticketId` (required): The associated ticket ID (string)
-  `userId` (required): The user ID of the comment (string)
-  `commentBody` (required): User's email, will also be used as the username (string)

**Example Request**

```
{
	"ticketId": 1,
	"userId" : 2,
    "commentBody" : "Restarted server and collected logs"
}
```

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
