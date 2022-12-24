const ContactForm = () => {
    return (
        <>
            <form
                onsubmit={(e) => {
                    console.log(e);
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }}
                action=""
                class="mx-auto flex max-w-3xl flex-col items-center gap-4"
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

                <input type="submit" value="Submit" class="btn-primary btn" />
            </form>
        </>
    );
};

export default ContactForm;
