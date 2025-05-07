import { MailtrapClient,sender } from "..lib/mailtrap.js";
export const SendWelcomeEmail = async (email,name,ProfileUrl)=>{
  const recipient = [{email}]

  try {
    const response = await MailtrapClient.Send({
      from:sender,
      to:recipient,
      subject:"Welcome to unlinked",
      html:createWelcomeEmailTemplate(name,ProfileUrl),
      category:"welcome"
    })

    console.log("Welcome Email sent Succesfully",response)
  } catch (error) {
    throw error;
  }
}