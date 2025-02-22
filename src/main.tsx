/*
*                                                                              *
*               ╔╗╔┌─┐┌┬┐┌─┐╔═╗┬  ┬┌─┐┬─┐┌─┐┬  ┌─┐┬ ┬                          *
*               ║║║│ │ │ └─┐║ ║└┐┌┘├┤ ├┬┘├┤ │  │ ││││                          *
*               ╝╚╝└─┘ ┴ └─┘╚═╝ └┘ └─┘┴└─└  ┴─┘└─┘└┴┘                          *
*                                                                              *
*               main.tsx created 2025/01/21                                    *
*               by Richard JUAN (contact@richard-juan.com)                     *
*                                                                              *
*               Copyright © 2025 Richard JUAN. All rights reserved             *
*                                                                              *
*/


import { createRoot } from 'react-dom/client'
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Login from './Login.tsx'
import Admin from './Admin.tsx'

createRoot(document.getElementById('root')!).render(
  <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/sql-tester/" element={<Login />} />
        <Route path="/sql-tester/login" element={<Login />} />
        <Route path="/sql-tester/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
)
