import { useState, useEffect, useRef } from "react";
type UseFetchReturn<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
};

type UseFetchOptions = {
  retries?: number;
  retryDelay?: number;
}

type User = {
  id: number;
  name: string;
}

function useFetch<T = unknown>(
  url: string, options: UseFetchOptions = {}
): UseFetchReturn<T> {
  const {retries = 0, retryDelay = 1000} = options
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  // フェッチ処理の実装
  // AbortControllerの管理
  // リトライ機能
  useEffect(() => {
    const fetchData = async (retryCount = 0) => {
      setLoading(true);
      setError(null);
      abortControllerRef.current = new AbortController();
      try {
        const response = await fetch(
          url, { signal: abortControllerRef.current.signal }
        );
        if(!response.ok) {
          throw new Error(`Error: ${ response.statusText }`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if(err instanceof Error && err.name === "AbortError") {
          return;
        }
        if(retryCount < retries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          return fetchData(retryCount + 1);
        }
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      abortControllerRef.current?.abort();
    }
  }, [url, refetchTrigger]);
  
  const refetch = () => {
    // 再フェッチ機能
    setRefetchTrigger(prev => prev + 1);
  };

  return { data, loading, error, refetch };
}

// 使用例1: ユーザー一覧
function UserList() {
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useFetch<User[]>("https://jsonplaceholder.typicode.com/users");

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Users</h2>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// 使用例2: 投稿詳細（動的URL）
type Post = {
  id: number;
  title: string;
  body: string;
};
function PostDetail({ postId }) {
  const {
    data: post,
    loading,
    error,
  } = useFetch<Post>(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { cache: true } // キャッシュ有効化
  );

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <article>
      <h2>{post?.title}</h2>
      <p>{post?.body}</p>
    </article>
  );
}
