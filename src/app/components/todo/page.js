"use client"
import React, { useEffect, useState, useTransition} from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { singlebase } from '@/app/utils/singlebaseclient';
import Image from 'next/image';
import deleteimg from '/public/images/delete.png';
import axios from 'axios';
import createClient from '@singlebase/singlebase-js'

export const dynamic = 'force-dynamic'

const apiKey = process.env.NEXT_PUBLIC_SBC_TOKEN;
const apiUrl = process.env.NEXT_PUBLIC_SBC_URL;

const getAuthToken = localStorage.getItem("user-auth-token")





export default function page() {
  

//  const searchParams = useSearchParams();
//  const display_name = searchParams.get('display_name');
//  const userkey = searchParams.get('userkey');
 
 



const router = useRouter()


const [todoTask, setTodoTask] = useState("")
const [fetchTodo, setFetchTodo] = useState([])
const [isPending, startTransition] = useTransition()

const [isFetching, setIsFetching] = useState(false)
 
 async function caller () {
  const SBC_CONFIG  = {
    api_url: apiUrl,
    api_key: apiKey,
    options: {
      headers: {
        "Authorization" : `Bearer ${getAuthToken}`
      }
    }
    
  }
  
  
  const sbc = createClient(SBC_CONFIG)

  const res = await sbc
  .collection("todos")
  .fetch()

  setFetchTodo(res.data);
}

 const fetchAllTasks = async () => {
  //  await axios ({
  //   method: "POST",
  //   url: apiUrl,
  //   headers: {
  //       "X-API-KEY": apiKey,
  //       "Authorization": `Bearer ${getAuthToken}`
  //   },
  //   data: {
  //     action: "db.fetch",
  //     collection: "todos"
  //   }
  // }).then(async (res)  => {
  //   const data = await res.data.data
  //   setFetchTodo(data)
  //   console.log("res from api fetch", data)

    
  // })
  

  const res = await singlebase
  .collection("todos")
  .fetch()

  setFetchTodo(res.data);

  // startTransition(() => {
  //   router.refresh()
  // })
}

useEffect(() => {

  //caller()
  fetchAllTasks() 
  router.refresh()

  // startTransition(() => {
  //   router.refresh()
  // })

 }, [isFetching])


  const addTodo = async () => {

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
    
      
  }

  
  const updateTodo = async(key, val) => {

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

  const deleteATask = async (key) => {
    setIsFetching(true)

    const res = await singlebase 
    .collection("todos")
    .deleteDoc(key)

    console.log("task deleted", res)
    setIsFetching(false)

  }

  const signout = async (id_token) => {
    const res = await singlebase
    .auth
    .signOut(id_token)

    console.log("signed out", res)

    if(res.ok) {
      router.push("/")
    }
  }
  
  return (
    <div className='todo-container'>
        <h1>My Todos</h1>
        
        <button onClick={() => signout(getAuthToken)}>Signout</button>

        <input type="text" value={todoTask} onChange={(e)=>setTodoTask(e.target.value)}/>
        <button onClick={addTodo}>Add</button>
        
        {fetchTodo.map(todo => {
         
            return (
              <div key={todo._key} className='todos'>
              
              
                <li>{todo.task}</li>
                
                <p>{todo.isDone.toString()}</p>
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
                    onClick={()=>deleteATask(todo._key)}
                    />

                </div>
                  
              </div>
            )
          
        })}
    </div>
  )
}
