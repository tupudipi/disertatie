'use client'
import { AuthenticationProvider } from "@/components/context/AuthContext"
import Questionnaire from "./ChestionarComponent"

export default function RootLayout({ children }) {
    return (
        <AuthenticationProvider>
            <Questionnaire></Questionnaire>
        </AuthenticationProvider>
    )
}
