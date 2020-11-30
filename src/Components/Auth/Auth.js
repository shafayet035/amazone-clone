import React, { useState } from 'react'
import { auth } from '../../firebase'
import './Auth.css'
import { useHistory } from 'react-router-dom'
import { useStateValue } from '../../Store/StateProvide'

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const [{cart}, dispatch] = useStateValue()
    const [err, setErr] = useState('')
     
    const signInHandler = (e) => {
        e.preventDefault()
        setErr('')
        auth.signInWithEmailAndPassword(email, password)
            .then(auth => {
                if(auth) {
                    if(cart.length > 0) {
                        history.push('/payment')
                    } else {
                        history.push('/')
                    }
                }
            })
            .catch(error => setErr("Wrong Email or Password"))
    }

    const signUpHandler = () => {
        setErr('')
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if(auth) {
                    if(cart.length > 0) {
                        history.push('/payment')
                    } else {
                        history.push('/')
                    }
                }
            })
            .catch(error => setErr("Please Enter Email and Password (6 character)"))
    }
    
    return (
        <div className="authentication">
            <div className="auth_form_parent">
                <div className="auth_err">
                    {err ? `${err}` : ''}
                </div>
                <form className="auth_form" onSubmit={signInHandler}>
                    <label>Email Address</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" />
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password}  type="password" />
                    <button type="submit">Sign in</button>
                </form>
                <div className="signUp">
                    <p>If you do not have an Account Click the Button below to Create an Account</p>
                    <button onClick={signUpHandler}>Create an Account</button>
                </div>
            </div>
        </div>
    )
}

export default Auth
