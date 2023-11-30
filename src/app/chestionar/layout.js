'use client';
import { AuthenticationProvider } from '../../components/context/AuthContext';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AuthenticationProvider>
                    {children}
                </AuthenticationProvider>
            </body>
        </html>
    )
}
