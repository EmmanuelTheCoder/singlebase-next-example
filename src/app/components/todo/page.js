"use client"
import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import { singlebaseClient } from '@/app/utils/singlebaseclient'
import Image from 'next/image';
import deleteimg from '/public/images/delete.png';

export default function page() {

const router = useRouter()


const [todoTask, setTodoTask] = useState("")
const [fetchTodo, setFetchTodo] = useState([])

const [isFetching, setIsFetching] = useState(false)

 const fetchAllTodos = async () => {
  const token = localStorage.getItem("user-auth-token")

  const singlebase = await singlebaseClient(token)
  const res = await singlebase
  .collection("todos")
  .fetch() 

  console.log("fetch todo", res)
  setFetchTodo(res.data);

 
}

useEffect(() => {

  fetchAllTodos()

 }, [isFetching])


  const createTodo = async () => {
    const token = localStorage.getItem("user-auth-token")
    const singlebase = await singlebaseClient(token)
    setIsFetching(true)

      const res = await singlebase
      .collection("todos")
      .insert({
        task: todoTask,
        isDone: false
      })
      setIsFetching(false)

      console.log("add todo", res)
      setTodoTask("")
    
      router.refresh()
  }

  
  const updateTodo = async (key, val) => {
    const token = localStorage.getItem("user-auth-token")
    const singlebase = await singlebaseClient(token)

    setIsFetching(true)

    const res = await singlebase
    .collection("todos")
    .setDoc(key, {
      isDone: val
    })
    

    console.log("update todo response ", res)
    
     setIsFetching(false)
     
    router.refresh()
  }

  const deleteTodo = async (key) => {
    const token = localStorage.getItem("user-auth-token")
    const singlebase = await singlebaseClient(token)
    setIsFetching(true)

    const res = await singlebase 
    .collection("todos")
    .deleteDoc(key)

    console.log("task deleted", res)
    setIsFetching(false)

    router.refresh()
  }

  const signout = async () => {
    const token = localStorage.getItem("user-auth-token")
    const singlebase = await singlebaseClient(token)
    const res = await singlebase
    .auth
    .signOut()

    console.log("signed out", res)

    if(res.ok) {
      router.push("/")
    }
  }
  
  return (
    <div className='todo-container'>
        <h1>My Todos</h1>

        <div className="btn-container">
          <button onClick={signout}>Signout</button>

        </div>
        

        <input type="text" className="todoInput" value={todoTask} onChange={(e)=>setTodoTask(e.target.value)}/>
        <button className="todoBtn" onClick={createTodo}>Add</button>
        
        {fetchTodo.map(todo => {
         
            return (
              <div key={todo._key} className='todos'>
              
                <li>{todo.task}</li>
                
                <input type="checkbox" 
                  checked={todo.isDone} 
                  
                  onChange={()=>updateTodo(todo._key, !todo.isDone)}
                />
                <div>

                  <Image 
                    src={deleteimg}
                    width={20}
                    height={20}
                    alt='delete'
                    onClick={()=>deleteTodo(todo._key)}
                    />

                </div>
                  
              </div>
            )
          
        })}
    </div>
  )
}
