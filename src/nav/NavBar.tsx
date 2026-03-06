import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import {removeToken} from "../auth/auth.ts"
import {useNavigate} from "react-router"
import {CampaignSelector} from "./CampaignSelector.tsx"
import {useCampaign} from "../campaign/CampaignContext.tsx"
import LogoutIcon from "@mui/icons-material/Logout"
import {Tooltip} from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import {useState} from "react"
import {AddCampaignDialog} from "./AddCampaignDialog.tsx"
import {useAuth} from "../auth/AuthContext.tsx"

export default function NavBar() {
    const navigate = useNavigate()
    const campaign = useCampaign()
    const auth = useAuth()
    const user = auth?.info?.user?.username
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    const handleLogout = () => {
        removeToken()
        campaign?.clearCampaignContext()
        auth?.clearAuthContext()
        auth?.changeAuthState("unauthenticated")
        navigate("/", {replace: true})
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <h1 style={{flexGrow: 1, marginTop: 8, marginBottom: 8}}
                    className={"bonheur-royale-regular"}>
                    Dungeon Diary
                    {user && <span style={{fontSize: 20, fontFamily: "MedievalSharp", paddingLeft: 16}}>
                    - {user}
                </span>}
                </h1>

                <CampaignSelector/>
                <Tooltip title={"Add campaign"}>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="add-campaign"
                        onClick={() => setDialogOpen(true)}
                        sx={{mr: 1}}
                    >
                        <AddCircleOutlineIcon/>
                    </IconButton>
                </Tooltip>
                <AddCampaignDialog open={dialogOpen} handleClose={() => setDialogOpen(false)}/>
                <Tooltip title={"Log out"}>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="logout"
                        onClick={handleLogout}
                    >
                        <LogoutIcon/>
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    )
}