<script>
    import { createForm } from "felte";
    import { validator } from "@felte/validator-zod";
    import { post_schema } from "../pages/api/contact-form";

    const { form, errors } = createForm({
        extend: validator({ schema: post_schema })
    });

    let formSubmitted = false;
    let isLoading = false;
    let success;

    async function handleSuccess(event) {
        const { response, ...context } = event.detail;
        console.log(await response.json());
    }
</script>

{#if !formSubmitted}
    <form
        use:form
        class="mx-auto flex max-w-3xl flex-col items-center gap-4"
        action="/api/contact-form"
        method="post"
        enctype="application/x-www-form-urlencoded"
        on:feltesuccess={handleSuccess}
    >
        <div class="form-control w-full max-w-lg">
            <label for="email" class="label">
                <span class="label-text">Where can we contact you?</span>
            </label>
            <input
                required
                type="text"
                placeholder="email@example.com"
                name="email"
                id="email"
                class="input-bordered input w-full max-w-lg"
            />
        </div>
        <div class="form-control w-full max-w-lg">
            <label for="subject" class="label">
                <span class="label-text">What is the subject?</span>
            </label>
            <input
                required
                type="text"
                name="subject"
                id="subject"
                placeholder="Type here"
                class="input-bordered input w-full max-w-lg"
            />
        </div>

        <div class="form-control w-full max-w-lg">
            <label for="message" class="label">
                <span class="label-text">What is your message?</span>
            </label>
            <textarea
                required
                name="message"
                id="message"
                class="textarea"
                placeholder="Message..."
            />
        </div>
        <button type="submit" class="btn-primary btn">Submit</button>
    </form>
{/if}
