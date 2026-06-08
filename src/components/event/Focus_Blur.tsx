import React, { useState } from 'react'
type FieldName = "field1" | "field2" | "field3";
type Formvalues = {
    field1: string;
    field2: string;
    field3: string;
}
type Errors = {
    field1: string;
    field2: string;
    field3: string;
}
const Focus_Blur = () => {
    const [focusedField, setFocusedField] = useState<FieldName | null>(null);
    const [values, setValues] = useState<Formvalues>({
        field1: "",
        field2: "",
        field3: "",
    });
    const [borderColor, setBorderColor] = useState("black");
    const [errors, setErrors] = useState<Errors>({
        field1: "",
        field2: "",
        field3: "",
    });
    

    const handleChange = (fieldName: FieldName, value: string) => {
        setValues(prev => ({
            ...prev,
            [fieldName]: value,
        }));
        if(value.length >= 3 ) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: "",
            }))
        }
    };
    const handleFocus = (fieldName: FieldName) => {
        setBorderColor("#f00");
        setFocusedField(fieldName)
    };
    const handleBlur = (fieldName: FieldName) => {
        setBorderColor("#000");
        setFocusedField(null)
        if(values[fieldName].length > 0 && values[fieldName].length < 3) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: "3文字以上入力してください"
            }));
        } else {
            setErrors(prev => ({
                ...prev,
                [fieldName]: ""
            }));
        }
    };

    const isFormValidate = 
        values.field1.length >= 3 &&
        values.field2.length >= 3 &&
        values.field2.length >= 3;
    const formValidation = (): boolean => {
        return Object.values(values).every(value => value.length >= 3);
    };
    const fieldName: FieldName[] = ["field1", "field2", "field3"];
    return (
        <>
            <div>
                {fieldName.map((fieldName) => (
                    <div key={fieldName}>
                        <input 
                            type="text"
                            placeholder="3文字以上" 
                            style={{
                                borderColor: borderColor,
                                borderWidth: "2px",
                                borderStyle: "solid",
                                outline: "none"
                            }}
                            onChange={(e) => handleChange(fieldName, e.target.value)}
                            onFocus={() => handleFocus(fieldName)}
                            onBlur={() => handleBlur(fieldName)}
                            value={values[fieldName]}
                        />
                        {errors[fieldName] &&  (
                        <div>
                            <p>{errors[fieldName]}</p>
                        </div>
                        )}
                    </div>
                ))}
            </div>
            <button 
                type="button" 
                name="submit-button"
                disabled={!formValidation}
            >送信</button>
        </>
    )
}

export default Focus_Blur