'use client'
import { AuthenticationProvider } from "@/components/context/AuthContext"

export default function RootLayout({ children }) {
    return (
        <AuthenticationProvider>
            {children}
        </AuthenticationProvider>
    )
}
