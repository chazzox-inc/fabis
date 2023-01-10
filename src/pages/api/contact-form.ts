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
    console.log(parsed_url);

    // validate input data
    const data = post_schema.safeParse(parsed_url);

    // validation unsuccessful
    if (!data.success)
        return new Response(
            JSON.stringify({ success: false, message: data.error }),
            { status: 504 }
        );

    //
    if (process.env.NODE_ENV == "development")
        return new Response(JSON.stringify({ success: true, message: "dev time" }), {
            status: 200
        });

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
    return {
        body: JSON.stringify({
            message: "This was a POST!",
            test: await req.json()
        })
    };
};
