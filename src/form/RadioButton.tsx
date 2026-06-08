import React, { useState } from 'react'

const RadioButton = () => {
    const [form, setForm] = useState({
        os: "windows"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <form>
            <fieldset>
                <legend>使用OS: {form.os}</legend>
                <label htmlFor="windows">Windows</label>
                <input type="radio" id="windows" name="os" value="windows" onChange={handleChange} checked={form.os === "windows"}/>
                <label htmlFor="mac">Mac</label>
                <input type="radio" id="mac" name="os" value="mac" onChange={handleChange} checked={form.os === "mac"}/>
                <label htmlFor="linux">Linux</label>
                <input type="radio" id="linux" name="os" value="linux" onChange={handleChange} checked={form.os === "linux"}/>
            </fieldset>
        </form>
    );
}

export default RadioButton