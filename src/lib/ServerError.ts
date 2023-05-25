// Define a custom error class called ServerError that extends the base Error class
export class ServerError extends Error {
   statusCode: number;

   // Constructor for the ServerError class
   constructor(message: string, statusCode: number) {
      super(message); // Call the constructor of the base Error class with the provided error message
      this.statusCode = statusCode; // Set the statusCode property to the provided status code
   }
}
