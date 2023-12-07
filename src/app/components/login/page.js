"use client"
import React, {useState} from 'react'
import Link from 'next/link'
import { singlebaseClient } from '@/app/utils/singlebaseclient'; 
import { useRouter } from 'next/navigation';

export default function page() {
    const router = useRouter()

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("")
    
    const handleSignInWithPassword = async (e) => {
        e.preventDefault()
        
        const singlebase = await singlebaseClient()

        const res = await singlebase
        .auth
        .signInWithPassword({email, password})
        setResponse(res)

        //store JWT inside localstorage
        localStorage.setItem("user-auth-token", res?.data?.id_token);

        console.log("res", res)

        if(res.ok === true){
            router.push("/components/todo")
            
            //`/components/todo?display_name=${res.data.user_profile.display_name}&userkey=${res.data.user_profile._userkey}`
            
        }
      }

  return (
    <div className='auth-container'>
       <h1>Login</h1> 
        <div className="auth-form">
             
            <div>

                <label htmlFor="Email">Email</label>
                <input type="username" className= "email-input" autoComplete='none' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="Password">Password</label>
                <input type="password" className= "password-input" autoComplete='none' value={password} onChange={(e)=>setPassword(e.target.value)}/>

            </div>

            
        </div>
        <button onClick={handleSignInWithPassword}> Login</button>

        <p className="info"> Don't have an account? <Link href="/components/signup">Signup now!</Link></p>
        <p className="info"> {!response.ok ? response?.error?.description : ""}</p>
    </div>
  )
}
