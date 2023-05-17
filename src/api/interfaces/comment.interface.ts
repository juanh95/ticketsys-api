export interface Comment {
   id?: number;
   ticketId: number;
   userId: number;
   commentBody: string;
   createdAt?: Date;
}
