import React, { useState } from "react";

type FormValues = Record<string, string | number | boolean>;
type FormErrors = Record<string, string>;
type ValidationFn<T extends FormValues> = (values: T) => FormErrors;

type UserForm = FormValues & {
    email: string;
    password: string;
};

const useForm = <T extends FormValues>(initialValues: T, validate: ValidationFn<T>) => {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        if(errors[e.target.name]) {
            setErrors((prev) => ({
                ...prev,
                [e.target.name]: "",
            }))
        }
    };

    const handleSubmit = (onSubmit: (values: T) => void) => {
        return (e: React.SubmitEvent) => {
            e.preventDefault();
            if(validate) {
                const validationErrors = validate(values);
                setErrors(validationErrors);
                if(Object.keys(validationErrors).length > 0) {
                    return;
                }
            }
            onSubmit(values);
        }
    };

    const reset = () => {
        setValues(initialValues);
        setErrors({});
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        reset
    };
};

function useApp() {
    const validate: ValidationFn<UserForm> = (values: UserForm) => {
        const errors: FormErrors = {};
        if(!values.email) {
            errors.email = "メールアドレスは必須です";
        }

        if(!values.password) {
            errors.password = "パスワードは必須です";
        }

        if(values.password && values.password.length < 6) {
            errors.password = "パスワードは6文字以上で入力してください";
        }

        return errors;
    };

    const {values, errors, handleChange, handleSubmit, reset } = useForm<UserForm>(
        { email: "", password: "" },
        validate
    );

    const onSubmit = () => {
        console.log("Submitted");
    }

    return (
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email"
            />
            {errors?.email && <span className="form-error">{errors.email}</span>}
            <input
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Password"
            />
            {errors?.password && <span className="form-error">{errors.password}</span>}
            <button type="submit">Submit</button>
            <button type="button" onClick={reset}>
                Reset
            </button>
        </form>
    );
}

export default useApp;
