import { useState } from "react";
type UserRole = "guest" | "user" | "admin";
 
function PermissionControl() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>("guest");
  const [showDetails, setShowDetails] = useState(false);
 
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>権限管理システム</h2>
 
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <label>
          <input type="checkbox" checked={isLoggedIn} onChange={() => setIsLoggedIn(!isLoggedIn)}/>
          ログイン状態
        </label>
 
        <label>
            権限レベル:
             <select style={{ marginLeft: "5px" }}
                value={userRole} 
                onChange={(e) => {
                    const value = e.target.value;
                    if(value === "guest" || value === "user" || value === "admin") {
                        setUserRole(value)
                    }
                }}
            >
            <option value="guest">ゲスト</option>
            <option value="user">一般ユーザー</option>
            <option value="admin">管理者</option>
          </select>
        </label>
      </div>
 
      {/* 基本情報（全員表示） */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          margin: "10px 0",
        }}
      >
        <h3>公開情報</h3>
        <p>誰でも見られる情報です</p>
      </div>
 
        {/* ログインユーザーのみ */}
        {isLoggedIn && (
            <div
                style={{
                    border: "1px solid green",
                    padding: "15px",
                    margin: "10px 0"
                }}
            >
                <h3>ログインユーザー専用</h3>
                <p>プロフィール設定、お気に入り機能など</p>
            </div>
        )}
        {/* 一般ユーザー以上 */}
        {isLoggedIn && (userRole === "user" || userRole === "admin") && (
            <div
                style={{
                    border: "1px solid green",
                    padding: "15px",
                    margin: "10px 0"
                }}
            >
                <h3>一般ユーザー以上</h3>
                <p>投稿機能、コメント機能など</p>
            </div>
        )}
        {/* 管理者のみ */}
        {isLoggedIn && userRole === "admin" && (
            <div
                style={{
                    border: "1px solid green",
                    padding: "15px",
                    margin: "10px 0"
                }}
            >
                <h3>管理者専用</h3>
                <p>ユーザー管理、システム設定など</p>

                <div
                    style={{
                        marginTop: "10px",
                        padding: "10px",
                        backgroundColor: "#f5f5f5",
                    }}
                >
                    <label htmlFor="">
                        <input type="checkbox" name="" id=""
                            checked={showDetails}
                            onChange={(e) => 
                                setShowDetails(e.target.checked)
                            }
                        />
                        詳細表示モード
                    </label>
                </div>
            </div>
        )}
        {/* 管理者でかつ詳細表示ON */}
        {isLoggedIn && userRole === "admin" && showDetails && (
            <div
                style={{
                    border: "2px solid red",
                    padding: "15px",
                    margin: "10px 0"
                }}
            >
                <h3>管理者詳細モード</h3>
                <p>機密情報、詳細ログ、高度な設定など</p>

            </div>
        )}
    </div>
  );
}
 
export default PermissionControl;