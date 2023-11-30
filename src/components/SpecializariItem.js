// SpecializareItem.js
import { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SpecializareItem({ specializare }) {
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const facultateResponse = await fetch(`/api/facultati/${specializare.id_facultate}`);
            const facultate = await facultateResponse.json();

            const universitateResponse = await fetch(`/api/universitati/${facultate.id_universitate}`);
            const universitate = await universitateResponse.json();

            const orasResponse = await fetch(`/api/orase/${facultate.id_oras}`);
            const oras = await orasResponse.json();

            const regiuneResponse = await fetch(`/api/regiuni/${oras.id_regiune}`);
            const regiune = await regiuneResponse.json();

            setData({ specializare, facultate, universitate, oras, regiune });
        };

        fetchData();
    }, [specializare]);

    if (!data) {
        return null;
    }

    return (
        <Card className="mb-1">
            <Card.Body className="bg-light">
                <Row>
                    <Col lg={4} className="my-auto">
                        <h5 className="card-title">
                            <a
                                className="text-decoration-none w-100"
                                href={`/specializare/${data.specializare.id}`}
                            >
                                <small>Specializarea<br /></small> {data.specializare.nume}
                            </a>
                        </h5>
                    </Col>
                    <Col lg={4} className="bg-white">
                            <p className="card-title">
                                <a
                                    className="text-decoration-none w-100"
                                    href={`/regiune/${data.regiune.id}`}
                                >
                                    <i className="bi bi-geo-alt"></i> {data.regiune.nume}
                                </a>
                            </p>
                            <p className="my-3">
                                <a
                                    className="text-decoration-none w-100"
                                    href={`/oras/${data.oras.id}`}
                                >
                                    <i className="bi bi-building"></i>  {data.oras.nume}
                                </a>
                            </p>
                    </Col>
                    <Col lg={4} className="bg-white">
                        <p className="card-title">
                            <a
                                className="text-decoration-none w-100"
                                href={`/universitate/${data.universitate.id}`}
                            >
                                <i className="bi bi-house"></i> {data.universitate.nume}
                            </a>
                        </p>
                        <p className="my-3">
                            <a
                                className="text-decoration-none w-100"
                                href={`/facultate/${data.facultate.id}`}
                            >
                                <i className="bi bi-award"></i> {data.facultate.nume}
                            </a>
                        </p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>


    );
}

export default SpecializareItem;
