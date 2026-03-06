import * as React from "react"
import {useState} from "react"
import {LoginForm} from "./LoginForm.tsx"
import {RegistrationForm} from "./RegistrationForm.tsx"
import {Typography} from "@mui/material"

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
            {loginState ? <LoginForm/> : <RegistrationForm returnToLogin={() => {
                setLoginState(true)
            }}/>}
            <Typography variant={"body2"} onClick={() => setLoginState(prev => !prev)} style={{
                fontSize: "0.8em",
                textAlign: "center",
                marginTop: 8,
                textDecoration: "underline",
                cursor: "pointer",
            }}>{loginState ? "Not yet registered? Click here to create an account." : "Already registered? Click here to log in."}</Typography>
        </div>
    </div>
}