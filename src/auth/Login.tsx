import * as React from "react"
import {useState} from "react"
import {LoginForm} from "./LoginForm.tsx"
import {RegistrationForm} from "./RegistrationForm.tsx"

export const Login: React.FC = () => {
    const [loginState, setLoginState] = useState(true) // true = logging in, false = registering


    return <div className="login" style={{
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    }}>
        <div style={{display: "inline-flex", flexDirection: "column", justifyContent: "center"}}>
            {loginState ? <LoginForm/> : <RegistrationForm returnToLogin={() => {setLoginState(true)}}/>}
            <a onClick={() => setLoginState(prev => !prev)} style={{
                fontSize: "0.8em",
                textAlign: "center",
                marginTop: 8,
            }}>{loginState ? "Not yet registered? Click here to create an account." : "Already registered? Click here to log in."}</a>
        </div>
    </div>
}