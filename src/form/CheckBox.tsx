import { useState } from "react"

const CheckBox = () => {
    const [form, setForm] = useState({
        agreement: true
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.checked
        });
    };
    console.log(form);
    return (
        <form action="">
            <label htmlFor="agreement">同意します。</label>
            <input type="checkbox" name="agreement" id="agreement" checked={form.agreement} onChange={handleChange}/>
        </form>
        
    )
}

export default CheckBox