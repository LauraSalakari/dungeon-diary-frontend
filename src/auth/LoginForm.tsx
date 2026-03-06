import {useState} from "react"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import {setToken} from "./auth.ts"
import {useNavigate} from "react-router"
import api from "./api.ts"
import {Typography} from "@mui/material"

export const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorCode, setErrorCode] = useState<string | undefined>(undefined)

    const navigate = useNavigate()

    const login = (e: SubmitEvent) => {
        e.preventDefault()

        api.post("/login", {
            email: email,
            password: password,
        }).then(res => {
            setToken(res.data.access_token)
            setEmail("")
            setPassword("")
            setErrorCode(undefined)
            navigate("/home", {replace: true})
        }).catch(err => {
            setErrorCode(err?.response?.status || "unknown error")
            console.log(err?.response?.status)
        })
    }

    return <form onSubmit={e => login(e as unknown as SubmitEvent)}
                 style={{display: "flex", flexDirection: "column", gap: 8, width: "30vw", minWidth: 250}}>
        <TextField variant="filled" label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <TextField variant="filled" label="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                   type="password" autoComplete={"off"}/>
        {errorCode && <Typography variant="body2" color="error" component="p" style={{textAlign: "center"}}>
            Error logging in. ({errorCode})
        </Typography>}
        <div style={{"display": "flex", justifyContent: "center"}}>
            <Button variant="contained" type={"submit"}>Log In</Button>
        </div>
    </form>
}