import { useId } from "react";

type Props = {
    label: string;
    type: string;
    placeholder: string;
    required: boolean
}

// restPropsはオブジェクト
// jsの残余構文は配列
const InputField = ({label, ...restProps}: Props) => {
    const id = useId();
    return (
    <div className="input-filed">
        <label htmlFor={id}>{label}</label>
        <input id={id} {...restProps} />
        <p></p>
    </div>
    )
}

const Q10 = () => {
  return (
    <InputField
        label="メールアドレス"
        type="email"
        placeholder="example@example.com"
        required
    />
  )
}

export default Q10
