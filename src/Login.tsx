/*
*                                                                              *
*               ╔╗╔┌─┐┌┬┐┌─┐╔═╗┬  ┬┌─┐┬─┐┌─┐┬  ┌─┐┬ ┬                          *
*               ║║║│ │ │ └─┐║ ║└┐┌┘├┤ ├┬┘├┤ │  │ ││││                          *
*               ╝╚╝└─┘ ┴ └─┘╚═╝ └┘ └─┘┴└─└  ┴─┘└─┘└┴┘                          *
*                                                                              *
*               App.tsx created 2025/01/21                                     *
*               by Richard JUAN (contact@richard-juan.com)                     *
*                                                                              *
*               Copyright © 2025 Richard JUAN. All rights reserved             *
*                                                                              *
*/


import viteLogo from '/sqli.svg'
import './Login.css'
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { decrypt, encrypt, payloads } from './globals';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

interface FormData {
  email: string;
  password: string;
}

const initialState: FormData = {
  email: '',
  password: '',
};

function getRandomEntries<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function containsElement(arr: string[], target: string): boolean {
  return arr.includes(target);
}

const validInjections = getRandomEntries(payloads, payloads.length);

const validateForm = (data: FormData): boolean => {

  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailRegex.test(data.email)) {
    return false;
  }
  if (data.password.trim() === '' || !containsElement(validInjections, data.password)) {
    return false;
  }
  return true;
};

function getMeANumber(): number {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return Math.ceil((array[0] / 4294967295) * 100000);
}

function Login() {

  const [formData, setFormData] = useState<FormData>(initialState);
  const [cookies, setCookie] = useCookies(['authToken']);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm(formData)) {
      setCookie('authToken', encrypt('admin-session'));
      navigate("/sql-tester/admin")
    } else {
      toast.error(`Error: ${getMeANumber()} Unkown user `);
    }
  };
  if (cookies.authToken && decrypt(cookies.authToken) == "admin-session") {
    navigate("/sql-tester/admin");
  }
  return (
    <>

      <Toaster />
      <img className='logo' src={viteLogo} />
      <div className='title'>SQLi test</div>
      <div className='header_text'>
        this is a simple web app to test your SQL injection program with modern frontend
      </div>
      <div className='container'>
        <p className="form_title">Registration</p>

        <form className="form" onSubmit={handleSubmit}>
          <input type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email" />
          <input type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password" />
          <input type={"submit"}
            style={{ backgroundColor: "#a1eafb" }} />
        </form>
      </div>
    </>
  )
}

export default Login
