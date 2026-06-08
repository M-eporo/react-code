import React, { useState } from 'react'

const SelectBox = () => {
    const [form, setForm] = useState({
        animal: "dog"
    });
    const handleForm = (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const show = () => {
        console.log(`好きな動物: ${form.animal}`);
    };
  return (
    <form>
        <label htmlFor="animal">コメント : </label><br />
        <select name="animal" id="animal" value={form.animal} onChange={handleForm}>
            <option value="dog">犬</option>
            <option value="cat">猫</option>
            <option value="rabbit">ウサギ</option>
            <option value="hamster">ハムスター</option>
        </select>
        <button type="button" onClick={show}>送信</button>
    </form>
  )
}

export default SelectBox