import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import { auth } from './firebase';
const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = e => {
        e.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                if(auth){
                    history.push('/');
                }
            })
            .catch(error => {
                alert(error.message);
            })
    }
    const register = e => {
        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(email,password)
            .then(auth => {
                if(auth){
                     history.push('/');
                }
                   
            })
            .catch(error => {
                alert(error.message);
            })
    }
    return (
        <div className = "login">
            <Link to = "/">
                <img className = "login_logo" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" />
            </Link>
            <div className = "login_container">
                <h1>Sign In</h1>
            
            <form>
                <h5>Email</h5>
                <input type = "text" onChange = {(e) => setEmail(e.target.value)} value = {email}/>
                <h5>Password</h5>
                <input onChange = {(e) => setPassword(e.target.value)} value = {password} type = "password"/>
                <button type = "submit" onClick = {signIn} class ="login_signinButton">Sign In</button>
            </form> 
            <p>
                By signing in you agree to all the terms and conditions.
            </p>
            <button onClick = {register} className = "login_registerButton">Create Your Amazon account</button>
            </div>
        </div>
    );
}

export default Login;
