import { AuthenticationProvider } from "@/components/context/AuthContext"
import { Container } from "react-bootstrap"
import Link from "next/link"

export const metadata = {
    title: 'Profilul meu -  Disertație Specializări',
    description: 'Vezi informații despre profilul tău și recomandările noastre pentru specializările care ți se potrivesc.',
    keywords: 'chestionar, recomandări, specializari, universitati, facultati, domenii, ramuri, orase, regiuni, disertatie, licenta, master, AI, IA, Artificial Intelligence, Inteligenta Artificiala, sistem de asistare a deciziilor, asistarea deciziilor, model lingvistic, LLM',
}

export default function RootLayout({ children }) {
    return (
        <AuthenticationProvider>
            <Container>
                <div className='d-flex pt-2'>
                    <div className='col-3 p-2'>
                        <div className='list-group'>
                            <Link className='list-group-item list-group-item-action' href="/profile">Date Cont</Link>
                            <Link className='list-group-item list-group-item-action' href="/profile/quizResults">Rezultate Chestionar</Link>
                            <Link className='list-group-item list-group-item-action' href="/profile/comments">Comentariile mele</Link>
                        </div>
                    </div>
                    {children}
                </div>
            </Container>
        </AuthenticationProvider>
    )
}
