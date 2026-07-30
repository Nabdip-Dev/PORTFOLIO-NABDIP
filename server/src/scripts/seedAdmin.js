/**
 * One-off script to create the single admin account. Run manually — never
 * exposed as an API route, since /api/auth/register always creates visitors.
 *
 * Usage:
 *   ADMIN_NAME="Your Name" ADMIN_EMAIL="you@example.com" ADMIN_PASSWORD="strongpassword" \
 *   node src/scripts/seedAdmin.js
 */
import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";

async function run() {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    console.error("Set ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD environment variables first.");
    process.exit(1);
  }

  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`Admin already exists for ${email}. Aborting.`);
    await mongoose.disconnect();
    return;
  }

  await User.create({ name, email, password, role: "admin", isEmailVerified: true });
  console.log(`Admin account created for ${email}.`);
  await mongoose.disconnect();
}

run();
