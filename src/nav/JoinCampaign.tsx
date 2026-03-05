import * as React from 'react'
import api from "../auth/api.ts"
import {FormControl} from "@mui/material"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

// class CampaignJoinSchema(BaseModel):
// join_code: str
// password: str
// character_name: str

export const JoinCampaign: React.FC = () => {
    const [joinCode, setJoinCode] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [characterName, setCharacterName] = React.useState<string>("")
    const [campaignName, setCampaignName] = React.useState<string>("")
    const [state, setState] = React.useState<"joining" | "success" | "failed">("joining")

    const handleJoin = (e: MouseEvent) => {
        e.preventDefault()

        api.post("/api/join-campaign", {
            join_code: joinCode,
            password: password,
            character_name: characterName,
        }).then(res => {
            setCampaignName(res.data.campaign_name)
            setState("success")
        }).catch(() => {
            setState("failed")
        })
    }

    return (
        <div style={{ padding: 8 }}>
            {
                state === "joining" && (
                    <FormControl fullWidth style={{gap: 8}}>
                        <TextField variant={"filled"} value={characterName} onChange={(e) => setCharacterName(e.target.value)} label={"Character Name"} />
                        <TextField variant={"filled"} value={joinCode} onChange={(e) => setJoinCode(e.target.value)} label={"Join Code"} />
                        <TextField variant={"filled"} value={password} onChange={(e) => setPassword(e.target.value)} label={"Password"} type={"password"}/>
                        <Button variant="contained" color={"secondary"} onClick={e => handleJoin(e as unknown as MouseEvent)}>Join Campaign</Button>
                    </FormControl>
                )
            }
            {
                state === "success" && (
                    <div style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                        Welcome to {campaignName}!
                    </div>
                    )
            }
            {
                state === "failed" && (
                    <div style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                        Failed to join the campaign. <br />
                        Please try again later.
                    </div>
                    )
            }
        </div>
    )
}