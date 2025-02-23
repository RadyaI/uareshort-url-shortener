export default function ViewLink({params} : {params: {id: String}}) {
    return (
        <>
            <p>{params.id}</p>
        </>
    )
}