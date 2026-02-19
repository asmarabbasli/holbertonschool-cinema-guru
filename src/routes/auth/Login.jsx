import React from 'react';
import './auth.css';
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

const Login = ({ username, password, setUsername, setPassword }) => {
    return (
        <div className="login-form">
            <Input 
                label="Username" 
                type="text" 
                value={username} 
                setValue={setUsername} 
                icon={faUser} 
            />
            <Input 
                label="Password" 
                type="password" 
                value={password} 
                setValue={setPassword} 
                icon={faKey} 
            />
            <Button label="Login" icon={faUser} />
        </div>
    );
};

export default Login;