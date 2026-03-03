import './App.css'
import Chatbot from "./rag-chatbot/Chatbot.tsx";
import NavBar from "./nav/NavBar.tsx"
import {Home} from "./Home.tsx"

function App() {
  return (
    <>
        <NavBar />
        <Home />
        <Chatbot />
    </>
  )
}

export default App
