import { MailtrapClient, sender } from "../lib/mailtrap.js";
import { createCommentNotificationEmailTemplate, createWelcomeEmailTemplate } from "./emailTemplates.js";


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

export const sendCommentNotificationEmail = async (
  recipientEmail,
  recipientName,
  commentName,
  postUrl,
  commentContent
) => {
  const recipient = [{ email }];

  try {
    const response = await MailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "New comment on your Post",
      html:createCommentNotificationEmailTemplate(recipient, commenterName, postUrl, commentContent),
      category:"comment_notification",
    })
    console.log("comment Notification email send successfully", response);
  } catch (error) {
    throw error
  }
}