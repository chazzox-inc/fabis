import type { APIRoute } from "astro";
import type { Email } from "node-mailjet";
import zod from "zod";

export const post_schema = zod.object({
    email: zod.string().email(),
    subject: zod.string().min(3),
    name: zod.string().min(3),
    message: zod.string().min(3)
});

export const post: APIRoute = async ({ request }) => {
    const data_unsafe = await request.json();

    // validate input data
    const data = post_schema.safeParse(data_unsafe);

    // validation unsuccessful
    if (!data.success)
        return new Response(
            JSON.stringify({ success: false, message: data.error }),
            { status: 504 }
        );

    const body_data = data.data;

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
                            Email: "contact-form@fabischarity.com",
                            Name: "FABIS CONTACT US FORM"
                        }
                    ],
                    Subject: `User Contact Submission: ${body_data.subject}`,
                    TextPart: `This is an automated message: \nUser name: ${body_data.name}\nUser email ${body_data.email}\n\nUser Message: ${data.data.message}`
                }
            ]
        }),
        headers: {
            Authorization: `Basic ${btoa(
                `${import.meta.env.SECRET_MAILJET_API_ID}:${
                    import.meta.env.SECRET_MAILJET_API_SECRET
                }`
            )}`,
            "Content-Type": "application/json"
        },
        method: "POST"
    });
    const res = (await req.json()) as Email.PostResponseData;

    const statusMessageReduced = res.Messages.map((v) => v.Status).reduce((a, b) =>
        a == "success" && b == a ? a : b
    );

    return {
        body: JSON.stringify({
            message: res.Messages[0]?.Status,
            success: statusMessageReduced == "success"
        })
    };
};
