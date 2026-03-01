import * as React from "react"
import {useState} from "react"
import {LoginForm} from "./LoginForm.tsx"
import {RegistrationForm} from "./RegistrationForm.tsx"
import Button from "@mui/material/Button"

export const Login: React.FC = () => {
    const [loginState, setLoginState] = useState(true)



    return <div style={{display: "inline-flex", flexDirection: "column"}}>
        {loginState ? <LoginForm /> : <RegistrationForm />}
        <Button onClick={() => setLoginState(prev => !prev)}>Login</Button>
    </div>
}