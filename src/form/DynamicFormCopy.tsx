import React, { useRef, useState } from 'react'
type Skill = {
    id: number;
    name: string;
    level: string;
}
const DynamicFormCopy = () => {
    const [skills, setSkills] = useState<Skill[]>([
        { id: 1, name: "", level: "beginner" }
    ]);
    const nextIdRef = useRef(2);

    const updateSkill = (id: number, name: string, value: string) => {
        setSkills(prev => {
            prev.map(skill => {
                if(skill.id === id) {
                    return {...skill, [name]: value}
                }
                else return skill;
            });
            return prev;
        });
        setSkills(prev => 
            prev.map(skill => 
                skill.id === id ? {...skill, [name]: value} : skill)
        )
    };

    const addSkill = () => {
        if(skills.length >= 5) return;
        const newId = nextIdRef.current;
        setSkills(prev => [...prev, {id: newId, name: "", level: "beginner"}]);
        nextIdRef.current += 1;
    };

    const removeSkill = (id: number) => {
        if(skills.length > 1) {
            setSkills(prev => 
                prev.filter(skill => skill.id !== id)
            );
        }
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validateSkills = skills.filter(skill => skill.name.trim());
        if(validateSkills.length === 0) {
            alert("more then one skill required");
            return;
        }

    };
    return (
        <form onSubmit={handleSubmit}>
            {skills.map((skill) => (
                <div key={skill.id}>
                    <label htmlFor="">名前</label>
                    <input type="text" value={skill.name} onChange={(e) => updateSkill(skill.id, "name", e.target.value)} />
                    <select name="" id="" onChange={(e) => updateSkill(skill.id, "name", e.target.value)}>
                        <option value="beginner">初級</option>
                        <option value="middle">中級</option>
                        <option value="advanced">上級</option>
                    </select>
                    <button type="button" disabled={skills.length >= 5} onClick={addSkill}>追加</button>
                    <button type="button" onClick={() => removeSkill(skill.id)}>削除</button>
                    <button type="submit">送信</button>
                </div>
            ))}    
        </form>
    );
};

export default DynamicFormCopy