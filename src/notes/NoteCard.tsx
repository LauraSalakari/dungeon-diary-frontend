import * as React from "react"

interface NoteCardProps {
    content: string
    isPrivate: boolean
}

export const NoteCard: React.FC<NoteCardProps> = (props) => {
    const {content, isPrivate} = props

    return (
        <div
            style={{
                border: "1px solid lightgrey",
                borderRadius: 8,
                padding: 8,
                boxShadow: "3px 3px 10px 1px #7a797c",
            }}

        >
            {content}
            <div style={{
                fontStyle: "italic",
                color: "lightgray",
                paddingTop: 4,
            }}>{isPrivate ? "Private note" : "Public note"}</div>
        </div>
    )
}