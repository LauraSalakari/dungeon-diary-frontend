import * as React from "react"
import {useEffect} from "react"
import api from "../auth/api.ts"
import {useCampaign} from "../campaign/CampaignContext.tsx"
import dayjs from "dayjs"
import {NoteCard} from "./NoteCard.tsx"

interface SessionNoteContainerProps {
    session: string | number
}

export interface Note {
    content: string
    is_private: boolean
    session_date: string
}

export const SessionNoteContainer: React.FC<SessionNoteContainerProps> = (props) => {
    const {session} = props
    const campaign = useCampaign()
    const [notes, setNotes] = React.useState<Note[]>([])

    useEffect(() => {
        if (!campaign?.campaign?.id || !session) {
            return
        }

        api.get("/api/notes-personal", {
            params: {campaign_id: campaign?.campaign?.id || "", session_date: dayjs(session).format("YYYY-MM-DD")},
        }).then(res => {
            setNotes(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [session, campaign])

    return <div style={{padding: 16, display: "flex", flexDirection: "column", gap: 16}}>
        {notes.map(n => {
            return <NoteCard content={n.content} isPrivate={n.is_private} key={n.content.substring(0, 20)} />
        })}
    </div>
}

// content:"While everyone was focused on the tablet, my character noticed claw marks along the cellar wall that didn’t match any animal I recognize. They looked deliberate, almost like someone or something was trying to carve a symbol but stopped halfway. I didn’t mention it to the group because it seemed like the kind of detail that might cause unnecessary panic. I want to return later and examine it more carefully."
// is_private:true
// session_date:"2026-02-15T00:00:00"