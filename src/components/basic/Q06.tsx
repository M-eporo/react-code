const Greeting = (props: {yourName: string}) => {
  return (
    <div>
        <p>こんにちは、{props.yourName}さん！</p>
    </div>
  )
}

const Q06 = () => {
    return (
        <>
            <Greeting yourName={"Takeda"} />
            <Greeting yourName={"Hayashi"} />
            <Greeting yourName={"Matsunaga"} />
        </>
    );
}

type Greeting2Props = {
    yourName: string
}
const Greeting2 = ({ yourName }: Greeting2Props) => {
    return (
    <div>

        <p>こんにちは、{yourName}さん！</p>
    </div>
  )
}

const Q062 = () => {
    return (
        <>
            <Greeting2 yourName={"Tanaka"} />
        </>
    )
}
const Greeting3 = ({yourName}: Greeting2Props) => {
    return(
        <>
            <p>こんにちは、{yourName}さん！</p>
        </>
    );
}
const Q063 = () => {
    const names = ['Tanaka', 'Hayashi', 'Matsunaga'];
    return (
        <>  
            {names.map((name, index) => {
                <Greeting3 yourName={name} key={index}/>
            })}
        </>
    );
}

export {Q06, Q062, Q063}
