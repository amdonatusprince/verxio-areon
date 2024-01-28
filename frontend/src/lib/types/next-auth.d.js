// import NextAuth from "next-auth/next";

// // new change
// import { DefaultUser, DefaultSession } from "next-auth";
// import { JWT, DefaultJWT } from "next-auth/jwt";
// // new change

// declare module "next-auth" {
//   interface Session {
//     token: string;
//     user: {
//       _id: string;
//       fullName: string;
//       email: string;
//     } & DefaultSession;
//   }
//   // new change
//   interface User extends DefaultUser {}
// }

// // new change
// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     user: User;
//   }
// }
