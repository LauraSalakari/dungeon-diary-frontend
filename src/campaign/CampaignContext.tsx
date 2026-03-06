import {createContext, type ReactNode, useContext, useEffect, useState} from "react"
import api from "../auth/api.ts"

interface CampaignContext {
    name: string,
    id: string,
    playerName: string,
}

interface CampaignContextType {
    campaign: CampaignContext | null
    selectCampaign: (campaign: CampaignContext | null) => void
    sessions: string[],
    clearCampaignContext: () => void,
}

const CampaignContext = createContext<CampaignContextType | null>(null)

export function CampaignProvider({children}: { children: ReactNode }) {
    const [campaign, setCampaign] = useState<CampaignContext | null>(JSON.parse(localStorage.getItem("selectedCampaign") as string) || null)
    const [sessions, setSessions] = useState<string[]>([])

    useEffect(() => {
        const storedCampaign = localStorage.getItem("selectedCampaign")
        if (storedCampaign) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setCampaign(JSON.parse(storedCampaign) as CampaignContext)

                api.get("/api/campaign-sessions", {
                    params: {campaign_id: campaign?.id},
                }).then(res => {
                    console.log(res)
                    setSessions(res.data)
                }).catch(err => {
                    console.log(err)
                })

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

        if (newCampaign) {
            api.get("/api/campaign-sessions", {
                params: {campaign_id: newCampaign.id},
            }).then(res => {
                console.log(res)
                setSessions(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const clearCampaignContext = () => {
        localStorage.removeItem("selectedCampaign")
        setCampaign(null)
        setSessions([])
    }

    return (
        <CampaignContext.Provider value={{campaign, selectCampaign, sessions, clearCampaignContext}}>
            {children}
        </CampaignContext.Provider>
    )
}

export function useCampaign() {
    return useContext(CampaignContext)
}