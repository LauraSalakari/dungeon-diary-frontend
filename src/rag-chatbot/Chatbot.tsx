import * as React from "react";
import Popover from "@mui/material/Popover";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import OutlinedInput from "@mui/material/OutlinedInput";
import {Send} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import axios from "axios";
import ChatMessage from "./ChatMessage.tsx"

export interface ChatMessageType {
    content: string;
    sender: "user" | "llm"
    timestamp: number;
}

const firstMsg: ChatMessageType = {
    sender: "llm",
    content: "What would you like to know?",
    timestamp: 0
}

export default function Chatbot() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [content, setContent] = React.useState<string>("");
    const [messages, setMessages] = React.useState<ChatMessageType[]>([firstMsg]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined

    const handleSend = () => {
        if (!content) return

        setMessages(prev => {
            return [...prev, {content, sender: "user", timestamp: Date.now()}];
        })

        axios.post("http://localhost:8001/api/phb-rag", {
            q: content,
        }).then(res => {
            setMessages(prev => {
                return [...prev, {content: res.data, sender: "llm", timestamp: Date.now()}]
            })
        }).catch(err => {
            console.log(err)
        })

        setContent("")
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault()
            handleSend()
        }
    }


    return (
        <div className={"chat-fab"}>
            <Fab color="secondary" aria-label="edit" onClick={handleClick} aria-describedby={id}>
                <EditIcon/>
            </Fab>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Card>
                    <CardContent sx={{width: "300px", maxHeight: "400px", overflow: "auto"}}
                                 className="chat-messages-box">
                        {messages.map((m) => (
                            <ChatMessage m={m} key={m.timestamp} />
                        ))}
                    </CardContent>
                    <CardActions>
                        <OutlinedInput
                            value={content}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setContent(event.target.value)
                            }}
                            fullWidth={true}
                            size="small"
                            multiline={true}
                            maxRows={4}
                            endAdornment={
                                <IconButton onClick={handleSend} size="small">
                                    <Send/>
                                </IconButton>}
                            onKeyDown={handleKeyDown}
                        />
                    </CardActions>
                </Card>
            </Popover>
        </div>
    )
}