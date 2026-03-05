import * as React from "react"
import {Dialog, FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import api from "../auth/api.ts"
import {useCampaign} from "../campaign/CampaignContext.tsx"

interface AddNoteDialogProps {
    open: boolean
    handleClose: () => void
}

export const AddNoteDialog: React.FC<AddNoteDialogProps> = (props) => {
    const [note, setNote] = React.useState<string>("")
    const [sessionDate, setSessionDate] = React.useState<string>("")
    const [isPrivate, setIsPrivate] = React.useState<string>("true")

    const campaign = useCampaign()

    const onSubmit = (e: MouseEvent) => {
        e.preventDefault()

        if (!campaign?.campaign?.id) return

        api.post("/api/add-note", {
            campaign_id: campaign?.campaign?.id || "",
            content: note,
            session_date: sessionDate,
            is_private: isPrivate === "true",
        }).then(() => {
            setNote("")
            setSessionDate("")
            props.handleClose()
        }).catch(err => {
            console.log(err)
        })
    }

    // campaign_id: str
    // content: str
    // is_private: bool
    // session_date: str

    return <Dialog open={props.open} onClose={props.handleClose}>
        <div style={{padding:8, width: 580, overflow: "auto"}}>
            <FormControl fullWidth sx={{gap: 2}}>
                <TextField label={"Note"} multiline={true} minRows={5} value={note} onChange={(e) => setNote(e.target.value)}/>
                <TextField label={"Session Date"} type={"date"} slotProps={{inputLabel: {shrink:true}}} value={sessionDate} onChange={(e) => setSessionDate(e.target.value)}/>
                <RadioGroup value={isPrivate} onChange={e => setIsPrivate(e.target.value)}>
                    <FormControlLabel control={<Radio />} label={"Private note"} value={"true"} />
                    <FormControlLabel control={<Radio />} label={"Public note"} value={"false"} />
                </RadioGroup>
                <Button onClick={e => onSubmit(e as unknown as MouseEvent)}>Add</Button>
            </FormControl>
        </div>
    </Dialog>
}