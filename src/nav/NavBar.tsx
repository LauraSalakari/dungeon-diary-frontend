import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import {removeToken} from "../auth/auth.ts"
import {useNavigate} from "react-router"
import {CampaignSelector} from "./CampaignSelector.tsx"
import {useCampaign} from "../campaign/CampaignContext.tsx"
import LogoutIcon from "@mui/icons-material/Logout"
import {Tooltip} from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useState} from "react"
import {AddCampaignDialog} from "./AddCampaignDialog.tsx"

export default function NavBar() {
    const navigate = useNavigate()
    const campaign = useCampaign()

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    const handleLogout = () => {
        removeToken()
        localStorage.removeItem("selectedCampaign")
        campaign?.selectCampaign(null)
        navigate("/", {replace: true})
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Dungeon Diary
                    </Typography>
                    <CampaignSelector/>
                    <Tooltip title={"Add campaign"}>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="add-campaign"
                            onClick={() => setDialogOpen(true)}
                            sx={{ mr: 1 }}
                        >
                            <AddCircleOutlineIcon/>
                        </IconButton>
                    </Tooltip>
                    <AddCampaignDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} />
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
        </Box>
    )
}