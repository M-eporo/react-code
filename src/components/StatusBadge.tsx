import { useState } from 'react';

type Status = "success" | "warning" | "error" | "info";
type Size = "small" | "medium" | "large";

function StatusBadge() {
  const [status, setStatus] = useState<Status>('info'); // success, warning, error, info
  const [isAnimated, setIsAnimated] = useState(false);
  const [size, setSize] = useState<Size>('medium'); // small, medium, large


  const getStatusIcon = () => {
    // ステータスに応じたアイコンを返す
    switch (status) {
		case "success":
			return "✓"; // チェックマーク
		case "warning":
			return "⚠"; // 警告マーク
		case "error":
			return "✕"; // バツマーク
		case "info":
			return "ℹ"; // 情報マーク
		default:
			return "?"; // 疑問符
	}
  };

  const badgeClassName = [
    'badge',
    `badge-${status}`,
    `badge-${size}`,
    isAnimated && "animated"
    /* 条件に応じてクラスを追加 */
  ].filter(Boolean).join(' ');


    return (
        <div>
        <h3>ステータスバッジ</h3>

        <div className="controls">
            <select
                value={status}
                onChange={(e) => {
                    if(e.target.value === "success" || e.target.value === "warning" || e.target.value === "error" || e.target.value === "info") {
                        setStatus(e.target.value);
                    }
                }}
            >

                <option value="success">成功</option>
                <option value="warning">警告</option>
                <option value="error">エラー</option>
                <option value="info">情報</option>
            </select>

            <select
                value={size}
                onChange={(e) => {
                    if(e.target.value === "small" || e.target.value === "medium" || e.target.value === "large") {
                        setSize(e.target.value);
                    }
                }}
            >
                <option value="small">小</option>
                <option value="medium">中</option>
                <option value="large">大</option>
            </select>

            <label>
            <input
                type="checkbox"
                checked={isAnimated}
                onChange={(e) => setIsAnimated(e.target.checked)}
            />
            アニメーション
            </label>
        </div>

        <div className={badgeClassName}>
            <span>{getStatusIcon()}</span>
            <span>{status.toUpperCase()}</span>
        </div>
        </div>
    );
}

export default StatusBadge;
