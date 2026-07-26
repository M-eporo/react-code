import { useEffect, useState } from 'react';
type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    username: string;
    website: string;
    company?: {
        name: string;
    }
};
const isUser = (data: unknown): data is User => {
    if(typeof data !== "object" || data === null) {
        return false;
    }
    const user = data as Record<string, unknown>;

    if(
        typeof user.id !== "number" ||
        typeof user.name !== "string" ||
        typeof user.email !== "string" ||
        typeof user.phone !== "string" ||
        typeof user.username !== "string" ||
        typeof user.website !== "string"
    ) {
        return false;
    }

    if(user.company !== undefined) {
        if(
            typeof user.company !== "object" ||
            user.company === null
        ) {
            return false;
        }

        const company = user.company as Record<string, unknown>;
        if(typeof company.name !== "string") {
            return false;
        }
    }

    return true;
}
const isUserArray = (data: unknown): data is User[] => {
   return Array.isArray(data) && data.every(isUser);
}

const UserFetch = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            setErrors(null);

            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );
                if(!response.ok) {
                    throw new Error(`データ取得に失敗しました。 Status: ${response.status}`);
                }
                const data: unknown = await response.json();
                if(!isUserArray(data)) {
                    throw new Error("取得したデータ形式が不正です。");
                }
                console.log(data);
                setUsers(data);
            } catch (error) {
                if(error instanceof Error) {
                    setErrors(error.message);
                } else {
                    setErrors("予期しないエラーが発生しました。");
                }
                console.error(error);
                
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [retryCount]);

    const handleRetry = () => {
        setRetryCount((prev) => prev + 1);
    };

    if(isLoading) {
        return(
            <p>読み込み中...</p>
        );
    }

    if(errors) {
        return (
            <div>
                <p>エラー: {errors}</p>
                <button onClick={handleRetry}>リトライ ({retryCount})</button>
            </div>
        );
    }
    return (
        <div>
            <h2>ユーザー覧</h2>
            <button onClick={handleRetry}>再読み込み</button>
            <div className="user-grid">
                {users.map((user) => (
                    <div key={user.id} className="user-card">
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <p>{user.company?.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserFetch