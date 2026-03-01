import {useState} from "react"
import {FilledInput} from "@mui/material"
import Button from "@mui/material/Button"
import axios from "axios"

export const RegistrationForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')

    const register = (e: MouseEvent) => {
        e.preventDefault()

        axios.post("http://localhost:8001/register", {
            email: email, password: password, username: username
        }).then((res) => {
            console.log(res)
        }).catch(err => console.log(err))
    }

    return <div style={{display: "inline-flex", flexDirection: "column"}}>
        <FilledInput value={email} onChange={(e) => setEmail(e.target.value)} />
        <FilledInput value={username} onChange={(e) => setUsername(e.target.value)} />
        <FilledInput value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
        <FilledInput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  type='password'/>
        <Button variant="contained" onClick={e => register(e as unknown as MouseEvent)}>Log In</Button>
    </div>
}