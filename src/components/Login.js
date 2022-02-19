import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
     
    
    const [credentails, setCredentails] = useState({ email: "", password: "" })
    let history = useHistory();

    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentails.email, password: credentails.password })

        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            props.showAlert("Logged in Successfully ","success");

        }
        else {
            props.showAlert("Invalid credentails","danger");
        }
    }

    const onchange = (e) => {
        setCredentails({ ...credentails, [e.target.name]: e.target.value })
    }

    return (
        <div className='mt-3'>
            <h2 className='my-2'>Continue to Login in iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onchange} name="email" value={credentails.email} />
                    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onchange} value={credentails.password} />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
