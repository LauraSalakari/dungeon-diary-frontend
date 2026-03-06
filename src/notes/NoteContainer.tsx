import * as React from "react"
import {useState} from "react"
import {Box, Tab, Tabs, ToggleButton, ToggleButtonGroup} from "@mui/material"
import Button from "@mui/material/Button"
import {Add} from "@mui/icons-material"
import {useCampaign} from "../campaign/CampaignContext.tsx"
import {SessionNoteContainer} from "./SessionNoteContainer.tsx"
import dayjs from "dayjs"
import {AddNoteDialog} from "./AddNoteDialog.tsx"
import {SummaryContainer} from "./SummaryContainer.tsx"

export const NoteContainer: React.FC = () => {
    const campaign = useCampaign()
    const [selectedTab, setSelectedTab] = useState<string>("")
    const [noteDialogOpen, setNoteDialogOpen] = useState<boolean>(false)
    const [noteMode, setNoteMode] = useState<"general" | "summary">("general")

    const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
        setSelectedTab(newValue)
    }

    const handleModeChange = (_: React.SyntheticEvent, newValue: "general" | "summary") => {
        setNoteMode(newValue)
    }

    return (
        <Box
            sx={{flex: 1, display: "flex", height: "100%"}}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={selectedTab}
                onChange={handleTabChange}
                aria-label="Session date selector"
                sx={{borderRight: 1, borderColor: "divider", minWidth: 200}}
            >
                <Button startIcon={<Add/>} size={"large"} sx={{mt: 1}} onClick={() => setNoteDialogOpen(true)}>New
                    Note</Button>
                <AddNoteDialog open={noteDialogOpen} handleClose={() => setNoteDialogOpen(false)}/>
                {campaign?.sessions.map(c => {
                    return <Tab label={dayjs(c).format("YYYY-MM-DD")} value={c} key={c}/>
                })}
            </Tabs>
            <div style={{display: "flex", flexDirection: "column", flexGrow: 1}}>
                <ToggleButtonGroup value={noteMode} onChange={handleModeChange} exclusive fullWidth>
                    <ToggleButton value={"general"}>All notes</ToggleButton>
                    <ToggleButton value={"summary"}>Session Summary</ToggleButton>
                </ToggleButtonGroup>
                {
                    noteMode === "general" ? <SessionNoteContainer session={selectedTab}/> :
                        <SummaryContainer session={selectedTab}/>
                }
            </div>
        </Box>
    )
}