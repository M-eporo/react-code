import React, { useRef, useState } from 'react'
type FileData = {
    name: string;
    size: number;
    type: string;
} | null;
type SubmittedDataType = {
    name: string;
    email: string;
    file: FileData;
} | null;
const FileForm = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const [submittedData, setSubmittedData] = useState<SubmittedDataType>(null);
    const [fileName, setFileName] = useState("");

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = nameRef.current?.value || "";
        const email = emailRef.current?.value || "";
        const file = fileRef.current?.files?.[0] ? {
            name: fileRef.current?.files?.[0].name,
            size: fileRef.current?.files?.[0].size,
            type: fileRef.current?.files?.[0].type,
        } : null;
        setSubmittedData({ name, email, file });
    };

    const focusFirstEmpty = () => {
        if(!nameRef.current?.value) {
            nameRef.current?.focus();
        } else if (!emailRef.current?.value) {
            emailRef.current?.focus();
        } else {
            alert('すべて入力されています。');
        }
    };

    const handleFileChange = () => {
        const file = fileRef.current?.files?.[0].name || "";
        setFileName(file);
    };
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">名前</label>
                    <input type="text" id="name" name="name" ref={nameRef} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">名前</label>
                    <input type="email" id="email" name="email" ref={emailRef} />
                </div>
                <div className="form-group">
                    <label htmlFor="file">ファイル</label>
                    <input type="file" id="file" name="file" ref={fileRef} onChange={handleFileChange} />
                    {fileName && (
                        <p>選択 : {fileName}</p>
                    )}
                </div>
                <button type="submit">送信</button>
                <button type="button" onClick={focusFirstEmpty}>空欄にフォーカス</button>
            </form>
            {submittedData && (
                <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            )}
        </div>
    );
}

export default FileForm