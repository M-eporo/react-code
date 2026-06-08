type Props = {
    title: string;
    children: React.ReactNode
}
const Card = ({title, children}: Props) => {
  return (
    <div className="card">
        <h2>{title}</h2>
        <div className="card-content">{children}</div>
    </div>
  )
}

const Q09 = () => {
  return (
    <>
        <Card title="カード1">
            <p>asdfasdf</p>
        </Card>
    </>
  )
}

export default Q09
