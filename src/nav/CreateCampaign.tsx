import * as React from 'react'
import {FormControl} from "@mui/material"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import api from "../auth/api.ts"

// class CampaignCreate(BaseModel):
// name: str
// description: str
// password: str

export const CreateCampaign: React.FC = () => {
    const [campaignName, setCampaignName] = React.useState<string>("")
    const [campaignDescription, setCampaignDescription] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [state, setState] = React.useState<"creating" | "success" | "failed">("creating")
    const [joinCode, setJoinCode] = React.useState<string>("")

    const handleSubmit = (e: MouseEvent) => {
        e.preventDefault()
        api.post("/api/create-campaign", {
            name: campaignName,
            description: campaignDescription,
            password: password,
        }).then(res => {
            setJoinCode(res.data.join_code)
            setState("success")
        }).catch(() => {
            setState("failed")
        })
    }

    return <div style={{padding: 8, display: "block"}}>
        {state === "creating" && (
            <FormControl fullWidth style={{gap: 8}}>
                <TextField variant={"filled"} value={campaignName} onChange={(e) => setCampaignName(e.target.value)}
                           label={"Campaign Name"}/>
                <TextField variant={"filled"} value={campaignDescription}
                           onChange={(e) => setCampaignDescription(e.target.value)} label={"Campaign Description"} multiline
                           maxRows={4}/>
                <TextField variant={"filled"} value={password} onChange={(e) => setPassword(e.target.value)}
                           label={"Campaign Password"} type={"password"}/>
                <Button variant="contained" color="secondary" onClick={e => handleSubmit(e as unknown as MouseEvent)}>Create
                    Campaign</Button>
            </FormControl>
        )}
        {state === "success" && (
            <div style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                Success! <br />
                The join code for your campaign {campaignName} is: <br />
                <b>{joinCode}</b>
            </div>
        )}
        {state === "failed" && (
            <div style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                Creating the campaign failed. <br />
                Please try again later.
            </div>
        )}
    </div>
}