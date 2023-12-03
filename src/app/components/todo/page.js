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
