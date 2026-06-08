import React, { useState } from 'react'

type FieldName = "field1" | "field2" | "field3";
type FieldValue = {
    field1: string;
    field2: string;
    field3: string;
}
type Errors = {
    field1: string;
    field2: string;
    field3: string;
}
const Focus_Blur_Copy = () => {
    const fieldNames: FieldName[] = ["field1", "field2", "field3"];
    const [focusfield, setFocusField] = useState<FieldName | null>(null);
    const [values, setValues] = useState<FieldValue>({
        field1: "",
        field2: "",
        field3: "",
    });
    const [errors, setErrors] = useState<Errors>({
        field1: "",
        field2: "",
        field3: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        setValues(prev => ({
            ...prev,
            [fieldName]: e.target.value
        }));
        if(e.target.value.length >= 3) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: ""
            }));
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>, fieldName: FieldName) => {
        setFocusField(fieldName);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>, fieldName: string) => {
        if(e.target.value.length < 3) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: "3文字以上入力してください。"
            }));
        } else {
            setErrors(prev => ({
                ...prev,
                [fieldName]: ""
            }));
        }
    };

    const formValidation = () => {
        return Object.values(values).every(value => value.length >= 3);
    };
    return (
        <div>
            {fieldNames.map((fieldName) => (
                <div>
                    <input 
                        type="text"
                        style={{
                            outline: "none",
                            borderColor: focusfield === fieldName ? "#f00" : "#000"
                        }}
                        value={values[fieldName]}
                        onFocus={(e) => handleFocus(e, fieldName)}
                        onBlur={(e) => handleBlur(e, fieldName)}
                        onChange={(e) => handleChange(e, fieldName)}
                    />
                    {errors[fieldName] && <p>{errors[fieldName]}</p>}
                </div>
            ))}
            <button type="button" disabled={!formValidation}>送信</button>
        </div>
    );
};

export default Focus_Blur_Copy