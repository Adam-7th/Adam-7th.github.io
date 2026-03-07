import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

type MongooseGlobal = typeof globalThis & {
  _mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

const globalForMongoose = globalThis as MongooseGlobal;

const cached = globalForMongoose._mongoose ?? { conn: null, promise: null };
globalForMongoose._mongoose = cached;

export async function connectDb() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set.");
  }
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      dbName: process.env.MONGODB_DB ?? "zec",
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
