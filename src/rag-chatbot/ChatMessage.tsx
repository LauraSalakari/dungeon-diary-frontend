import {Box, Paper, Typography} from "@mui/material"
import ReactMarkdown from "react-markdown"
import rehypeSanitize from "rehype-sanitize"
import type {ChatMessageType} from "./Chatbot.tsx"

interface Props {
    m: ChatMessageType
}

const chatBoxLlm = {
    backgroundColor: "#1E1A21",
    color: "#F0E6D2",
    // backgroundColor: "#33261E",
    // color: "#F2E6C9",
    borderRadius: "4px",
    maxWidth: "90%",
    marginBottom: "8px",
    padding: "4px 8px",
}

const chatBoxUser = {
    backgroundColor: "#5E4A7E",
    color: "#F0E6D2",
    // backgroundColor: "#4F6B5A",
    // color: "#F2E6C9",
    borderRadius: "4px",
    maxWidth: "90%",
    marginBottom: "8px",
    alignSelf: "end",
    padding: "4px 8px",
}

export default function ChatMessage(props: Props) {
    const {m} = props
    return <Paper key={m.timestamp} variant="elevation" elevation={2}
                  sx={m.sender === "user" ? chatBoxUser : chatBoxLlm}>
        <ReactMarkdown
            skipHtml
            rehypePlugins={[rehypeSanitize]}
            components={{
                p: ({children}) => (
                    <Typography variant="body2" sx={{mb: 1, margin: 0}}>
                        {children}
                    </Typography>
                ),

                strong: ({children}) => (
                    <Box component="span" sx={{fontWeight: 600}}>
                        {children}
                    </Box>
                ),

                em: ({children}) => (
                    <Box component="span" sx={{fontStyle: "italic"}}>
                        {children}
                    </Box>
                ),

                ul: ({children}) => (
                    <Box component="ul" sx={{pl: 3, mb: 1}}>
                        {children}
                    </Box>
                ),

                ol: ({children}) => (
                    <Box component="ol" sx={{pl: 3, mb: 1}}>
                        {children}
                    </Box>
                ),

                li: ({children}) => (
                    <Typography
                        component="li"
                        variant="body2"
                        sx={{display: "list-item"}}
                    >
                        {children}
                    </Typography>
                ),
                h1: ({children}) => <>{children}</>,
                h2: ({children}) => <>{children}</>,
                h3: ({children}) => <>{children}</>,
            }}
        >
            {m.content}
        </ReactMarkdown>
    </Paper>
}