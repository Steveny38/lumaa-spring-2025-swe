import { createContext , ReactNode, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    token: string | null;
    loading: boolean
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string) => Promise<void>;
    signout: () => void;
    
}


export const AuthContext = createContext<AuthContextType|null>(null)

const AuthProvider = ({children} : {children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(null)
    const[loading, setLoading] = useState<boolean>(true)
    const nav = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token){
            setToken(token)
            console.log("Found")
        } else {
            console.log("NONE")
        }

        setLoading(false)
    }, [])

    const login = async (username: string, password: string) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_PORT+"/auth/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    username, password
                })
            })
            const data = await response.json()
            if(response.ok){
                localStorage.setItem("token", data.token)
                console.log("SUCCESS", data)
                setToken(data.token)
                nav('/task')
            } else {
                throw new Error("Error logging in")
            }


        } catch (error) {
            console.error(error)
        }
    }

    const register = async (username: string, password: string) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_PORT+"/auth/register", {
                method: "POST",
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({username, password})
            })

            const data = await response.json()

            if(response.ok){
                console.log("SUCCESS REG", data)
                localStorage.setItem("token", data.token)
                setToken(data.token)
                nav('/task')
            } else {
                throw new Error("Error registering")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const signout = () =>{
        localStorage.removeItem("token")
        setToken(null)
        nav('/login')
        
    }

    return(
        <AuthContext.Provider value={{token, login, register, signout, loading}} > {children}</AuthContext.Provider>
    )
}


export default AuthProvider
