import { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';

function SpecializareItem({ specializare }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const facultateResponse = await fetch(`/api/facultati/${specializare.id_facultate}`);
                const facultate = await facultateResponse.json();

                const universitateResponse = await fetch(`/api/universitati/${facultate.id_universitate}`);
                const universitate = await universitateResponse.json();

                const orasResponse = await fetch(`/api/orase/${facultate.id_oras}`);
                const oras = await orasResponse.json();

                const regiuneResponse = await fetch(`/api/regiuni/${oras.id_regiune}`);
                const regiune = await regiuneResponse.json();

                setData({ specializare, facultate, universitate, oras, regiune });
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        fetchData();
    }, [specializare]);

    if (loading) {
        // Show loading state
        return (
            <Card className="mb-1">
                <Card.Body className="bg-light">
                    <Row>
                        <Col lg={4} className="my-auto">
                            <h5 className="card-title">
                                <Spinner size="sm" animation="border" className='text-primary' />
                            </h5>
                        </Col>
                        <Col lg={4} className="bg-white">
                            <p className="card-title">
                                <Spinner size="sm" animation="border" className='text-primary' />
                            </p>
                            <p className="my-3">
                                <Spinner size="sm" animation="border" className='text-primary' />
                            </p>
                        </Col>
                        <Col lg={4} className="bg-white">
                            <p className="card-title">
                                <Spinner size="sm" animation="border" className='text-primary' />
                            </p>
                            <p className="my-3">
                                <Spinner size="sm" animation="border" className='text-primary' />
                            </p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <Card className="mb-1">
            <Card.Body className="bg-light">
                <Row>
                    <Col lg={4} className="my-auto">
                        <h5 className="card-title">
                            <Link
                                className="text-decoration-none w-100"
                                href={`/specializare/${data.specializare.id}`}
                            >
                                <small>Specializarea<br /></small> {data.specializare.nume}
                            </Link>
                        </h5>
                    </Col>
                    <Col lg={4} className="bg-white">
                        <p className="card-title">
                            <Link
                                className="text-decoration-none w-100"
                                href={`/regiune/${data.regiune.id}`}
                            >
                                <i className="bi bi-geo-alt"></i> {data.regiune.nume}
                            </Link>
                        </p>
                        <p className="my-3">
                            <Link
                                className="text-decoration-none w-100"
                                href={`/oras/${data.oras.id}`}
                            >
                                <i className="bi bi-building"></i>  {data.oras.nume}
                            </Link>
                        </p>
                    </Col>
                    <Col lg={4} className="bg-white">
                        <p className="card-title">
                            <Link
                                className="text-decoration-none w-100"
                                href={`/universitate/${data.universitate.id}`}
                            >
                                <i className="bi bi-house"></i> {data.universitate.nume}
                            </Link>
                        </p>
                        <p className="my-3">
                            <Link
                                className="text-decoration-none w-100"
                                href={`/facultate/${data.facultate.id}`}
                            >
                                <i className="bi bi-award"></i> {data.facultate.nume}
                            </Link>
                        </p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default SpecializareItem;
