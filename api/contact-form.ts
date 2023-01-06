import type { VercelRequest, VercelResponse } from "@vercel/node";
import zod from "zod";

const HTTP_METHODS = {
    POST: "POST",
    GET: "GET"
};

export const post_schema = zod.object({
    email: zod.string().email(),
    subject: zod.string().min(3),
    message: zod.string().min(3)
});

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    // block all non POST requests
    if (request.method !== HTTP_METHODS.POST)
        return response
            .status(504)
            .json({ success: false, message: "Bad Request Type!" });

    // validate input data
    const data = post_schema.safeParse(request.body);

    // validation unsuccessful
    if (!data.success)
        return response
            .status(504)
            .json({ success: false, message: "Bad Data sent!" });

    //
    if (process.env.NODE_ENV == "development")
        return response.status(200).json({ success: true, message: "dev time" });

    // send mailjet email
    const req = await fetch("https://api.mailjet.com/v3.1/send", {
        body: JSON.stringify({
            Messages: [
                {
                    From: {
                        Email: "contact-form@fabischarity.com",
                        Name: "Landing page contact form"
                    },
                    To: [
                        {
                            Email: "caylott@outlook.com",
                            Name: "FABIS CONTACT US FORM"
                        }
                    ],
                    Subject: `User Contact Submission: ${data.data.subject}`,
                    HtmlPart: `This is an automated message:\nUser email ${data.data.email}\n\nUser Message: ${data.data.message}`
                }
            ]
        }),
        headers: {
            Authorization: `Basic ${btoa(
                `${process.env.mailjet_api_id}:${process.env.mailjet_api_secret}`
            )}`,
            "Content-Type": "application/json"
        },
        method: "POST"
    });

    console.log(req);

    return;
}
