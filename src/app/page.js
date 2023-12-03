
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div className='container'>
        <h1> My Todo App</h1>

        <p className="intro">
          Welcome to your Todo App
        </p>
        <Link href="/components/login">
          <button>View Todos</button>
        
        </Link>
     
      </div>
        
     
    </main>
  )
}
