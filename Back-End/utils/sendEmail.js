const path = require("path");
const Sib = require("sib-api-v3-sdk");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const apiInstance = new Sib.TransactionalEmailsApi();

const sendEmail = async (to, subject, textContent, htmlContent) => {
    const sendSmtpEmail = {
        to: [{ email: to }],
        subject,
        textContent,
        htmlContent,
        sender: { email: process.env.EMAIL_SENDER },
    };

    try {
        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("Email sent successfully:", response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendEmail;