import * as React from "react"
import {useTheme} from "@mui/material"

interface NoteCardProps {
    content: string
    isPrivate: boolean
}

export const NoteCard: React.FC<NoteCardProps> = (props) => {
    const {content, isPrivate} = props
    const theme = useTheme()
    const primary = theme.palette.primary.main
    const secondary = theme.palette.text.secondary

    return (
        <div
            style={{
                border: `1px solid ${secondary}`,
                borderRadius: 8,
                padding: 8,
                boxShadow: `1px 1px 5px 1px ${primary}`,
            }}

        >
            {content}
            <div style={{
                fontStyle: "italic",
                color: secondary || "lightgray",
                paddingTop: 4,
            }}>{isPrivate ? "Private note" : "Public note"}</div>
        </div>
    )
}