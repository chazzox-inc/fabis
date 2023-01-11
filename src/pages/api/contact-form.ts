import type { APIRoute } from "astro";

import zod from "zod";

export const post_schema = zod.object({
    email: zod.string().email(),
    subject: zod.string().min(3),
    message: zod.string().min(3)
});

export const post: APIRoute = async ({ request }) => {
    const parsed_url = Object.fromEntries(
        new URLSearchParams(await request.text()).entries()
    );

    // validate input data
    const data = post_schema.safeParse(parsed_url);

    // validation unsuccessful
    if (!data.success)
        return new Response(
            JSON.stringify({ success: false, message: data.error }),
            { status: 504 }
        );

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
                    TextPart: `This is an automated message:\nUser email ${data.data.email}\n\nUser Message: ${data.data.message}`
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
    const res = await req.json();
    console.log(JSON.stringify(res));

    return {
        body: JSON.stringify({
            message: "This was a POST!",
            test: res
        })
    };
};
