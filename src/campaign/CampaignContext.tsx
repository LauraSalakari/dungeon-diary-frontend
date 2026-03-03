import {createContext, type ReactNode, useContext, useEffect, useState} from "react"

interface CampaignContext {
    name: string,
    id: string,
    playerName: string,
}

interface CampaignContextType {
    campaign: CampaignContext | null;
    selectCampaign: (campaign: CampaignContext | null) => void;
}

const CampaignContext = createContext<CampaignContextType | null>(null)

export function CampaignProvider({ children }: { children: ReactNode }) {
    const [campaign, setCampaign] = useState<CampaignContext | null>(null)

    useEffect(() => {
        const storedCampaign = localStorage.getItem("selectedCampaign")
        if (storedCampaign) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setCampaign(JSON.parse(storedCampaign) as CampaignContext)
            } catch (e) {
                console.error("Failed to parse stored campaign", e)
            }
        }
    }, [])

    useEffect(() => {
        if (campaign) {
            localStorage.setItem("selectedCampaign", JSON.stringify(campaign))
        } else {
            localStorage.removeItem("selectedCampaign")
        }
    }, [campaign])

    const selectCampaign = (newCampaign: CampaignContext | null) => {
        setCampaign(newCampaign)
    }

    return (
        <CampaignContext.Provider value={{campaign, selectCampaign}}>
            {children}
        </CampaignContext.Provider>
    )
}

export function useCampaign() {
    return useContext(CampaignContext)
}