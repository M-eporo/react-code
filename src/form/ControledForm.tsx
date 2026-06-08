import React, { useState } from 'react';
type FormData = {
    name: string;
    email: string;
    phone: string;
};
type Errors = {
    name?: string;
    email?: string;
    phone?: string;
};
type Field = "name" | "email" | "phone";

const MIN_NAME_LENGTH = 2;
const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]$/;
const MIN_PHONE_LENGTH = 10;

const errorMessages = {
    name: `名前は${MIN_NAME_LENGTH}文字以上で入力してください。`,
    email: `メールアドレスの形式が不正です。`,
    phone: `電話番号は${MIN_PHONE_LENGTH}桁以上で入力してください。`
};

const getErrorMessage = (field: Field) => {
    switch (field) {
        case "name":
            return errorMessages.name;
        case "email":
            return errorMessages.email;
        case "phone":
            return errorMessages.phone;
        default:
            return "";
    }
};

const phoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "");
    if (numbers.length <= 3) {
        return numbers;
    }
    if (numbers.length <= 7) {
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}`;
    }
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};

const validateField = (field: Field, value: string) => {
    switch (field) {
        case "name":
            return value.length >= MIN_NAME_LENGTH;
        case "email":
            return EMAIL_FORMAT.test(value);
        case "phone":
            return value.length >= MIN_PHONE_LENGTH;
        default:
            return true;
    }
};

const ControledForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: ""
    });

    const [errors, setErrors] = useState<Errors>({});

    const handleChange = (field: Field, value: string) => {
        const processedValue = field === "phone" ? phoneNumber(value) : value;
        setFormData((prev) => ({ ...prev, [field]: processedValue }));
    };

    const handleBlur = (field: Field) => {
        const value = formData[field];
        if (!validateField(field, value)) {
            setErrors((prev) => ({...prev, [field]: getErrorMessage(field),}));
        } else {
            setErrors((prev) => ({...prev, [field]: ""}));
        }
    };

    return (
        <form action="">
            <div className="form-group">
                <label htmlFor="name">名前</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                />
                {errors.name && <p>{errors.name}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="email">メールアドレス</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="phone">電話番号</label>
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                />
                {errors.phone && <p>{errors.phone}</p>}
            </div>
        </form>
    );
}

export default ControledForm