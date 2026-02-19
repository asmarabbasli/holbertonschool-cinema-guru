import React, { useState } from 'react';
import axios from 'axios';
import './auth.css';
import Login from './Login';
import Register from './Register';
import Button from '../../components/general/Button';

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
    // Tələb olunan state-lər
    const [_switch, setSwitch] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // API inteqrasiyası üçün handleSubmit funksiyası
    const handleSubmit = (event) => {
        // Formun default davranışını (səhifənin yenilənməsini) dayandırırıq
        event.preventDefault();

        // _switch true olarsa login, false olarsa register marşrutuna müraciət edirik
        const route = _switch ? '/api/auth/login' : '/api/auth/register';
        
        axios.post(`http://localhost:8000${route}`, {
            username: username,
            password: password
        })
        .then((response) => {
            // Uğurlu cavab (onSuccess):
            const { accessToken } = response.data;

            // 1. Tokeni localStorage-da saxla
            localStorage.setItem('accessToken', accessToken);

            // 2. İstifadəçi adını state-ə yaz
            setUserUsername(username);

            // 3. Giriş vəziyyətini true et
            setIsLoggedIn(true);
        })
        .catch((error) => {
            // Xəta halında istifadəçiyə bildiriş vermək olar
            console.error("Authentication error:", error.response?.data?.message || error.message);
            alert("Xəta baş verdi: " + (error.response?.data?.message || "Məlumatlar yanlışdır"));
        });
    };

    return (
        <div className="auth-container">
            {/* handleSubmit funksiyasını form-un onSubmit hadisəsinə bağlayırıq */}
            <form onSubmit={handleSubmit}>
                <div className="auth-header-buttons">
                    <Button 
                        label="Sign In" 
                        type="button"
                        onClick={() => setSwitch(true)} 
                        className={_switch ? "active" : ""}
                    />
                    <Button 
                        label="Sign Up" 
                        type="button"
                        onClick={() => setSwitch(false)} 
                        className={!_switch ? "active" : ""}
                    />
                </div>

                {/* _switch vəziyyətinə görə Login və ya Register komponentini render edirik */}
                {_switch ? (
                    <Login 
                        username={username} 
                        password={password} 
                        setUsername={setUsername} 
                        setPassword={setPassword} 
                    />
                ) : (
                    <Register 
                        username={username} 
                        password={password} 
                        setUsername={setUsername} 
                        setPassword={setPassword} 
                    />
                )}
            </form>
        </div>
    );
};

export default Authentication;