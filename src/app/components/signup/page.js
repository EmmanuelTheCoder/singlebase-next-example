"use client"
import { useState, useEffect } from 'react'
import { singlebase } from "@/app/utils/singlebaseclient"
import { useRouter } from 'next/navigation'


function page() {
const router = useRouter()
  useEffect(() => {

    const fetchInfo = async () => {

      const { data, error, ok } = await singlebase
        .collection('candles')
        .fetch()
    
        if (ok) {
          for (const candle of data) {
            console.log(candle?.name)
          }
        } else {
          console.error('Something wrong!')
        }
    }
    fetchInfo()
  }, [])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("")
  const [response, setResponse] = useState("")

  const handleSignUp = async (e) => {
    e.preventDefault();

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
        router.push(`/components/todo?display_name=${res.data.display_name}&userkey=${res.data._userkey}`)
       
        //router.push('/components/todo')

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
        <p className="info">{!response.ok ? response.error.description : ""}</p>
    </div>
  )
}

export default page;
