import React, { useState } from 'react'

const FormTextArea = () => {
    const [form, setForm] = useState({
        comment: ""
    });
    const handleForm = (e: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const show = () => {
        console.log(`コメント: ${form.comment}`);
    };
  return (
    <form>
        <label htmlFor="comment">コメント : </label><br />
        <textarea name="comment" id="comment" cols={30} rows={7} value={form.comment} onChange={handleForm}></textarea>
        <button type="button" onClick={show}>送信</button>
    </form>
  )
}

export default FormTextArea