import {createContext, type ReactNode, useContext, useEffect, useState} from "react"
import {getToken, removeToken} from "./auth.ts"
import api from "./api.ts"

interface AuthCampaign {
    name: string,
    gameMaster: string,
    is_gm: boolean,
    player_name: string,
    id: string,
}

interface AuthUser {
    user: {
        username: string,
        email: string,
    } | null,
    campaigns: AuthCampaign[]
}

type AuthState = "authenticated" | "unauthenticated" | "loading"

interface AuthContext {
    info: AuthUser | null,
    authState: AuthState,
    clearAuthContext: () => void,
    changeAuthState: (newState: AuthState) => void,
}

const AuthContext = createContext<AuthContext | null>(null)

export function AuthProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [authState, setAuthState] = useState<AuthState>("loading")

    useEffect(() => {
        const token = getToken()

        if (!token) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setAuthState("unauthenticated")
            return
        }

        setAuthState("authenticated")
    }, [])

    useEffect(() => {
        api.get("/api/user").then(res => {
            setUser(res.data as AuthUser)
        }).catch(() => {
            removeToken()
            setAuthState("unauthenticated")
        })
    }, [authState])

    const changeAuthState = (newState: AuthState) => {
        setAuthState(newState)
    }

    const clearAuthContext = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{info: user, clearAuthContext, authState, changeAuthState}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}