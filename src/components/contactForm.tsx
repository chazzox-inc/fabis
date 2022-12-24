const ContactForm = () => {
    return   (<form action="" method="post" class="flex flex-col max-w-3xl mx-auto items-center gap-4">
    <div class="form-control w-full max-w-lg">
        <label class="label">
            <span class="label-text">Where can we contact you?</span>
        </label>
        <input type="text" placeholder="email@example.com" class="input input-bordered w-full max-w-lg" />
    </div>
    <div class="form-control w-full max-w-lg">
        <label class="label">
            <span class="label-text">What is the subject?</span>
        </label>
        <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-lg" />
    </div>
    
    <div class="form-control w-full max-w-lg">
        <label class="label">
            <span class="label-text">What is your message?</span>
        </label>
        <textarea class="textarea" placeholder="Bio"></textarea>
    </div>

    <input type="submit" value="Submit" class="btn btn-primary" />
       
        </form> )
};

export default ContactForm;