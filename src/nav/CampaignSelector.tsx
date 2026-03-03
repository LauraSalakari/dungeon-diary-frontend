import * as React from 'react'
import {useAuth} from "../auth/AuthContext.tsx"
import {FormControl, MenuItem, Select, type SelectChangeEvent} from "@mui/material"
import {useCampaign} from "../campaign/CampaignContext.tsx"

export const CampaignSelector: React.FC = () => {
    const auth = useAuth()
    const campaigns = auth?.info?.campaigns
    const campaignContext = useCampaign()
    const [selectedCampaign, setSelectedCampaign] = React.useState<string>(campaignContext?.campaign?.id ||"")


    const handleChange = (e: SelectChangeEvent) => {
        e.preventDefault()
        const selectedId = e.target.value
        const newCampaign = campaigns?.find(c => c.id == selectedId)
        setSelectedCampaign(selectedId)
        campaignContext?.selectCampaign({
            name: newCampaign?.name || "",
            playerName: newCampaign?.player_name || "",
            id: selectedId,
        })
    }

    return (
        <div style={{width: 300, marginRight:16}}>
            <FormControl fullWidth>
                <Select
                    id="campaign-selector-label"
                    value={selectedCampaign}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={""}>
                        <em>Select Campaign</em>
                    </MenuItem>
                    {campaigns?.map(c =>{
                        return <MenuItem value={c.id} >{c.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    )
}