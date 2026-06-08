import React from 'react'
type Props = {
    text?: string;
    size?: "small" | "medium" | "large";
    color?: string;
};

// <T>型は、Tのすべてのプロパティからオプショナルの ? を取り除く
// デフォルト値のプロパティをすべて保証する
const defaultProps: Required<Props> = {
    text: "Click me",
    size: "medium",
    color: "blue",
};
const Button = (props: Props) => {
    // 後ろのオブジェクトで上書き
    const {text, size, color} = {...defaultProps, ...props};
    const buttonStyle = {
        padding: size === 'small' ? '5px 10px' : 
                 size === 'large' ? '15px 30px' : '10px 20px',
        backgroundColor: color,
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };
  return (
    <button style={buttonStyle}>{text}</button>
  )
}

const Q08 = () => {
  return (
    <div>
        <Button text={'Push me'} size={'large'} color={'#f00'}/>
    </div>
  )
}

export default Q08
