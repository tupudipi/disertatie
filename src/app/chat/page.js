'use client';
import { AuthenticationProvider } from "@/components/context/AuthContext";
import Chat from "./ChatComponent";

export default function RootLayout({ children }) {
    return (
        <AuthenticationProvider>
            <Chat></Chat>
        </AuthenticationProvider>
    )
}
