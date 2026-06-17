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
    confirmPassword: "パスワードが一致しません。再入力してください。"
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
    const [allowSubmit, setAllowSubmit] = useState(false);
    //メールアドレスのバリデーション
    const validateEmail = (email: string) => {
        if(!EMAIL_FORMAT.test((email))) {
            setErrors(prev => ({ ...prev, email: errorMessages.email}));
            setAllowSubmit(false);
        } else {
            setErrors(prev => ({ ...prev, email: "" }));
        }
    };
    //パスワードのバリデーション
    const validatePassword = (password: string) => {
        if(password.length < 8) {
            setErrors(prev => ({ ...prev, passwordLength: errorMessages.passwordLength}));
        } else if(!PASSWORD_CHECK.test(password)) {
            setErrors(prev => ({ ...prev, passwordCharacters: errorMessages.passwordCharacters}));
        } else {
            setErrors(prev => ({ ...prev, passwordLength: ""}));
            setErrors(prev => ({ ...prev, passwordCharacters: ""}));
        }
    };

    // パスワードが一致するかを確認
    const isMatchPassword = () => {
        if(formData.password === "") return;

        if(formData.password !== formData.confirmPassword) {
            setErrors(prev => ({...prev, confirmPassword: errorMessages.confirmPassword}));
        } else {
            setErrors(prev => ({...prev, confirmPassword: ""}));
        }
    };
    //パスワード強度をチェック
    const checkPasswordStrength = (password: string) => {
        if(password.length < 8) {
            setPasswordStrength(0);
        } else if(password.length >= 8 && password.length < 16) {
            setPasswordStrength(1);
        } else if(password.length >= 16 && password.length < 32) {
            setPasswordStrength(2);
        }

        if(PASSWORD_CHECK.test(password)) {
            setPasswordStrength(prev => prev + 1);
        } else if (!PASSWORD_CHECK.test(password)) {
            setPasswordStrength(prev => Math.min(0, prev - 1));
        }
    };

    const isAllowSubmit = () => {
        if(formData.agreeToTerms === false &&) {
            setAllowSubmit(false);
            return;
        }
        setAllowSubmit(validateForm());
        setAllowSubmit(true);
    }
    //送信ボタン押したときの再バリデーション
    const validateForm = (): boolean => {
        validateEmail(formData.email);
        validatePassword(formData.password);
        isMatchPassword();
        return false;
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
        //リアルタイムでパスワード強度を確認
        if(e.target.name === "password") {
            checkPasswordStrength(formData.password);
        }
        //リアルタイムでパスワード一致の確認
        //一致しない場合はエラー登録
        if(e.target.name === "confirmPassword") {
            isMatchPassword();
        }
        //リアルタイムで送信可能な状態化を確認
        //エラーが無く、全ての項目が正しく入力されていれば送信ボタンが押せるようになる
        isAllowSubmit();
    };
    //フォーカスが外れた時にバリデーションを実行
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        switch(e.target.name) {
            case "email":
                validateEmail(formData.email);
                return;
            case "password":
                validatePassword(formData.password);
                return;
            default:
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
                    強度: {"★".repeat(passwordStrength)}
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="conformPassword">パスワード(確認用)</label>
                <input type="password" name="conformPassword" id="conformPassword" value={formData.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="agreeToTerms">利用規約に同意する</label>
                <input type="checkbox" name="agreeToTerms" id="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} />
                {errors.agreeToTerms && <p>{errors.agreeToTerms}</p>}
            </div>
            <button type="submit" disabled={!isAllowSubmit}>送信</button>
        </form>
    )
}

export default FormValidation