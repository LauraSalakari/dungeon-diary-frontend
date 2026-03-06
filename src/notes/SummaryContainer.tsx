import * as React from "react"
import {useCampaign} from "../campaign/CampaignContext.tsx"
import {useEffect} from "react"
import api from "../auth/api.ts"
import dayjs from "dayjs"
import {NoteCard} from "./NoteCard.tsx"
import Button from "@mui/material/Button"

interface SummaryContainerProps {
    session: string
}

interface Summary {
    contains_public: boolean
    content: string
    session_date: string
}

export const SummaryContainer: React.FC<SummaryContainerProps> = (props) => {
    const {session} = props
    const campaign = useCampaign()
    const [summaries, setSummaries] = React.useState<Summary[]>([])

    const privateSummary = summaries.find(s => !s.contains_public)
    const publicSummary = summaries.find(s => s.contains_public)

    useEffect(() => {
        if (!campaign?.campaign?.id) {
            return
        }

        console.log("session:", session)
        api.get("/api/session-summaries", {
            params: {campaign_id: campaign?.campaign?.id, session_date: dayjs(session).format("YYYY-MM-DD")},
        }).then(res => {
            setSummaries(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [session, campaign])

    // campaign_id: str
    // user_id: str
    // contains_public: bool
    // session_date: str

    const generateSummary = (containPublic: boolean) => {
        if (!campaign?.campaign?.id || !session) {
            return
        }

        api.post("/api/notes-summarise", {
            campaign_id: campaign?.campaign?.id,
            session_date: dayjs(session).format("YYYY-MM-DD"),
            contains_public: containPublic,
        }).then(res => {
            setSummaries(prev => [...prev, {
                content: res.data.summary_content,
                contains_public: res.data.contains_public,
                session_date: res.data.session_date,
            }])
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div style={{padding: 16, display: "flex", flexDirection: "column", gap: 16}}>
            {publicSummary ? <NoteCard content={publicSummary.content} isPrivate={false}/> :
                <Button onClick={() => generateSummary(true)}>Generate Public Summary</Button>}
            {privateSummary ? <NoteCard content={privateSummary.content} isPrivate/> :
                <Button onClick={() => generateSummary(false)}>Generate Private Summary</Button>}
        </div>
    )
}