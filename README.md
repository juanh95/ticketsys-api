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

> Note: Some routes will require authentication via JWT token

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

**Returns**

A JSON string with `user` and `tokenInfo` values.

The user key contains another JSON string as a value with the information the user provided as well as an ID and `createdAt`, `updatedAt` date values.

The `tokenInfo` value likewise contains a JSON string with `token` and `expires` (in milliseconds) keys. Tokens are set to expire 2 hours after generation.

**Example Return**

```
{
	"user": {
		"id": 001,
		"firstName": "James",
		"lastName": "Bond",
		"email": "JBond@ticket.com",
		"department": "IT",
		"phone": "123-456-7890",
		"pwd": "hashed-password",
		"salt": "hashed-salt",
		"createdAt": "2023-10-24T14:47:20.517Z",
		"updatedAt": "2023-10-24T14:47:20.517Z"
	},
	"tokenInfo": {
		"token": "Bearer XYZ",
		"expires": 7200000
	}
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

**Returns**

A JSON string with `success`, `token`, `expiresIn`, and `user` keys.

```
{
	"success": true,
	"token": "Bearer XYZ,
	"expiresIn": 7200000,
	"user": "James"
}
```

### Update User Info

**Endpoint**

```
PUT /api/users/
```

> Note: At this time the user must be logged in to enter their information. Send the JWT token by including the bearer token in the `Authorization` header in the request. For this request, you only need to include the fields you want to update.

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

## Ticket Routes

> Note: This route requires authentication by including the bearer token in the `Authorization` header in the request.

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

**Returns**

A Ticket JSON string with the listed properties as well as `id`, `createdAt`, and `updatedAt` keys.

## List Tickets

**Endpoint**

```
GET /api/tickets/:id
```

**Path Parameters:**

-  id (optional): Specifies the unique identifier of the ticket.

**Query Parameters**

-  status (optional): Filters the tickets based on their status.
-  priority (optional): Filters the tickets based on their priority.
-  category (optional): Filters the tickets based on their category.

> Note: Including the ID will pull up a single ticket, regarless of query parameters included.

**Example Requests**

Single Ticket (Also Returns Comments Made For that Ticket):

```
GET .../api/tickets/3
```

**Returns**

A JSON string with all ticket fields, including `comments` an array of JSON strings containing all comments and and their metadata for that ticket.

**Example Return**

```
{
	"id": 41,
	"status": "Closed",
	"description": "I need a charger",
	"reportedId": 2,
	"affectedId": 2,
	"assignedId": 2,
	"createdAt": "2023-07-02T03:55:21.000Z",
	"updatedAt": "2023-07-02T03:55:21.000Z",
	"priority": "3",
	"category": "Software",
	"affectedItem": "Personal Computer",
	"title": "Hardware Request",
	"phone": "956-123-1231",
	"comments": [
		{
			"id": 3,
			"ticketId": 41,
			"userId": 2,
			"commentBody": "This is a comment",
			"createdAt": "2023-10-11T16:00:30.000Z",
			"updatedAt": "2023-10-11T16:00:30.000Z"
		},
		{
			"id": 4,
			"ticketId": 41,
			"userId": 2,
			"commentBody": "This is another comment",
			"createdAt": "2023-10-11T16:18:50.000Z",
			"updatedAt": "2023-10-11T16:18:50.000Z"
		},
		{
			"id": 5,
			"ticketId": 41,
			"userId": 2,
			"commentBody": "Thi is another comment",
			"createdAt": "2023-10-11T16:19:00.000Z",
			"updatedAt": "2023-10-11T16:19:00.000Z"
		}
	]
}
```

Multiple Tickets:

```
GET .../api/tickets/?category=hardware&page=2
```

**Returns**

A JSON string with `data`, `currentPage`, `totalPages`, and `totalTickets` keys. The `data` key contains an array of `Ticket` JSON objects that include the ticket fields. Results will be paginated 20 results per page, so the page will need to be indicated if not on the first page.

**Example Return**

```
{
	"data": {
		tickets: [
			{
				"id" : 48
				"status" : "Open"
				"category" : "Hardware"
				.
				.
				.
				"phone" : "123-456-7890"
			},
			{
				"id" : 49
				"status" : "Open"
				"category" : "Hardware"
				.
				.
				.
				"phone" : "123-456-7890"
			}
			.
			.
			.
		]
	},
	"currentPage": "2",
	"totalPages": 4,
	"totalTickets": 79
}
```

All Tickets:

```
GET .../api/tickets/
```

**Returns: Same as above**

**Example Returns: Same as above**

## Update Ticket

**Endpoint**

```
POST /api/tickets/:id
```

**Path Parameters:**

-  id (required): Specifies the unique identifier of the ticket.

Include the fields you want to change in the request body.

**Example Request**

```
#Route
POST .../api/tickets/3

# Request Body
{
  "status" : "Closed"
  "category" : "Personal Computer"
}
```

#

## Comment Routes

### Create Comment

**Endpoint**

```
PUT /api/comments/
```

**Request Body**

-  `ticketId` (required): The associated ticket ID (string)
-  `commentBody` (required): User's email, will also be used as the username (string)

**Example Request**

```
{
	"ticketId": 1,
    "commentBody" : "Restarted server and collected logs"
}
```

**Returns**

A JSON string containing the comment body as well as `id`, `userId`, and `createdAt` date.

**Example Return**

```
{
	"id": 41,
	"ticketId": 41,
	"userId": 12,
	"commentBody": "Some comment",
	"createdAt": "2023-10-18T14:02:53.385Z"
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
