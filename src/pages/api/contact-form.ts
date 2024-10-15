import type { APIRoute } from "astro";
import zod from "zod";
import { Resend } from "resend";

export const post_schema = zod.object({
    email: zod.string().email(),
    subject: zod.string().min(3),
    name: zod.string().min(3),
    message: zod.string().min(3)
});

export const POST: APIRoute = async ({ request }) => {
    const data_unsafe = await request.json();

    // validate input data
    const { success, data, error } = post_schema.safeParse(data_unsafe);

    // validation unsuccessful
    if (!success)
        return new Response(JSON.stringify({ success: false, message: error }), {
            status: 504
        });

    // send resend email
    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    const { data: resendData, error: resendError } = await resend.emails.send({
        from: "Landing page contact form <contact-form@chazzox.uk>",
        to: [
            "FABIS CONTACT US FORM <admin@fabischarity.com>",
            "FABIS CONTACT US FORM <caylott@outlook.com>"
        ],
        subject: `User Contact Submission: ${data.subject}`,
        text: `This is an automated message: \nUser name: ${data.name}\nUser email ${data.email}\n\nUser Message: ${data.message}`
    });

    if (resendError) {
        return new Response(
            JSON.stringify({
                success: false,
                message: resendError.message
            })
        );
    }

    return new Response(
        JSON.stringify({
            success: true,
            message: resendData
        })
    );
};
