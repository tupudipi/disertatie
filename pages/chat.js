import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from '../components/Nav';
import Footer from '../components/Footer';

function Chat() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch the initial message from the assistant when the component mounts
    const fetchInitialMessage = async () => {
      setIsLoading(true);
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: 'start' }) // This can be an empty string or some keyword to indicate initial message
      });

      const { message: assistantMessage } = await res.json();

      // Add assistant's message to the conversation
      setConversation([{ role: 'assistant', content: assistantMessage }]);
      setIsLoading(false);
    };
    fetchInitialMessage();
  }, []);

  async function submitMessage(e) {
    e.preventDefault();

    // Disable input during API call
    setIsLoading(true);

    // Add user's message to the conversation immediately
    setConversation([...conversation, { role: 'user', content: message }]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    const { message: assistantMessage } = await res.json();

    // Add assistant's message to the conversation
    setConversation(convo => [...convo, { role: 'assistant', content: assistantMessage }]);

    // Enable input after API call
    setIsLoading(false);
    setMessage("");
  }


  return (
    <div>
      <main className='vh-100 d-flex flex-column' style={{
        paddingTop: '0px',
        position: 'relative',
        zIndex: '1',
        marginBottom: '140px',
        backgroundColor: 'white',
      }}>
        <MyNav />
        <Container className="flex-grow-1 d-flex flex-column">
          <div className="flex-grow-1" style={{ overflowY: "auto", overflowX: "hidden" }}>
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

          <Row className="my-3">
            <Col>
              <Form onSubmit={submitMessage}>
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

