import * as React from "react"
import {Dialog, Tab, Tabs} from "@mui/material"
import {CreateCampaign} from "./CreateCampaign.tsx"
import {JoinCampaign} from "./JoinCampaign.tsx"

interface Props {
    open: boolean,
    handleClose: () => void,
}

enum TabValues {
    "create",
    "join"
}


export const AddCampaignDialog: React.FC<Props> = (props: Props) => {
    const {open, handleClose} = props
    const [tabValue, setTabValue] = React.useState<TabValues>(TabValues["create"])

    return (
        <Dialog open={open} onClose={handleClose}>
            <div style={{minWidth:400, minHeight:300}}>
                <Tabs
                    value={tabValue}
                    onChange={(_, newVal) => setTabValue(newVal)}
                    indicatorColor="secondary"
                    variant="fullWidth"
                    textColor="inherit"
                >
                    <Tab label="Create New Campaign" />
                    <Tab label="Join A Campaign" />
                </Tabs>
                {tabValue === TabValues.create && (<CreateCampaign />)}
                {tabValue === TabValues.join && (<JoinCampaign />)}
            </div>
        </Dialog>
    )
}