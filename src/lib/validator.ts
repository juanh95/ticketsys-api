import { Request } from "express";

type MissingFields = {
   [key: string]: boolean;
};

// Export a function that checks if the ticket input payload is valid.
export function validTicketInputPayload(req: Request): MissingFields {
   // Define an array of the required fields.
   const requiredFields = [
      "status",
      "description",
      "reportedId",
      "affectedId",
      "title",
      "priority",
      "category",
      "affectedItem",
      "phone",
   ];

   // Create an object to store the missing fields.
   const missingFields: MissingFields = {};

   // Use the `every()` method to check if all of the required fields are present in the request body.
   if (
      !requiredFields.every((field) => Object.keys(req.body).includes(field))
   ) {
      // Iterate over the required fields and add any missing fields to the `missingFields` object.
      requiredFields.forEach((field) => {
         if (!Object.keys(req.body).includes(field)) {
            missingFields[field] = true;
         }
      });
   }

   // Return the `missingFields` object.
   return missingFields;
}
