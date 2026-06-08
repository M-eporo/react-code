import { useState } from 'react';
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
const MIN_PHONE_LENGTH = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ERROR_MESSAGES = {
    name: `名前は${MIN_NAME_LENGTH}文字以上で入力して下さい。`,
    email: "正しいメールアドレスを入力してください。",
    phone: `電話番号は${MIN_PHONE_LENGTH}桁以上で入力してください。`
};
const validataField = (field: Field, value: string): boolean => {
    switch(field) {
        case 'name':
            return value.length >= MIN_NAME_LENGTH;
        case "email":
            return EMAIL_REGEX.test(value);
        case "phone":
            return value.length >= MIN_PHONE_LENGTH;
        default:
            return true;
    }
};

const getErrorMessage = (field: Field): string => {
    switch(field) {
        case "name":
            return ERROR_MESSAGES.name;
        case "email":
            return ERROR_MESSAGES.email;
        case "phone":
            return ERROR_MESSAGES.phone;
        default:
            return "";
    }
}

function ControlledForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Errors>({});


  
  const handleChange = (field: Field, value: string) => {
    const processedValue = 
        field === "phone" ? formatPhoneNumber(value) : value;
    if(!validataField(field, processedValue)) {
        const errorMessage = getErrorMessage(field);
        setErrors(prev => ({
            ...prev,
            [field]: errorMessage
        }));
    } else {
        setErrors(prev => ({
            ...prev,
            [field]: ""
        }));
    }
    setFormData(prev => ({
        ...prev,
        [field]: processedValue
    }))
    // バリデーション
  };
  
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "");
    if(numbers.length <= 3) return numbers;
    if(numbers.length <= 7) {
        return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    }
    
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7,11)}`;
    
  };
  
  return (
    <form>
        <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
                名前:
                <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                />
            </label>
            {errors.name && (
                        <span style={{
                            color: "red",
                            display: "block",
                            fontSize: "12px",
                            }}>
                                {errors.name}
                        </span>
                    )}
        </div>
        <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
                名前:
                <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                />
            </label>
            {errors.email && (
                        <span style={{
                            color: "red",
                            display: "block",
                            fontSize: "12px",
                            }}>
                                {errors.email}
                        </span>
                    )}
        </div>
        <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
                名前:
                <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                />
            </label>
            {errors.phone && (
                        <span style={{
                            color: "red",
                            display: "block",
                            fontSize: "12px",
                            }}>
                                {errors.phone}
                        </span>
                    )}
        </div>
      
      
      <div style={{
		marginTop: "20px",
		padding: "15px",
		backgroundColor: "#f5f5f5",
		borderRadius: "4px",
		}}>
        <h4>入力内容:</h4>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </form>
  );
}
 
export default ControlledForm;