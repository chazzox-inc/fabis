<script>
    import { createForm } from "felte";

    const { form } = createForm({
        onSubmit(values, context) {
            console.log("test");
        },
        onSuccess(response, context) {
            // Do something with the returned value from `onSubmit`.
        },
        onError(err, context) {
            // Do something with the error thrown from `onSubmit`.
        }
    });
</script>

<form use:form>
    <input type="text" name="email" />
    <input type="password" name="password" />
    <button type="submit">Sign In</button>
</form>
