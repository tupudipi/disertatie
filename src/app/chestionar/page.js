'use client'
import { useState, useEffect } from 'react';
import { Container, Row, Col, ProgressBar, ButtonGroup, Button } from 'react-bootstrap';
import MyNav from '../../components/Nav';
import Footer from '../../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

// Lista cu întrebările, împreună cu domeniile și ramurile asociate
const questions = [
  {
    question: "Ești fascinat de rezolvarea problemelor complexe și de găsirea unor soluții logice și eficiente?",
    domain: "Matematică și științe ale naturii",
    branches: ['Matematică', 'Ingineria sistemelor, calculatoare și tehnologia informației', 'Fizică', 'Inginerie civilă', 'Științe economice'],
  },
  {
    question: "Îți place să explorezi și să înțelegi fenomenele naturale și să descoperi legile care guvernează universul?",
    domain: "Matematică și științe ale naturii",
    branches: ['Fizică', 'Chimie', 'Științele pământului și atmosferei', 'Biologie', 'Inginerie geologică, mine, petrol și gaze'],
  },
  {
    question: "Ești atras de ideea de a manipula și analiza date și informații pentru a extrage modele și a face predicții? ",
    domain: "Matematică și științe ale naturii",
    branches: ['Informatică', 'Științe economice', 'Ingineria sistemelor, calculatoare și tehnologia informației', 'Statistică', 'Științe ale comunicării'],
  },
  {
    question: "Ai vrea să îți folosești abilitățile analitice pentru a înțelege și modela sisteme complexe și a le îmbunătăți eficiența? ",
    domain: "Matematică și științe ale naturii",
    branches: ['Inginerie mecanică, mecatronică, inginerie industrială și management', 'Matematică', 'Inginerie civilă', 'Ingineria sistemelor, calculatoare și tehnologia informației', 'Științe economice'],
  },
  {
    question: "Te pasionează cercetarea și dezvoltarea de noi tehnologii și instrumente pentru a îmbunătăți calitatea vieții și a rezolva probleme globale? ",
    domain: "Matematică și științe ale naturii",
    branches: ['Inginerie electrică, electronică și telecomunicații', 'Inginerie chimică', 'Inginerie geologică, mine, petrol și gaze', 'Biochimie', 'Științe politice'],
  },
  {
    question: "Ești interesat de proiectarea, construcția și întreținerea diferitelor tipuri de structuri, mașini și sisteme?",
    domain: "Științe inginerești",
    branches: ['Inginerie civilă', 'Inginerie mecanică, mecatronică, inginerie industrială și management', 'Inginerie electrică, electronică și telecomunicații', 'Arhitectură și urbanism', 'Ingineria transporturilor'],
  },
  {
    question: "Îți place să găsești soluții inovatoare și eficiente la problemele tehnice și inginerești? ",
    domain: "Științe inginerești",
    branches: ['Inginerie electrică, electronică și telecomunicații', 'Inginerie mecanică, mecatronică, inginerie industrială și management', 'Inginerie chimică', 'Ingineria sistemelor, calculatoare și tehnologia informației', 'Inginerie geologică, mine, petrol și gaze'],
  },
  {
    question: "Ești atras de ideea de a lucra în echipă pentru a realiza proiecte complexe care implică multiple discipline și tehnologii? ",
    domain: "Științe inginerești",
    branches: ['Ingineria transporturilor', 'Științe politice', 'Ingineria resurselor vegetale și animale', 'Ingineria sistemelor, calculatoare și tehnologia informației', 'Științe economice'],
  },
  {
    question: "Ai vrea să îți folosești creativitatea și cunoștințele tehnice pentru a dezvolta produse și sisteme care să îmbunătățească lumea în care trăim? ",
    domain: "Științe inginerești",
    branches: ['Inginerie mecanică, mecatronică, inginerie industrială și management', 'Inginerie electrică, electronică și telecomunicații', 'Inginerie chimică', 'Arhitectură și urbanism', 'Științe economice'],
  },
  {
    question: "Te pasionează studiul și aplicarea principiilor științifice și matematice în dezvoltarea de noi tehnologii și sisteme inginerești? ",
    domain: "Științe inginerești",
    branches: ['Inginerie electrică, electronică și telecomunicații', 'Inginerie mecanică, mecatronică, inginerie industrială și management', 'Inginerie civilă', 'Ingineria sistemelor, calculatoare și tehnologia informației', 'Inginerie geologică, mine, petrol și gaze'],
  },
  {
    question: "Ești interesat de studiul proceselor biologice, la nivel celular și molecular, pentru a înțelege modul în care funcționează organismele vii? ",
    domain: "Științe biologice și biomedicale",
    branches: ['Biologie', 'Biochimie', 'Medicină', 'Medicină veterinară', 'Științele pământului și atmosferei'],
  },
  {
    question: "Te atrage ideea de a contribui la dezvoltarea de tratamente și terapii inovatoare pentru bolile umane și animale? ",
    domain: "Științe biologice și biomedicale",
    branches: ['Medicină', 'Farmacie', 'Medicină veterinară', 'Biochimie', 'Medicină dentară'],
  },
  {
    question: "Ești fascinat de studiul relațiilor dintre organisme și mediul lor, precum și de diversitatea speciilor de pe Pământ? ",
    domain: "Științe biologice și biomedicale",
    branches: ['Biologie', 'Științele pământului și atmosferei', 'Ingineria resurselor vegetale și animale', 'Medicină veterinară', 'Arhitectură și urbanism'],
  },
  {
    question: "Îți place să explorezi interacțiunile complexe dintre factorii genetici, mediul înconjurător și comportamentul organismelor? ",
    domain: "Științe biologice și biomedicale",
    branches: ['Biologie', 'Psihologie și științe comportamentale', 'Medicină', 'Medicină veterinară', 'Științele pământului și atmosferei'],
  },
  {
    question: "Ai vrea să contribui la protejarea și conservarea biodiversității și a resurselor naturale pentru generațiile viitoare? ",
    domain: "Științe biologice și biomedicale",
    branches: ['Biologie', 'Științele pământului și atmosferei', 'Ingineria resurselor vegetale și animale', 'Arhitectură și urbanism', 'Științe politice'],
  },
  {
    question: "Ești interesat de studiul comportamentului uman și de modul în care indivizii și grupurile interacționează în societate? ",
    domain: "Științe sociale",
    branches: ['Sociologie', 'Psihologie și științe comportamentale', 'Științe politice', 'Științe ale comunicării', 'Filosofie'],
  },
  {
    question: "Îți place să analizezi și să înțelegi procesele politice, economice și sociale care influențează lumea în care trăim? ",
    domain: "Științe sociale",
    branches: ['Științe politice', 'Științe economice', 'Sociologie', 'Științe juridice', 'Științe administrative'],
  },
  {
    question: "Ești atras de ideea de a dezvolta și evalua politici și programe care să îmbunătățească bunăstarea și justiția socială? ",
    domain: "Științe sociale",
    branches: ['Științe politice', 'Științe administrative', 'Sociologie', 'Științe juridice', 'Științe economice'],
  },
  {
    question: "Te pasionează studiul și dezvoltarea abilităților de comunicare și persuasiune, precum și înțelegerea mecanismelor de propagare a informațiilor și influențării opiniei publice? ",
    domain: "Științe sociale",
    branches: ['Științe ale comunicării', 'Psihologie și științe comportamentale', 'Științe politice', 'Științe economice', 'Sociologie'],
  },
  {
    question: "Ești motivat să contribui la rezolvarea problemelor sociale și să lucrezi în beneficiul comunității și al societății în ansamblu? ",
    domain: "Științe sociale",
    branches: ['Sociologie', 'Științe politice', 'Științe juridice', 'Științe administrative', 'Psihologie și științe comportamentale'],
  },
  {
    question: "Ești atras de studiul culturii, limbajului, istoriei și filosofiei și de modul în care acestea influențează și modelează societatea? ",
    domain: "Științe umaniste și arte",
    branches: ['Filologie', 'Filosofie', 'Istorie', 'Studii culturale', 'Teologie'],
  },
  {
    question: "Îți place să explorezi și să înțelegi operele literare, artistice și arhitecturale ale diferitelor civilizații de-a lungul timpului?",
    domain: "Științe umaniste și arte",
    branches: ['Filologie', 'Istorie', 'Studii culturale', 'Arhitectură și urbanism', 'Arte'],
  },
  {
    question: "Te pasionează dezvoltarea propriilor abilități creative și artistice, în domenii precum muzica, pictura, sculptura, teatrul sau dansul? ",
    domain: "Științe umaniste și arte",
    branches: ['Arte', 'Filologie', 'Studii culturale', 'Arhitectură și urbanism', 'Filosofie'],
  },
  {
    question: "Ești interesat de analiza și interpretarea semnificațiilor simbolice și estetice ale diferitelor forme de exprimare culturală și artistică? ",
    domain: "Științe umaniste și arte",
    branches: ['Filosofie', 'Filologie', 'Studii culturale', 'Arte', 'Istorie'],
  },
  {
    question: "Ai vrea să contribui la păstrarea și promovarea patrimoniului cultural și artistic al umanității, precum și la dezvoltarea unor noi forme de exprimare și comunicare? ",
    domain: "Științe umaniste și arte",
    branches: ['Studii culturale', 'Istorie', 'Filologie', 'Arhitectură și urbanism', 'Arte'],
  },
  {
    question: "Te pasionează sportul, activitățile fizice și menținerea unui stil de viață sănătos și echilibrat? ",
    domain: "Știința sportului și educației fizice",
    branches: ['Știința sportului și educației fizice', 'Medicină', 'Medicină dentară', 'Medicină veterinară', 'Farmacie'],
  },
  {
    question: "Ești atras de studiul performanței sportive și a factorilor care influențează capacitatea organismului de a face față efortului fizic? ",
    domain: "Știința sportului și educației fizice",
    branches: ['Știința sportului și educației fizice', 'Medicină', 'Biologie', 'Medicină veterinară', 'Farmacie'],
  },
  {
    question: "Te interesează dezvoltarea și implementarea de programe de educație fizică și sportive pentru diferite categorii de vârstă și niveluri de performanță? ",
    domain: "Știința sportului și educației fizice",
    branches: ['Știința sportului și educației fizice', 'Psihologie și științe comportamentale', 'Științe ale comunicării', 'Sociologie', 'Științe militare, informații și ordine publica'],
  },
  {
    question: "Ai vrea să contribui la promovarea unui stil de viață activ și sănătos în rândul populației și la prevenirea unor probleme de sănătate legate de sedentarism? ",
    domain: "Știința sportului și educației fizice",
    branches: ['Știința sportului și educației fizice', 'Medicină', 'Medicină veterinară', 'Sociologie', 'Psihologie și științe comportamentale'],
  },
  {
    question: "Ești motivat să lucrezi în domeniul sportului, antrenând și pregătind atleți pentru competiții sau promovând activități fizice și recreative în comunitate?",
    domain: "Știința sportului și educației fizice",
    branches: ['Știința sportului și educației fizice', 'Științe ale comunicării', 'Sociologie', 'Psihologie și științe comportamentale', 'Științe militare, informații și ordine publica'],
  }
];

export default function Questionnaire() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [domainScores, setDomainScores] = useState({});
  const [branchScores, setBranchScores] = useState({});
  const [user, setUser] = useState(null);

  const currentQuestionData = questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    if (answer === 'yes') {
      // Adăugăm 5 puncte la domeniul curent
      setDomainScores(prevScores => ({
        ...prevScores,
        [currentQuestionData.domain]: (prevScores[currentQuestionData.domain] || 0) + 5,
      }));

      // Adăugăm puncte ramurilor în ordine descrescătoare
      currentQuestionData.branches.forEach((branch, index) => {
        setBranchScores(prevScores => ({
          ...prevScores,
          [branch]: (prevScores[branch] || 0) + 5 - index,
        }));
      });
    }

    // Trecem la următoarea întrebare
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // Toate întrebările au fost răspunse
      calculateResults();
    }
  };

  const calculateResults = () => {
    // Găsim domeniul cu scorul cel mai mare
    const recommendedDomain = Object.keys(domainScores).reduce((a, b) => domainScores[a] > domainScores[b] ? a : b);

    // Sortăm ramurile după scorul lor și luăm primele 5
    const recommendedBranches = Object.keys(branchScores).sort((a, b) => branchScores[b] - branchScores[a]).slice(0, 5);

    const rezultateChestionar = `Domeniu recomandat: ${recommendedDomain}\nRamuri recomandate: ${recommendedBranches.join(', ')}`;

    // Salvăm rezultatele în baza de date
    if(user){
      const data = {
        email: user.email,
        domain: recommendedDomain,
        branches: recommendedBranches.join(', ')
      };
      //console.log(data);
      //console.log(JSON.stringify(data));
      fetch('/api/insertQuizResults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    }

    alert(rezultateChestionar + (user ? '\nRezultatele au fost salvate în baza de date.' : '\nNu sunteți autentificat. Rezultatele nu au fost salvate în baza de date.'));
  };

  return (
<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
  <MyNav />

  <div style={{ flex: 1, backgroundColor: "white" }} className='mt-5' >
    <Container>
      <Row className="justify-content-center mt-5"> 
        <Col lg={8} md={10} sm={12} className='p-5 border shadow rounded'>
          <div className="text-start">
            <h2>Întrebarea {currentQuestionIndex + 1} / {questions.length}</h2>
            <ProgressBar now={(currentQuestionIndex + 1) / questions.length * 100} style={{ marginBottom: '20px' }} />
          </div>

          <div style={{minHeight: "10.5rem"}} className='d-flex align-items-center'>
            <h5>{currentQuestionData.question}</h5>
          </div>

          <div className="d-flex justify-content-between mt-5">
            <Button style={{width: '40%', height: '3rem'}} variant="primary" onClick={() => handleAnswer('yes')}>Da</Button>
            <Button style={{width: '40%', height: '3rem'}}  variant="secondary" onClick={() => handleAnswer('no')}>Nu</Button>
          </div>
        </Col>
      </Row>
    </Container>
  </div>

  <Footer />
</div>

  );
}
