import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUrl = process.env.MONGODB_URL;

main()
.then(() => {console.log("mongoose connected")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoUrl);
}