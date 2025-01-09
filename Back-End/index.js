const Sib = require("sib-api-v3-sdk");

require("dotenv").config();

const client = Sib.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

console.log(process.env.SENDINBLUE_API_KEY);

const tranEmailApi = new Sib.TransactionalEmailsApi();

const sender = { email: "abhishektripathi3196@gmail.com", name: "Abhishek" };

const receivers = [{ email: "tripathi3196@gmail.com" }];

tranEmailApi
    .sendTransacEmail({
        sender,
        to: receivers,
        subject: "Test Email",
        htmlContent: "<html><body><h1>Hello, world!</h1></body></html>",
    })
    .then((response) => {
        console.log("Email sent successfully:", response);
    })
    .catch((error) => {
        console.error("Error sending email:", error);
    });

// const sendEmail = async (to, subject, textContent, htmlContent) => {
//     const sendSmtpEmail = new Sib.SendSmtpEmail({
//         to: [{ email: to }],
//         subject,
//         textContent,
//         htmlContent,
//         sender: { email: process.env.EMAIL_SENDER },
//     });

//     try {
//         const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
//         console.log("Email sent successfully:", response);
//     } catch (error) {
//         console.error("Error sending email:", error);
//     }
// };

// module.exports = sendEmail;
