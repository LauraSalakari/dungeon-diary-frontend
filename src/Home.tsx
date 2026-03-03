import * as React from "react"
import {useCampaign} from "./campaign/CampaignContext.tsx"

export const Home: React.FC = () => {
    const campaign = useCampaign()
    return <div>{JSON.stringify(campaign)}</div>
}