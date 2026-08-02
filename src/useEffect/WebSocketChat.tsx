import { useEffect, useRef, useState } from 'react'
type Message = {
    id: string;
    content: string;
    timestamp: string;
    type: "sent" | "received";
};

type ConnectionStatus = "connected" | "connecting" | "disconnected" | "error";
const WebSocketChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected");
    const [reconnectCount, setReconnectCount] = useState(0);

    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<number | null>(null);
    const shouldCloseInCleanup = useRef<boolean>(true);

    useEffect(() => {
        const connectWebSocket = () => {
            const ws = new WebSocket("wss://echo.websocket.org/");

            ws.onopen = () => {
                setConnectionStatus("connected");
                setReconnectCount(0);
            };

            ws.onmessage = (event) => {
                const newMessage: Message = {
                    id: Date.now().toString(),
                    content: event.data,
                    timestamp: new Date().toLocaleTimeString(),
                    type: "received",
                };
                setMessages((prev) => [...prev, newMessage]);
            };

            ws.onerror = () => {
                setConnectionStatus("error");
            };

            ws.onclose = () => {
                setConnectionStatus("disconnected");

                reconnectTimeoutRef.current = window.setTimeout(() => {
                    setReconnectCount((prev) => prev + 1);
                }, 3000);

                // 意図的な切断が起きたので、次のクリーンアップでは close してよい
                shouldCloseInCleanup.current = true;
            };

            wsRef.current = ws;
        };

        if (!wsRef.current) {
            shouldCloseInCleanup.current = false;
            connectWebSocket();
        }

        return () => {
            if (shouldCloseInCleanup.current) {
                wsRef.current?.close();
                wsRef.current = null;
            }

            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
                reconnectTimeoutRef.current = null;
            }
        };
    }, [reconnectCount]);

    const sendMessage = () => {
        if (
            wsRef.current?.readyState === WebSocket.OPEN && inputMessage.trim()
        ) {
            wsRef.current.send(inputMessage);

            const sentMessage: Message = {
                id: Date.now().toString(),
                content: inputMessage,
                timestamp: new Date().toLocaleTimeString(),
                type: "sent",
            };
            setMessages((prev) => [...prev, sentMessage]);
            setInputMessage("");
        }
    };

    return (
        <div className="websocket-chat">
            <h2>WebSocketChat</h2>
            <div className="connection-status">
                <span className={`status-indicator ${connectionStatus}`} />接続状態: {connectionStatus}
                {reconnectCount > 0 && `再接続試行回数: ${reconnectCount}回目`}
            </div>

            <div className="chat-window">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.type}`}>
                        <span className="message-timestamp">{msg.timestamp}</span>
                        <span className="message-content">{msg.content}</span>ontent
                    </div>
                ))}
            </div>

            <div className="chat-input-area">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="メッセージを入力..."
                    disabled={connectionStatus !== "connected"}
                    className='chat-input'
                />
                <button
                    type="button"
                    onClick={sendMessage}
                    disabled={connectionStatus !== "connected"}
                    className="send-button"
                >送信</button>
            </div>
        </div>
    )
}

export default WebSocketChat
