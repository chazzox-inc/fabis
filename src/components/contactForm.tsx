const ContactForm = () => {
    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                method="post"
                class="mx-auto flex max-w-3xl flex-col items-center gap-4"
            >
                <div class="form-control w-full max-w-lg">
                    <label class="label">
                        <span class="label-text">Where can we contact you?</span>
                    </label>
                    <input
                        required
                        type="text"
                        placeholder="email@example.com"
                        class="input-bordered input w-full max-w-lg"
                    />
                </div>
                <div class="form-control w-full max-w-lg">
                    <label class="label">
                        <span class="label-text">What is the subject?</span>
                    </label>
                    <input
                        required
                        type="text"
                        placeholder="Type here"
                        class="input-bordered input w-full max-w-lg"
                    />
                </div>

                <div class="form-control w-full max-w-lg">
                    <label class="label">
                        <span class="label-text">What is your message?</span>
                    </label>
                    <textarea class="textarea" placeholder="Bio"></textarea>
                </div>

                <input
                    required
                    type="submit"
                    value="Submit"
                    class="btn-primary btn"
                />
            </form>
        </>
    );
};

export default ContactForm;
