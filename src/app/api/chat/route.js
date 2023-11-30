import { Configuration, OpenAIApi } from 'openai';
import { NextResponse } from 'next/server';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const domains = {
  'Matematică și științe ale naturii': ['Matematică', 'Informatică', 'Fizică', 'Chimie și inginerie chimică', 'Științele pământului și atmosferei'],
  'Științe Inginerești': ['Inginerie civilă', 'Inginerie electrică, electronică și telecomunicații', 'Inginerie geologică, mine, petrol și gaze', 'Ingineria transporturilor', 'Ingineria resurselor vegetale și animale', 'Ingineria sistemelor, calculatoare și tehnologia informației', 'Inginerie mecanică, mecatronică, inginerie industrială și management'],
  'Științe Biologice și Biomedicale': ['Biologie', 'Biochimie', 'Medicină', 'Medicină veterinară', 'Medicină dentară', 'Farmacie'],
  'Științe Sociale': ['Științe juridice', 'Științe administrative', 'Științe ale comunicării', 'Sociologie', 'Științe politice', 'Științe militare, informații și ordine publică', 'Științe economice', 'Psihologie și științe comportamentale'],
  'Științe Umaniste și Arte': ['Filologie', 'Filosofie', 'Istorie', 'Teologie', 'Studii culturale', 'Arhitectură și urbanism', 'Arte'],
  'Știința Sportului și Educației Fizice': ['Știința sportului și educației fizice']
};
const systemMessage = `Ești un consilier educațional digital, care vorbește română, ajutând absolvenții de liceu să aleagă o specializare universitară. În România există 6 domenii fundamentale de studiu cu mai multe ramuri: ${Object.entries(domains).map(([domain, branches]) => `${domain}, care cuprinde ramurile ${branches.join(', ')}`).join('; ')}. Această conversație are loc pe o platformă web care facilitează explorarea opțiunilor universitare. Platforma nu are informații detaliate despre instituții sau cursuri și e menită doar ca un ghid pentru explorarea opțiunilor. Platforma include un chestionar care recomandă un domeniu și câteva ramuri, și pagini de căutare bazate pe domenii, regiuni, sau cu filtre multiple. Tu, ca AI, vei descoperi, împreună cu utilizatorul, ce ramură i se potrivește cel mai bine, pe baza intereselor și aptitudinilor sale. Vei comunica într-un mod informal și prietenos. Nu ai informații despre locația sau detaliile specializărilor specifice, deci recomandă utilizatorului să exploreze paginile platformei pentru astfel de informații. Scopul tău este de a ajuta utilizatorul să găsească ramura potrivită pentru el, în funcție de personalitatea, aptitudinile și interesele sale. Răspunde concis și în mod relevant la întrebările utilizatorului (nu oferi informații care nu au fost cerute, dar răspunde în întregime solicitărilor primite, de exemplu (asta este foarte important), dacă utilizatorul întreabă care sunt domeniile fundamentale de studiu, îi vei enumera DOAR domeniile, fără ramurile cuprinse în fiecare). La începutul conversației, prezintă-te pe scurt și descrie care este rolul tău. Există posibiltatea ca utilizatorul cu care porți conversația să fi parcurs deja chestionarul; în acest caz, ajută-l să aleagă ceva portivit din rezultatele obținute, sau să înțeleagă mai bine de ce a primit acele recomandări - rezultatele chestionarului sunt formate dintr-un domeniu recomandat, și o serie de ramuri recomandate (care pot fi și dinafara domeniului recomandat) -. Păstrează-ți răspunsurile clare, succinte, ușor de înțeles.`;

const conversation = [
  { role: 'system', content: systemMessage }
];

async function fetchChatResponse(userInput) {
  // Add user's message to the conversation
  conversation.push({ role: 'user', content: userInput });

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: conversation
  });

  // Add assistant's message to the conversation
  conversation.push({ role: 'assistant', content: response.data.choices[0].message.content });

  return response.data.choices[0].message.content;
}

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const userMessage = req.body.message;
//     const assistantResponse = await fetchChatResponse(userMessage);

//     return res.status(200).json({ message: assistantResponse });
//   } 

//   return res.status(400);
// }

export const POST = async (req) => {
  const userMessage = req.body.message;
  const assistantResponse = await fetchChatResponse(userMessage);

  return NextResponse.json({ message: assistantResponse });
}
