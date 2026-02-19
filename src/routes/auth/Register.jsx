import React from 'react';
import './auth.css';
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';
import { faUserPlus, faKey } from '@fortawesome/free-solid-svg-icons';

const Register = ({ username, password, setUsername, setPassword }) => {
    return (
        <div className="register-form">
            <Input 
                label="Username" 
                type="text" 
                value={username} 
                setValue={setUsername} 
                icon={faUserPlus} 
            />
            <Input 
                label="Password" 
                type="password" 
                value={password} 
                setValue={setPassword} 
                icon={faKey} 
            />
            <Button label="Sign Up" icon={faUserPlus} />
        </div>
    );
};

export default Register;