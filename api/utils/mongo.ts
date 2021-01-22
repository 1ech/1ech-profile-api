import mongoose, { Connection } from "mongoose";
import { userSchema } from "./schemas";

let connection: Connection | null = null;

/**
 * @see https://vercel.com/guides/deploying-a-mongodb-powered-api-with-node-and-vercel
 * @see https://mongoosejs.com/docs/lambda.html
 */
export const getConnection = async (): Promise<Connection> => {
  if (connection == null) {
    const uri = process.env.MONGO_URI ?? "mongodb://localhost:27017/profile";
    connection = await mongoose.createConnection(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
    });

    await connection;
    connection.model("User", userSchema);
  }

  return connection;
};