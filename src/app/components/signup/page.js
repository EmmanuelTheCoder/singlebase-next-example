"use client"
import { useState } from 'react'
import { singlebaseClient } from "@/app/utils/singlebaseclient"
import { useRouter } from 'next/navigation'


function page() {
const router = useRouter()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("")
  const [response, setResponse] = useState("")

  const handleSignUp = async (e) => {
    e.preventDefault();
      const singlebase = await singlebaseClient()
 
      const res = await singlebase
      .auth
      .createUserWithPassword({
        email: email,
        password: password,
        display_name: displayName

      })
      setResponse(res)
      if(res.ok === true){
        localStorage.setItem("user-auth-token", res?.data?.id_token);
        router.push('/components/todo')

      }
     

  }
  return (
    <div className='auth-container'>
       <h1>Sign Up</h1> 
        <div className="auth-form">
                <div>
                  <label htmlFor="display-name">Display Name</label><input type="text"  className= "display-name-input" placeholder='display name' value={displayName} onChange={(e) => setDisplayName(e.target.value)} autoComplete='none'/>

                </div>
                <div>

                  <label htmlFor="Email">Email</label><input type="username" className= "email-input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='none'/>
                </div>
                <div>
                  <label htmlFor="Password">Password</label><input type="password" className= "password-input" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='none'/>

                </div>

            
        </div>
        <button onClick={handleSignUp}> Sign up</button>
        <p className="info">{response.ok === false ? response.error.description : ""}</p>
    </div>
  )
}

export default page;
