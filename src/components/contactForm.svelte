<script>
    import { createForm } from "felte";
    import { validator } from "@felte/validator-zod";
    import { post_schema } from "../pages/api/contact-form";
    import classNames from "classnames";

    const { form, errors } = createForm({
        extend: validator({ schema: post_schema }),
        onSubmit: async (values) => {
            formSubmitted = true;
            isLoading = true;
            const request = await fetch("/api/contact-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });
            const data = await request.json();
            isLoading = false;
            success = !!data.success;
        }
    });

    let formSubmitted = false;
    let isLoading = false;
    let success = false;
</script>

{#if !formSubmitted}
    <form use:form class="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4">
        <div class="form-control w-full max-w-lg">
            <label for="email" class="label">
                <span
                    class={classNames("label-text", {
                        "font-bold text-error-content": !!$errors.name
                    })}
                    >What should we call you?
                    {#if !!$errors.name}- {$errors.name[0]}{/if}
                </span>
            </label>
            <input
                required
                type="text"
                placeholder="Name..."
                name="name"
                id="name"
                class="input-bordered input w-full max-w-lg"
            />
        </div>
        <div class="form-control w-full max-w-lg">
            <label for="email" class="label">
                <span
                    class={classNames("label-text", {
                        "font-bold text-error-content": !!$errors.email
                    })}
                >
                    Where can we contact you?
                    {#if !!$errors.email}- {$errors.email[0]}{/if}
                </span>
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
                <span
                    class={classNames("label-text", {
                        "font-bold text-error-content": !!$errors.subject
                    })}
                >
                    What is the subject?
                    {#if !!$errors.subject}- {$errors.subject[0]}{/if}
                </span>
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
                <span
                    class={classNames("label-text", {
                        "font-bold text-error-content": !!$errors.message
                    })}
                >
                    What is your message?
                    {#if !!$errors.message}- {$errors.message[0]}{/if}
                </span>
            </label>
            <textarea
                required
                name="message"
                id="message"
                class="textarea"
                placeholder="Message..."
            />
        </div>
        <button type="submit" class="btn-primary btn mb-10">Submit</button>
    </form>
{:else if isLoading}
    <div class="flex flex-col items-center gap-4">
        <div class="spinner" />
        <p class="text-xl font-bold">Sending...</p>
    </div>
{:else if !isLoading && success}
    <div class="flex flex-col items-center gap-4">
        <p class="text-xl font-bold">Message sent!</p>
    </div>
{:else if !isLoading && !success}
    <div class="flex flex-col items-center gap-4">
        <p class="text-xl font-bold">Something went wrong</p>
    </div>
{/if}
