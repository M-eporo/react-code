import React, { useRef, useState } from 'react'
type Skill = {
    id: number;
    name: string;
    level: string;
};

const DynamicFormCopy = () => {
    const [skills, setSkills] = useState<Skill[]>([
        { id: 1, name: "", level: "beginner" }
    ]);
    const nextIdRef = useRef(2);

    const updateSkill = (id: number, field: string, value: string) => {
        setSkills(prev => {
            prev.map(skill => {
                if(skill.id === id) {
                    return {...skill, [field]: value}
                }else {
                    return skill;
                }
            });
            return prev;
        });
    };

    const addSkill = () => {
        if(skills.length >= 5) return;
        const newId = nextIdRef.current;
        setSkills(prev => ([...prev, {id: newId, name: "", level: "beginner"}]));
        nextIdRef.current += 1;
    };

    const removeSkill = (id: number) => {
        setSkills(prev => {
            if(prev.length > 1) {
                return prev.filter(skill => skill.id !== id)
            }
            return prev;
        });
    };

    const handleSubmit =(e:React.SubmitEvent<HTMLFormElement>) => {
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
                    <input type="text" value={skill.name} onChange={(e) => updateSkill(skill.id, "name", e.target.value)}/>
                    <select name="" id="" onChange={(e) => updateSkill(skill.id, "level", e.target.value)}>
                        <option value="beginner">初級</option>
                        <option value="middle">中級</option>
                        <option value="advanced">上級</option>
                    </select>
                    <button
                        type="button"
                        onClick={addSkill}
                        disabled={skills.length >= 5}
                    >
                        追加
                    </button>
                    <button
                        type="button"
                        onClick={() => removeSkill(skill.id)}
                        disabled={skills.length <= 1}
                    >
                        削除
                    </button>
                    <div style={{
                        marginTop: "20px",
                        padding: "15px",
                        backgroundColor: "#f5f5f5",
                        borderRadius: "4px",
                    }}
                    >
                        <p>送信データ</p>
                        <pre>{JSON.stringify(
                                skills.filter(skill => skill.name.trim()), 
                                null, 
                                2
                            )}
                        </pre>
                    </div>
                </div>
            ))}
        </form>

    );
}

export default DynamicFormCopy