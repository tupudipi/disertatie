import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from '../components/Nav';
import Footer from '../components/Footer';

function Chat() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);  // new state

  const fetchCurrentUser = async () => {
    const response = await fetch('/api/currentUser');
    if (response.ok) {
        const data = await response.json();
        setUser(data.user);

        if (data.user) {
          const quizResultsResponse = await fetch(`/api/quizResults/${data.user.email}`);
          if (quizResultsResponse.ok) {
            const quizResultsData = await quizResultsResponse.json();
            setQuizResults(quizResultsData);
          } else {
            setQuizResults(null);
          }
        }
    } else {
        setUser(null);
        setQuizResults(null);
    }
    setDataFetched(true);
  };

  useEffect(() => {
    fetchCurrentUser(); 
  }, []);

  useEffect(() => {
    if(dataFetched) {
        fetchInitialMessage();
    }
  }, [dataFetched]);

  const fetchInitialMessage = async () => {
    setIsLoading(true);
    let message = 'start';
    
    if(user && quizResults) {
      message = `Utilizatorul ${user.username} a parcurs deja chestionarul si a primit recomandarile: ${JSON.stringify(quizResults)}. start`;
    }

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message })
    });

    const { message: assistantMessage } = await res.json();

    setConversation([{ role: 'assistant', content: assistantMessage }]);
    setIsLoading(false);
  };

  async function submitMessage(e) {
    e.preventDefault();

    setIsLoading(true);
    setConversation([...conversation, { role: 'user', content: message }]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    const { message: assistantMessage } = await res.json();
    setConversation(convo => [...convo, { role: 'assistant', content: assistantMessage }]);

    setIsLoading(false);
    setMessage("");
  }

  return (
    <div>
      <main className='d-flex flex-column' style={{
        paddingTop: '0px',
        position: 'relative',
        zIndex: '1',
        marginBottom: '140px',
        backgroundColor: 'white',
        minHeight: '100vh'
      }}>
        <MyNav />
        <Container className="flex-grow-1 d-flex flex-column">
          <div className="flex-grow-1" style={{ overflowY: "scroll", overflowX: "hidden" }}>
            {conversation.map((msg, index) => (
              <Row className="my-2">
                <Col xs={10} className={`${msg.role === 'assistant' ? '' : 'offset-1'}`}>
                  <Card className={`shadow-sm ${msg.role === 'assistant' ? 'bg-light text-dark' : 'bg-primary text-white'}`}>
                    <Card.Body>
                      <Card.Text>
                        <strong>{msg.role.charAt(0).toUpperCase() + msg.role.slice(1)}:</strong> {msg.content}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
          </div>

          <Row className="my-3 sticky-bottom">
            <Col>
              <Form onSubmit={submitMessage} className='my-3' style={{ boxShadow: '0 0 20px 10px white' }}>
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    disabled={isLoading}
                    placeholder="Scrie mesajul aici..."
                  />

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Spinner size="sm" animation="border" /> : 'Trimite'}
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default Chat;
