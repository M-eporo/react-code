import { useEffect, useState } from "react";
type User = {
    id: number;
    name: string;
    email: string;
};

const useFetch = (url: string) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<User | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        const abortController = new AbortController();
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(url, { signal: abortController.signal });
                if(!response.ok) {
                    throw new Error('Error');
                }
                const result: User = await response.json();
                if(isMounted){
                    setData(result);
                }
            } catch (error) {
                if(abortController.signal.aborted) {
                    console.log("Fetch Aborted");
                } else {
                    if(isMounted) {
                        setError(error as Error);
                    }
                }

            } finally {
                setLoading(false);
            }
        }
        fetchData();
        return () => {
            isMounted = false;
            abortController.abort();
        };
    },[url]);

    return { loading, data, error};
};

function useApp() {
    const [userId, setUserId] = useState(1);
    const {loading, data, error} = useFetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
    );

    if(loading) {
        return (
            <div>Loading...</div>
        );
    }

    if(error) {
        return (
            <div>Error: {error.message}</div>
        )
    }

    return (
        <div>
            <h2>User Info</h2>
            <p>Name: {data?.name}</p>
            <p>Email: {data?.email}</p>
            <button onClick={() => setUserId(userId + 1)}>Next User</button>
        </div>
    );
}

export default useApp;
