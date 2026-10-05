import React, { createContext, useContext, useState } from 'react'
type AuthContextType = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

type User = {
    name: string;
}
const UserContext = createContext<UserContextType | undefined>(undefined);
const AuthContext = createContext<AuthContextType | undefined>(undefined);
function useUserContext() {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error("");
    }
    return context;
}
function useAuthContext() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("");
    }
    return context;
}

function App() {
    return (
            <AuthProvider>
                <UserProvider>
                    <div>
                        <DashBoard />
                    </div>
                </UserProvider>
            </AuthProvider>
    );
}

function AuthProvider({children}: {children: React.ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext value={{ isAuthenticated, login, logout}}>
            {children}
        </AuthContext>
    )
}

function UserProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    return (
        <UserContext value={{ user, setUser }}>
            {children}
        </UserContext>
    )
}

function DashBoard() {
    const { isAuthenticated, logout } = useAuthContext();
    const { user, setUser } = useUserContext();

    const handleLogout = () => {
        logout();
        setUser(null);
    };
    if(!isAuthenticated) {
        return <LoginForm />;
    }
    return (
        <div>
            <h1>Welcome to the Dashboard, {user?.name}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

function LoginForm() {
    const { login } = useAuthContext();
    const { setUser }= useUserContext();
    const [username, setUsername] = useState("");

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        if(username.trim()) {
            setUser({ name: username });
            login();
            setUsername("");
        }
    };

    return (
        <form action="" onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <button type="submit">Login</button>
        </form>
    )
}

export default App
