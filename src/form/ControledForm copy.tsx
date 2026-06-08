import React, { useState } from 'react'
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

const ControledForm copy = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
    });
    const [errors, setErrors] = useState<Errors>({});
    
  return (
    <div>
        <form action="">
            <div>
            <label htmlFor="name">名前</label>
            <input type="text" />
            </div>
        </form>
    </div>
  )
}

export default ControledForm copy