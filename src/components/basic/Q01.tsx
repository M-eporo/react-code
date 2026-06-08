// import type { JSX } from "react";
import "../../App.css";

const HelloWorld: React.FC = () => {
    return (
        <h1>Hello, World!</h1>
    );
}

export default HelloWorld

// // 戻り値の型を明示的に指定
// export function Profile(): JSX.Element {
//     return(
//         <>
//             <h1>私のプロフィール</h1>
//         </>
//     );
// }
// // より厳密な型定義 React名前空間を明示的に使用
// export function Profile(): React.JSX.Element {
//     return(
//         <>
//             <h1>私のプロフィール</h1>
//         </>
//     );
// }
// // 戻り値の型指定
// export const Profile = (): JSX.Element {
//     return(
//         <>
//             <h1>私のプロフィール</h1>
//         </>
//     );
// }
// // 定数に代入されている関数コンポーネントの型を指定
// // React.FC型を使用（推奨）
// // FCとは、children, key, ref などの プロパティを自動的に含む
// export const Profile: React.FC = () => {
//     return(
//         <>
//             <h1>私のプロフィール</h1>
//         </>
//     );
// }
// // または
// import type {FC} from 'react';
// export const Profile: FC = () => {
//     return(
//         <>
//             <h1>私のプロフィール</h1>
//         </>
//     );
// }
// より詳細な型定義
// export const Profile: FC<{}> = () => {
//     return(
//         <>
//             <h1>私のプロフィール</h1>
//         </>
//     );
// }