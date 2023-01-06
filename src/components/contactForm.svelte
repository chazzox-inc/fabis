<script>
    import { createForm } from "felte";
    import { validator } from "@felte/validator-zod";
    import { post_schema } from "../../api/contact-form";

    const { form, errors } = createForm({
        onSubmit(values, context) {
            fetch("/api/contact-form", {
                method: "POST",
                body: JSON.stringify(values)
            })
                .then((req) => req.json())
                .then((res) => console.log("test"));
        },
        onSuccess(response, context) {
            console.dir(response);
        },
        onError(err, context) {
            console.dir(err);
        },
        extend: validator({ schema: post_schema })
    });
</script>

<form use:form class="mx-auto flex max-w-3xl flex-col items-center gap-4">
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
