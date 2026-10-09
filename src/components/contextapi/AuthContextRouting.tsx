import React, { createContext, useContext, useState } from 'react';
type User = {
  username: string;
};
type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}
// AuthContextを作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);
function useAuthContext() {
  const context = useContext(AuthContext);
  if(!context) {
    throw new Error('');
  }
  return context;
}
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    // ログイン処理
    if(username && password.length > 3) {
      setIsAuthenticated(true);
      setUser({username});
      return true;
    }
    return false;
  };

  const logout = () => {
    // ログアウト処理
    setIsAuthenticated(false);
    setUser(null);
  };

  const contextValue = { isAuthenticated, user, login, logout };

  return (
    // Providerで値を提供
    <AuthContext value={contextValue}>
      {children}
    </AuthContext>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    // 認証チェック
    // 未認証時はLoginPageを表示
    const { isAuthenticated } = useAuthContext();
    if(!isAuthenticated) {
      return <LoginPage />
    }
  return children;
}

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthContext();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ログイン処理
    const success = login(username, password);
    if(!success) {
      alert('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="text"
        className="login-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" className="login-button">Login</button>
    </form>
  );
}

function Dashboard() {
  // 認証が必要なコンポーネント
  const { user, logout } = useAuthContext();

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.username}!</h1>
      <button onClick={logout} className="logout-button">Logout</button>
    </div>
  );
}

function AuthContextRouting() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default AuthContextRouting;
