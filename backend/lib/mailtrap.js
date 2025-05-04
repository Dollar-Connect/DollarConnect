import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN

export const MailtrapClient = new MailtrapClient({
  token: TOKEN
});