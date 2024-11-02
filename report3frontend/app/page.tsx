'use client';
import { ChangeEvent, FormEvent, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// Custom imports
import { USER_LOGIN }from '../flaskEndpoints';

interface FormData {
  email:string;
  passwd:string;
}

interface LoginData {
  customer_id: string;
  access_token: string;
}

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData> ({
    email:'',
    passwd:'',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData({...formData, [name] : value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(USER_LOGIN, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData)
      })
      if (response.ok) {
        const data: LoginData = await response.json()
        Cookies.set('access_token', data.access_token, {expires:1}) //secure:true when in prod
        router.push(`/HomePage/${data.customer_id}`)
      } else {
        console.log('failed to login: ', response.status)
    }
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <main className="flex bg-white min-h-screen items-center justify-center">
      <div className="flex items-center justify-center flex-col z-10 w-full font-mono text-sm">
        <img src="/amazon_logo.png" alt="Amazon Logo"/>
        <form className="flex flex-col w-1/5 mt-8 space-y-2 p-6 border rounded border-black" onSubmit={handleSubmit}>
          <h2 className="text-lg text-black font-bold">Sign-in </h2>
          <label className="text-black">email </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="text-black border border-black"
            required
          />
          <label className="text-black">password </label>
          <input
            type="password"
            name="passwd"
            value={formData.passwd}
            onChange={handleChange}
            className="text-black border border-black"
            required
          />
          <div className="flex items-center justify-center">
            <input className="bg-yellow-500 rounded px-4 text-white hover:bg-yellow-700" type="submit" value="Continue" />
          </div>
        </form>
        <a className="flex items-center justify-center mt-4 text-black hover:text-gray-700 border border-black shadow-lg rounded p-1 w-1/5" href="/Register">Create your Amazon account</a>
      </div>
    </main>
  );
}
