import React, { useState } from 'react'

// 複数選択のリストボックスの値は配列で受ける
const ListBox = () => {
    const [form, setForm] = useState({
        animal: []
    });
    const handleFormList = (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
        const data = [];
        // 配列で、select以下のoptionタグが格納されている
        const opts = e.target.options;
        console.log(e.target.options);
        for(const opt of opts) {
            if(opt.selected) {
                data.push(opt.value);
            }
        }
        setForm({
            ...form,
            [e.target.name]: data
        })
    };
    const show = () => {
        console.log(`好きな動物: ${form.animal}`);
    };
  return (
    <form>
        <label htmlFor="animal">好きな動物 : </label><br />
        <select name="animal" id="animal"
            value={form.animal}
            size={4}
            multiple={true}
            onChange={handleFormList}
        >
            <option value="dog">犬</option>
            <option value="cat">猫</option>
            <option value="rabbit">ウサギ</option>
            <option value="hamster">ハムスター</option>
        </select>
        <button type="button" onClick={show}>送信</button>
    </form>
  )
}

export default ListBox