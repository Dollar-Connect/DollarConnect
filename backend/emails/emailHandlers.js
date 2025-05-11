import { MailtrapClient, sender } from "../lib/mailtrap.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";


export const SendWelcomeEmail = async (email, name, ProfileUrl) => {
  const recipient = [{ email }];
  console.log("blahhhhh",sender);

  try {
    const response = await MailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to UnLinked",
      html: createWelcomeEmailTemplate(name, ProfileUrl),
      category: "welcome",
    });

    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    throw error;
  }
};
