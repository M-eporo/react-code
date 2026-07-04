import { useState } from 'react';

type FormData = {
    name: string;
    email: string;
    address: string;
    phone: string;
};
type Errors = {
    [key in keyof FormData]?: string;
};

const STEP1 = 1;
const STEP2 = 2;
const STEP3 = 3;
const STEP_LIST = [STEP1, STEP2 ,STEP3];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]{10,11}$/;
 
function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        address: '',
        phone: '',
    });
    const [errors, setErrors] = useState<Errors>({});
    
    const validateStep = (step: number) => {
        const newErrors: Errors = {};
        if(step === STEP1) {
            if(!formData.name) newErrors.name = "名前は必須です。";
            if(!formData.email) {
                newErrors.email = "メールアドレスは必須です。";
            } else if(!EMAIL_REGEX.test(formData.email)) {
                newErrors.email = "無効なメールアドレスです。";
            }
        }

        if(step === STEP2) {
            if(!formData.address) newErrors.address = "住所は必須です。";
            if(!formData.phone.trim()) {
                newErrors.phone = "電話番号は必須です。";
            } else if(!PHONE_REGEX.test(formData.phone)) {
                newErrors.phone = "有効な電話番号を入力してください。";
            }
        }   

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleNext = () => {
        if(validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };
  
    const handlePrev = () => {
        setCurrentStep(prev => prev - 1);
    };
    
    const handleSubmit = () => {
        // 最終送信処理
        alert("Submitted!");
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData({...formData, [field]: value});
        if(errors[field]) {
            const newErrors = {...errors};
            delete newErrors[field];
            setErrors(newErrors);
        }
    };
    
    const renderStep = () => {
        switch(currentStep) {
        case STEP1:
            return (
            <div>
                <h3>Step 1: 基本情報</h3>
                <div className="formGroup">
                    <label htmlFor="name">
                        名前 *
                        <input 
                            type="text"
                            id="name"
                            value={formData.name}    
                            className={errors.name ? "error" : ""}
                            placeholder="お名前を入力してください。"
                            onChange={(e) => handleInputChange("name", e.target.value)}
                        />
                    </label>
                    {errors.name && (
                        <span className="error-message">
                            {errors.name}
                        </span>
                    )}
                </div>
                <div className="formGroup">
                    <label htmlFor="email">
                        メールアドレス *
                        <input 
                            type="email"
                            id="email"
                            value={formData.email}    
                            className={errors.email ? "error" : ""}
                            placeholder="メールアドレスを入力してください。"
                            onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                    </label>
                    {errors.email && (
                        <span className="error-message">
                            {errors.email}
                        </span>
                    )}
                </div>
            </div>
            );
        case STEP2:
            return (
            <div>
                <h3>Step 2: 詳細情報</h3>
                <div className="formGroup">
                    <label htmlFor="name">住所 *</label>
                    <textarea 
                        id="address"
                        value={formData.address}    
                        className={errors.address ? "error" : ""}
                        placeholder="住所を入力してください。"
                        rows={3}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                    {errors.address && (
                        <span className="error-message">
                            {errors.address}
                        </span>
                    )}
                </div>
                <div className="formGroup">
                    <label htmlFor="phone">電話番号 *</label>
                    <input 
                        type="tel"
                        id="phone"
                        value={formData.phone}    
                        className={errors.phone ? "error" : ""}
                        placeholder="電話番号を入力してください。"
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                    {errors.phone && (
                        <span className="error-message">
                            {errors.phone}
                        </span>
                    )}
                </div>
            </div>
            );
        case STEP3:
            return (
            <div>
                <h3>Step 3: 確認</h3>
                <div className="confirmation-section">
                    <h4>基本情報</h4>
                    <div className="confirmation-item">
                        <strong>名前:</strong>{formData.name}
                    </div>
                    <div className="confirmation-item">
                        <strong>メールアドレス:</strong>{formData.email}
                    </div>
                    <h4>詳細情報</h4>
                    <div className="confirmation-item">
                        <strong>住所:</strong>{formData.address}
                    </div>
                    <div className="confirmation-item">
                        <strong>電話番号:</strong>{formData.phone}
                    </div>
                </div>
            </div>
            );
        default:
            return null;
        }
    };
    
    return (
        <div className="multi-step-form">
        <div className="progress-bar">
            <div 
            className="progress" 
            style={{ width: `${(currentStep / 3) * 100}%` }}
            />
        </div>
        
        <div className="step-indicator">
            {STEP_LIST.map(step => (
            <span 
                key={step}
                className={step === currentStep ? 'active' : ''}
            >
                Step {step}
            </span>
            ))}
        </div>
        
        {renderStep()}
        
        <div className="navigation">
            <button 
            onClick={handlePrev} 
            disabled={currentStep === 1}
            >
            前へ
            </button>
            
            {currentStep < 3 ? (
            <button onClick={handleNext}>
                次へ
            </button>
            ) : (
            <button onClick={handleSubmit}>
                送信
            </button>
            )}
        </div>
        </div>
    );
}
 
export default MultiStepForm;