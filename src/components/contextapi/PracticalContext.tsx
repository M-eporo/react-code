import React, { createContext, useContext, useState } from 'react'

type Notification = {
    id: number;
    msg: string;
}
type NotificationContextType = {
    notifications: Notification[];
    addNotification: (msg: string) => void;
    removeNotification: (id: number) => void;
    clearAll: () => void;
}
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    if(!context) {
        throw new Error('');
    }
    return context;
}
function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (msg: string) => {
        const newNotification: Notification = {
            id: Date.now(),
            msg
        };
        setNotifications((prev) => ([...prev, newNotification]));
    };

    const removeNotification = (id: number) => {
        setNotifications((prev) => (
            prev.filter((notification) => notification.id !== id)
        ));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const contextValue = {
        notifications,
        addNotification,
        removeNotification,
        clearAll
    };

    return (
        <NotificationContext value={contextValue}>
            {children}
        </NotificationContext>
    )
}

function NotificationList() {
    const {notifications, removeNotification} = useNotificationContext();
    if(notifications.length === 0) {
        return <div><p>通知はありません。</p></div>
    }

    return (
        <div>
            <h3>通知一覧 {notifications.length}件</h3>
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        margin: "5px 0",
                        borderRadius: "4px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div>{notification.msg}</div>
                    <button
                        onClick={() => removeNotification(notification.id)}
                        style={{marginLeft: "10px" }}
                    >
                        X
                    </button>
                </div>
            ))}
        </div>
    )
}

function NotificationActions() {
    const { addNotification, clearAll } = useNotificationContext();
    return (
        <div>
            <button onClick={() => addNotification}>Add Notification</button>
            <button onClick={() => clearAll}>Clear All Notification</button>
        </div>
    );
}


const PracticalContext = () => {
  return (
    <NotificationProvider>
        <NotificationActions />
        <NotificationList />
    </NotificationProvider>
  )
}

export default PracticalContext
