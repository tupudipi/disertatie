import { useState, useEffect } from 'react';
import { Table, Form, InputGroup } from 'react-bootstrap';

export default function OraseFilter({ selectedRegiuni, selectedOrase, setSelectedOrase }) {
    const [oraseData, setOraseData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/api/orase')
            .then(response => response.json())
            .then(setOraseData);
    }, [selectedRegiuni]);

    const handleCheck = (event) => {
        const { value, checked } = event.target;
        console.log("Checked value: ", Number(value), " Checked status: ", checked);
        if (checked) {
            setSelectedOrase(prevSelected => [...prevSelected, Number(value)]);
        }
        else {
            setSelectedOrase(prevSelected => prevSelected.filter(id => id !== Number(value)));
        }
    };

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const filteredOrase = oraseData
    .filter(oras => selectedRegiuni.length === 0 || selectedRegiuni.includes(oras.id_regiune))
    .filter(oras => {
        const orasName = oras.nume.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const searchTermNormalized = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return orasName.toLowerCase().includes(searchTermNormalized.toLowerCase());
    });

    return (
        <div>
            <div className="sticky-top">
                <InputGroup className="mb-3" style={{ boxShadow: '0 0 15px 20px white' }}>
                <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                </InputGroup>
            </div>

                <Table>
                    <tbody>
                        {filteredOrase.map(oras => (
                            <tr key={oras.id}>
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        id={`oras-${oras.id}`}
                                        label={oras.nume}
                                        value={oras.id}
                                        onChange={handleCheck}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            );
}