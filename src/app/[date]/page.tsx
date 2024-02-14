export default function DatePage({params}: {params: {date: string}}) {
  return <h1>{params.date}</h1>
}