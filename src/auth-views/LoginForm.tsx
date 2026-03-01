import {useState} from "react"
import {FilledInput} from "@mui/material"
import Button from "@mui/material/Button"
import axios from "axios"
import {setToken} from "../auth.ts"

export const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = (e: MouseEvent) => {
        e.preventDefault()

        axios.post("http://localhost:8001/login", {
            email: email,
            password: password,
        }).then(res => {
            console.log(res)
            setToken(res.data.access_token)
        }).catch(err => console.log(err))
    }

    return <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
        <FilledInput value={email} onChange={(e) => setEmail(e.target.value)} />
        <FilledInput value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
        <Button variant="contained" onClick={e => login(e as unknown as MouseEvent)}>Log In</Button>
    </div>
}