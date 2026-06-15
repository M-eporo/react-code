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
};

const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]$/;
const PASSWORD_CHECK = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/;

const errorMessages = {
    email: "メールアドレスの形式が不正です。",
    passwordLength: "パスワードは8文字以上で入力してください。",
    passwordCharacters: "パスワードは、大文字、小文字、数字を1文字以上使用してください。",
    confirmPassword: "パスワードが一致しません。再度入力してください。"
};  

const FormValidation = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
    });
    const [errors, setErrors] = useState<Errors>({});
    const [passwordStrength, setPasswordStrength] = useState(0);



    const validateEmail = (email: string) => {
        if(!EMAIL_FORMAT.test((email))) {
            setErrors(prev => ({ ...prev, email: errorMessages.email}))
        } else {
            setErrors(prev => ({ ...prev, email: "" }));
            setFormData(prev => ({ ...prev, email}));
        }
    };

    const checkPasswordStrength = (password: string) => {
        if(password.length < 8) {
            setErrors(prev => ({ ...prev, password: errorMessages.passwordLength}));
        } else if(!PASSWORD_CHECK.test(password)) {
            setErrors(prev => ({ ...prev, password: errorMessages.passwordCharacters }));
        }

        

    };

    const validateForm = () => {

    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateForm();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "agreeToTerms") {
            setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked}));
        } else {
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.value}));
        }
        if(e.target.name === "password") {
            checkPasswordStrength(formData.password);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        switch(e.target.name) {
            case "email":
                validateEmail(formData.email);
                return;
            case "confirmPassword":
                if(formData.password !== formData.confirmPassword) {
                    setErrors(prev => ({...prev, confirmPassword: errorMessages.confirmPassword}));
                }
                return;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">メールアドレス</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} onBlur={e=>handleBlur} />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="password">パスワード</label>
                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange}  onBlur={handleBlur} />
                <div>
                    強度: {"★".repeat()}
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="conformPassword">パスワード(確認用)</label>
                <input type="password" name="conformPassword" id="conformPassword" value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="agreeToTerms">利用規約に同意する</label>
                <input type="checkbox" name="agreeToTerms" id="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} />
                {errors.agreeToTerms && <p>{errors.agreeToTerms}</p>}
            </div>
            <button type="submit">送信</button>
        </form>
    )
}

export default FormValidation