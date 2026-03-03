import {useState} from "react"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import {setToken} from "./auth.ts"
import {useNavigate} from "react-router"
import api from "./api.ts"

export const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const login = (e: MouseEvent) => {
        e.preventDefault()

        api.post("/login", {
            email: email,
            password: password,
        }).then(res => {
            setToken(res.data.access_token)
            navigate("/home", { replace: true })
        }).catch(err => console.log(err))
    }

    return <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "30vw", minWidth: 250 }}>
        <TextField variant="filled" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField variant="filled" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
        <div style={{"display": "flex", justifyContent: "center"}}>
            <Button variant="contained" onClick={e => login(e as unknown as MouseEvent)}>Log In</Button>
        </div>
    </div>
}