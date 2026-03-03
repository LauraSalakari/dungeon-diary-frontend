import {createContext, type ReactNode, useContext, useEffect, useState} from "react"
import {getToken, removeToken} from "./auth.ts"
import api from "./api.ts"

interface AuthCampaign {
    name: string,
    gameMaster: string,
    is_gm: boolean,
    player_name: string,
}

interface AuthUser {
    user: {
        username: string,
        email: string,
    } | null,
    campaigns: AuthCampaign[]
}

interface AuthContext {
    user: AuthUser | null,
    loading: boolean,
}

const AuthContext = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = getToken()

        if (!token) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(false)
            return
        }

        api.get('/api/user')
            .then(res => {setUser(res.data as AuthUser)})
            .catch(() => removeToken())
            .finally(() => setLoading(false))
    }, [])

    return (
        <AuthContext.Provider value={{user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}