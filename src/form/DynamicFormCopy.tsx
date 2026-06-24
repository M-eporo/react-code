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

    const updateSkill = (id: number, field: string, value: string) => {
        setSkills(prev => {
            prev.map(skill => {
                if(skill.id === id) {
                    return { ...skill, [field]: value}
                } else {
                    return skill;
                }
            })
            return prev;
        });
    };

    const addSkill = () => {
        if(skills.length >= 5) {
            alert("登録可能なスキルは5つです。");
            return;
        }
        setSkills(prev => [...prev, { id: nextIdRef.current, name: "", level: "beginner"}]);
        nextIdRef.current += 1;
    };
    const removeSkill = (id: number) => {
        if(skills.length <= 1) {
            alert("スキルは最低一つ必要です。");
            return;
        }
        setSkills(prev => prev.filter(skill => skill.id !== id));
    };
    const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validateSkills = skills.filter(skill => skill.name.trim());
        if(validateSkills.length === 0) alert("スキルは一つ以上登録してください");
        return;
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                {skills.map((skill) => (
                    <div>
                        <input type="text" value={skill.name} onChange={(e) => updateSkill(skill.id, "name", e.target.value)} />
                        <select name="" id="" value={skill.level} onChange={(e) => updateSkill(skill.id, "name", e.target.value)}>
                            <option value="beginner">初級</option>
                            <option value="middle">中級</option>
                            <option value="advanced">上級</option>
                        </select>
                        <button onClick={addSkill}>追加</button>
                        <button onClick={() => removeSkill(skill.id)}>削除</button>
                    </div>
                ))}
            </form>
            <div>
                <pre>
                {JSON.stringify((
                    skills.filter(skill => skill.name.trim()),
                    null, 2
                ))}
                </pre>
            </div>
        </>
    )
}

export default DynamicFormCopy