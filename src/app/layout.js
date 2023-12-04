import './globals.css'
import MyNav from '@/components/Nav';
import Footer from '@/components/Footer';


export const metadata = {
  title: 'Disertație -  Specializări',
  description: 'Găsește specializarea potrivită pentru tine!',
  keywords: 'specializari, universitati, facultati, domenii, ramuri, orase, regiuni, disertatie, licenta, master, doctorat, AI, IA, Artificial Intelligence, Inteligenta Artificiala, sistem de asistare a deciziilor, asistarea deciziilor, model lingvistic, LLM',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
          <MyNav />
          <main style={{
            paddingTop: '0px',
            position: 'relative',
            zIndex: '1',
            marginBottom: '140px',
            backgroundColor: 'white',
          }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
