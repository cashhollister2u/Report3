'use client';
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';

// Custom imports
import { REGISTER }from '../../flaskEndpoints';

interface FormData {
  name: string
  email:string;
  passwd:string;
  confirmPassword:string;
  credit_card_num:number
}

export default function Register() {
  const [erroMsg, setErrorMsg] = useState<string>("")
  const router = useRouter()
  const [formData, setFormData] = useState<FormData> ({
    name: '',
    email:'',
    passwd:'',
    confirmPassword:'',
    credit_card_num: 1234567890123456
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData({...formData, [name] : value })
  }

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    // ensure the password and confirmPasswords match 
    if (formData.passwd !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch(REGISTER, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData)
      })
      if (response.ok) {
        router.push(`/`)
      } else {
        console.log('failed to Register: ', response.status)
        setErrorMsg("Error: Customer Account exists login")
    }
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
    <div className="flex items-center justify-center flex-col z-10 w-full font-mono text-sm">
      <img src="amazon_logo.png" alt="Amazon Logo"/>
      <form className="flex flex-col w-1/5 mt-8 space-y-2 border border-black rounded p-6" onSubmit={handleRegister}>
        <h2 className="text-lg py-2 text-black font-bold">Create Account  </h2>
        <label className="text-black">Your name </label>
        <input
            type="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="text-black rounded border border-black"
            required
          />
        <label className="text-black">email </label>
        <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="text-black rounded border border-black"
            required
          />
        <label className="text-black">password </label>
        <input
            type="password"
            name="passwd"
            value={formData.passwd}
            onChange={handleChange}
            className="text-black rounded border border-black"
            required
          />
        <label className="text-black">Re-enter password </label>
        <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="text-black rounded border border-black"
            required
          />
        
        <div className="flex flex-col items-center justify-center">
        <input className="bg-yellow-500 rounded px-4 mt-2 w-full p-1 text-white hover:bg-yellow-700" type="submit" value="Continue" />
        </div>
      </form>
      <a className="flex items-center justify-center mt-4 text-black hover:text-gray-700 border border-black shadow-lg rounded p-1 w-1/5" href="/">
        Already have an account? Sign in
      </a>
      <p className="mt-6 text-red-500 font-bold">{erroMsg}</p>
    </div>
    </main>
  );
}