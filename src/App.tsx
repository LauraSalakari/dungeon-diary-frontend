import "./App.css"
import Chatbot from "./rag-chatbot/Chatbot.tsx"
import NavBar from "./nav/NavBar.tsx"
import {NoteContainer} from "./notes/NoteContainer.tsx"
import {Box} from "@mui/material"

function App() {
    return (
        <Box sx={{height: "100vh", display: "flex", flexDirection: "column"}}>
            <NavBar/>
            <NoteContainer/>
            <Chatbot/>
        </Box>
    )
}

export default App
