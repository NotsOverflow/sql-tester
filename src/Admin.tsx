/*
*                                                                              *
*               ╔╗╔┌─┐┌┬┐┌─┐╔═╗┬  ┬┌─┐┬─┐┌─┐┬  ┌─┐┬ ┬                          *
*               ║║║│ │ │ └─┐║ ║└┐┌┘├┤ ├┬┘├┤ │  │ ││││                          *
*               ╝╚╝└─┘ ┴ └─┘╚═╝ └┘ └─┘┴└─└  ┴─┘└─┘└┴┘                          *
*                                                                              *
*               Admin.tsx created 2025/01/21                                   *
*               by Richard JUAN (contact@richard-juan.com)                     *
*                                                                              *
*               Copyright © 2025 Richard JUAN. All rights reserved             *
*                                                                              *
*/
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import './Admin.css'
import { decrypt } from './globals';

function Admin() {
    const [cookies, , removeCookie] = useCookies(['authToken']);
    const navigate = useNavigate();
    const handleClick = () => {
        // Remove the cookie
        removeCookie('authToken');

        // Navigate to another page
        navigate('/login'); // Replace '/new-page' with your desired path
    };
    if (!cookies.authToken || decrypt(cookies.authToken) != "admin-session") {
        return (
            <Navigate to="/login" />
        );
    }
    return (
        <>
            <div>Welcom Admin</div>
            <button onClick={handleClick}>
                Disconect
            </button>
        </>

    );
}
export default Admin