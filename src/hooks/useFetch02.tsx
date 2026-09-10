import { useState, useEffect, useRef } from "react";

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  // フェッチ処理の実装
  // AbortControllerの管理
  // リトライ機能

  const refetch = () => {
    // 再フェッチ機能
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
  } = useFetch("https://jsonplaceholder.typicode.com/users");

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
function PostDetail({ postId }) {
  const {
    data: post,
    loading,
    error,
  } = useFetch(
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
