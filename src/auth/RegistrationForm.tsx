import * as React from "react"
import {useState} from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import api from "./api.ts"
import {FormControl} from "@mui/material"

interface Props {
    returnToLogin: () => void
}

export const RegistrationForm: React.FC<Props> = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const register = (e: SubmitEvent) => {
        e.preventDefault()

        api.post("/register", {
            email: email, password: password, username: username,
        }).then(() => {
            setEmail("")
            setUsername("")
            setPassword("")
            props.returnToLogin()
        }).catch(err => console.log(err))
    }

    return <form onSubmit={e => register(e as unknown as SubmitEvent)}
                 style={{display: "flex", flexDirection: "column", gap: 8, width: "30vw", minWidth: 250}}>
        <FormControl style={{gap: 8}}>
            <TextField variant="filled" label="Email" value={email} aria-label={"Email"}
                       onChange={(e) => setEmail(e.target.value)}/>
            <TextField variant="filled" label="Username" value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
            <TextField variant="filled" label="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                       type="password"/>
        </FormControl>
        <div style={{"display": "flex", justifyContent: "center"}}>
            <Button type={"submit"} variant="contained">Register</Button>
        </div>
    </form>
}