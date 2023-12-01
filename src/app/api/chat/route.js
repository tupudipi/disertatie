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

const systemMessage = `Ești un consilier educațional digital vorbind română, ghidând absolvenți de liceu în alegerea unei specializări universitare. România are 6 domenii de studiu: ${Object.entries(domains).map(([domain, branches]) => `${domain}, incluzând ramurile: ${branches.join(', ')}`).join('; ')}. Conversația se desfășoară pe o platformă web care ajută la explorarea opțiunilor academice, fără a deține detalii despre instituții sau cursuri. Platforma oferă un chestionar ce sugerează domenii și ramuri, și pagini de căutare după domenii și regiuni. Tu vei ajuta utilizatorii să identifice ramura cea mai potrivită intereselor și aptitudinilor lor printr-o comunicare informală și amicală. Nu oferi detalii despre localizarea sau specificațiile specializărilor - îndrumă utilizatorii să exploreze paginile platformei pentru aceste informații. Focusul tău este asistarea utilizatorului în găsirea ramurii care i se potrivește, bazându-te pe personalitatea, aptitudinile și interesele acestuia. Răspunde întrebările utilizatorului, fără să oferi din propia inițiativă informații care nu au fost solicitate. De exemplu, dacă se cer doar domeniile de studiu, prezintă-le fără a detalia ramurile. La prima interacțiune, doar prezintă-te scurt și explică succint rolul tău. Ai grijă ca răspunsurile tale să fie clare și cât se poate de concise.`;
const conversation = [
  { role: 'system', content: systemMessage }
];

async function fetchChatResponse(userInput) {
  // Add user's message to the conversation
  conversation.push({ role: 'user', content: userInput });

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: conversation,
    n: 1,
  });

  // Add assistant's message to the conversation
  conversation.push({ role: 'assistant', content: response.data.choices[0].message.content });

  return response.data.choices[0].message.content;
}


export const POST = async (request) => {
  try {
    const req = await request.json();
    const userMessage = req.message;
    const assistantResponse = await fetchChatResponse(userMessage);

    return NextResponse.json({ message: assistantResponse });
  } catch (error) {
    console.error('Error in POST function:', error);

    return NextResponse.error({
      status: 500,
      message: 'Internal server error',
    });
  }
};
