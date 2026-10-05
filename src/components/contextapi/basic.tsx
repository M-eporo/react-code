import { createContext, useContext } from "react";
type UserContextType = {
    username: string;
};
const UserContext = createContext<UserContextType | undefined>(undefined);

function useUserContext() {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error("UserContext must be used within a UserContextProvider");
    }
    return context;
}

function App() {
    return (
        <div>
            <UserContext value={{username: "Taro"}}>
                <Header />
                <Profile/>
            </UserContext>
        </div>
    );
}

function Header() {
    const { username } = useUserContext();
    return (
        <h1 className="theme-header">Welcome, {username}</h1>
    )
}

function Profile() {
    const { username } = useUserContext();
    return (
        <div className="theme-profile">
            <p>Username: {username}</p>
        </div>
    )

}
export default App
