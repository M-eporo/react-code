import { useState } from 'react';
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

const PASSWORD_PATTERNS = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    digit: /[0-9]/,
    special: /[^a-zA-Z0-9]/,
    strength: /(?=.*[a-z])(?=.*[A-Z])(?=.*0-9)/,
} as const;

function FormValidation() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<Errors>({});
  const [passwordStrength, setPasswordStrength] = useState(0);


  
  const validateEmail = (email: string) => {
    // メールアドレスの検証
    const regex = EMAIL_REGEX.test(email);
    return regex;
  };
  
  const checkPasswordStrength = (password: string) => {
    // パスワード強度チェック
    // 強度: 0-5のスコアを返す
    if(password.length === 0) return 0;
    let strength = 0;
    if(password.length >= 8) strength++;
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
    return strength;
  };
  
  const validateForm = () => {
    // フォーム全体の検証
    const newErrors: Errors = {};

    if(!formData.email) {
        newErrors.email = ERROR_MESSAGES.email.required;
    }else if(!validateEmail(formData.email)) {
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
    } else if(formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = ERROR_MESSAGES.confirmPassword.match;
    }

    if(!formData.agreeToTerms) {
        newErrors.agreeToTerms = ERROR_MESSAGES.agreeToTerms
    }

    return newErrors;
  };
  
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 送信処理
    const newErrors = validateForm();
    setErrors(newErrors);

    if(Object.keys(errors).length === 0) {
        alert("登録が完了しました。");
        console.log("送信データ：", formData);
    } 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({ ...prev, [name]: value}));
    if(name === "email") {
        if(!validateEmail(value)) {
            if(value.length === 0) {
                setErrors(prev => ({
                    ...prev,
                    email: ERROR_MESSAGES.email.required,
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    email: ERROR_MESSAGES.email.invalid,
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
            const newErrors = {...prev};
            delete newErrors[name as keyof Errors];
            return newErrors;
        })
    }
  };

  const isFormValid = 
  formData.email &&
  formData.password &&
  formData.confirmPassword &&
  Object.keys(errors).length === 0;
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>メールアドレス:</label>
        <input
          type="email"
          value={formData.email}
          name="email"
          // onChange処理
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      
      <div>
        <label>パスワード:</label>
        <input
          type="password"
          value={formData.password}
          name="password"
          // onChange処理
          onChange={handleChange}
        />
        <div className="password-strength">
          強度: {'★'.repeat(passwordStrength)}{'☆'.repeat(5 - passwordStrength)}
        </div>
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      
      {/* 他のフィールドも実装 */}
      <div>
        <label>確認パスワード:</label>
        <input
          type="password"
          value={formData.confirmPassword}
          name="confirmPassword"
          // onChange処理
          onChange={handleChange}
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
      </div>

      <div>
        <label>
        <input
          type="checkbox"
          checked={formData.agreeToTerms}
          name="agreeToTerms"
          // onChange処理
          onChange={handleChange}
        />
        利用規約に同意する
        </label>
        {errors.agreeToTerms && <span className="error">{errors.agreeToTerms}</span>}
      </div>
      
      <button type="submit" disabled={!isFormValid}>
        登録
      </button>
    </form>
  );
}
 
export default FormValidation;