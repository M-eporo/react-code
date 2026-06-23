import React, { useState } from 'react'

type FormData = {
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
};
type Errors = {
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeToTerms?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_PATTERNS = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    digit: /[0-9]/,
    special: /[^a-zA-Z0-9]/,
    strength: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
} as const;

const ERROR_MESSAGES = {
    email: {
        required: "メールアドレスは必須です。",
        invalid: "無効なメールアドレスです。"
    },
    password: {
        required: "パスワードは必須です。",
        length: `パスワードは${MIN_PASSWORD_LENGTH}文字以上で入力してください。`,
        strength: "パスワードは大文字、小文字、数字を含む必要があります。"
    },
    confirmPassword: {
        required: "確認用パスワードは必須です。",
        match: "パスワードが一致しません。"
    },
    agreeToTerms: "利用規約に同意してください。"
} as const;

const FormValidationCopy = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false
    });
    const [errors, setErrors] = useState<Errors>({});
    const [passwordStrength, setPasswordStrength] = useState(0);


    const validateEmail = (email: string) => {
        const regex = EMAIL_REGEX.test(email);
        return regex;
    };

    const checkPasswordStrength = (password: string): number => {
        if(password.length === 0) return 0;

        let strength = 0;
        if(password.length >= MIN_PASSWORD_LENGTH) strength++;
        if(password.length >= 12) strength++;
        if(PASSWORD_PATTERNS.lowercase.test(password)) strength++;
        if(PASSWORD_PATTERNS.uppercase.test(password)) strength++;
        if(PASSWORD_PATTERNS.digit.test(password)) strength++;
        if(PASSWORD_PATTERNS.special.test(password)) strength++;

        if(strength <= 1) return 1;
        if(strength <= 3) return 2;
        if(strength <= 4) return 3;
        if(strength <= 5) return 4;
        if(strength <= 6) return 5;
        return 0;
    };

    const validateForm = () => {
        const newErrors: Errors = {};
        if(!formData.email) {
            newErrors.email = ERROR_MESSAGES.email.required;
        } else if(!validateEmail(formData.email)) {
            newErrors.email = ERROR_MESSAGES.email.invalid;
        }

        if(!formData.password) {
            newErrors.password = ERROR_MESSAGES.password.required;
        } else if(formData.password.length < MIN_PASSWORD_LENGTH) {
            newErrors.password = ERROR_MESSAGES.password.length;
        } else if(!PASSWORD_PATTERNS.strength.test(formData.password)) {
            newErrors.password = ERROR_MESSAGES.password.strength;
        }

        if(!formData.confirmPassword) {
            newErrors.confirmPassword = ERROR_MESSAGES.confirmPassword.required;
        } else if(formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = ERROR_MESSAGES.confirmPassword.match;
        }

        if(!formData.agreeToTerms) {
            newErrors.agreeToTerms = ERROR_MESSAGES.agreeToTerms;
        }

        return newErrors;
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: Errors = validateForm();
        setErrors(newErrors);
        if(Object.keys(errors).length === 0) {
            alert("登録が完了しました。");
            console.log("送信データ：", formData);
        }
        
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));

        if(name === "email") {
            if(!validateEmail(value)) {
                if(value.length === 0) {
                    setErrors(prev => ({
                        ...prev,
                        email: ERROR_MESSAGES.email.required
                    }));
                } else {
                    setErrors(prev => ({
                        ...prev,
                        email: ERROR_MESSAGES.email.invalid
                    }));
                }
            } else {
                setErrors(prev => ({...prev, email: ""}));
            }
        }

        if(name === "password") {
            setPasswordStrength(checkPasswordStrength(value));
        }

        if(errors[name as keyof Errors]) {
            setErrors(prev => {
                const newErrors: Errors = {...prev}
                delete newErrors[name as keyof Errors];
                return newErrors;
            });
        }
    };

    const isFormValid = 
        formData.email &&
        formData.password &&
        formData.confirmPassword &&
        formData.agreeToTerms &&
        Object.keys(errors).length === 0;

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">メールアドレス</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">パスワード</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                    <div>
                        <p>{"★".repeat(passwordStrength)}{"☆".repeat(5 - passwordStrength)}</p>
                    </div>
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">確認用パスワード</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                </div>
                <div className="form-group">
                    <input type="checkbox" id="agreeToTerms" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} />
                    <label htmlFor="agreeToTerms">利用規約に同意する</label>
                    {errors.agreeToTerms && <p>{errors.agreeToTerms}</p>}
                </div>
                <button type="submit" disabled={!isFormValid}>送信する</button>
            </form>
        </div>
    );
}

export default FormValidationCopy