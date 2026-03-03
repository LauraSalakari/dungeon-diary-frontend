import {useState} from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import {useNavigate} from "react-router"
import api from "./api.ts"

export const RegistrationForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')

    const navigate = useNavigate()

    const register = (e: MouseEvent) => {
        e.preventDefault()

        api.post("/register", {
            email: email, password: password, username: username
        }).then((res) => {
            console.log(res)
            navigate("/")
        }).catch(err => console.log(err))
    }

    return <div style={{display: "flex", flexDirection: "column", gap: 8, width: "30vw", minWidth: 250}}>
        <TextField variant="filled" label="Email" value={email} aria-label={"Email"} onChange={(e) => setEmail(e.target.value)} />
        <TextField variant="filled" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField variant="filled" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
        <TextField variant="filled" label="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  type='password'/>
        <div style={{"display": "flex", justifyContent: "center"}}>
            <Button variant="contained" onClick={e => register(e as unknown as MouseEvent)}>Register</Button>
        </div>
    </div>
}