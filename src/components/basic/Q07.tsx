
type Props = {
    name: string;
    age: number;
    isActive: boolean
}
const UserCard = ({name, age, isActive}: Props) => {
  return (
    <div className="user-card">
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Status: {isActive ? 'アクティブ' : '非アクティブ'}</p>
    </div>
  );
}

const Q07 = () => {
    const users = [
        {name: 'Tanaka', age: 30, isActive: false},
        {name: 'Tanaka', age: 28, isActive: true}
    ]
    return (
        <>
            {users.map((user, index) => (
                <UserCard key={index} {...user} />
            ))}
            <UserCard name={'Hayashi'} age={28} isActive={true}/>
        </>
    );
}

export default Q07