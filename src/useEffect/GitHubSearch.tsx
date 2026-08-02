import React, { useEffect, useState } from 'react'
// AbortControllerを使うことで、fetchのキャンセルが可能

type Repositories = {
    id: number;
    full_name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
};

type GitHubResponse = {
    items: Repositories[];
};

const GitHubSearch = () => {
    const [query, setQuery] = useState("");
    const [repositories, setRepositories] = useState<Repositories[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        const searchRepositories = async () => {
            if(!query.trim()) {
                setRepositories([]);
                return;
            }

            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`,
                    { signal: controller.signal}
                );

                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: GitHubResponse = await response.json();
                setRepositories(data.items);
            } catch(err) {
                if(err instanceof Error) {
                    if(err.name === "AbortError") {
                        console.log("Fetch aborted");
                    } else {
                    setError(err.message);
                    }
                } else {
                    setError("不明なエラーが発生しました。");
                }

            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            searchRepositories();
        }, 500);

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        }
    }, [query]);

    return (
        <div>
            <h2>GitHub Search</h2>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="検索キーワードを入力..."/>
            {isLoading && <p>検索中...</p>}
            {error && <p>エラー: {error}</p>}

            <div className="repo-list">
                {repositories.map((repo) => (
                    <div key={repo.id} className="repo-card">
                        <h3>
                            <a href={repo.html_url} target='_blank' rel="noopener noreferrer">
                                {repo.full_name}
                            </a>
                        </h3>
                        <div className="repo-stats">
                            <span>⭐{repo.stargazers_count}</span>
                            <span>🍴{repo.forks_count}</span>
                            <span>📓{repo.language}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GitHubSearch
