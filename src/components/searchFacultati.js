import { useState, useEffect } from 'react';
import { Table, Form, InputGroup, FormControl } from 'react-bootstrap';

export default function FacultatiFilter({selectedUniversitati, selectedFacultati, setSelectedFacultati}) {
    const [facultatiData, setFacultatiData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/api/facultati')
        .then(response => response.json())
        .then(setFacultatiData);
    }, [selectedUniversitati]);

    const handleCheck = (event) => {
        const { value, checked } = event.target;
        //("Checked value: ", Number(value), " Checked status: ", checked);
        if (checked) {
            setSelectedFacultati(prevSelected => [...prevSelected, Number(value)]);
        }
        else {
            setSelectedFacultati(prevSelected => prevSelected.filter(id => id !== Number(value)));
        }
    };

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const filteredFacultati = facultatiData
    .filter(facultate => selectedUniversitati.length === 0 || selectedUniversitati.includes(facultate.id_universitate))
    .filter(facultate => 
        facultate.nume.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="sticky-top" style={{ boxShadow: '0 0 15px 20px white' }}>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search..."
                        aria-label="Search..."
                        aria-describedby="basic-addon2"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </InputGroup>
            </div>
            <Table>
                <tbody>
                    {filteredFacultati.map(facultate => (
                    <tr key={facultate.id}>
                        <td>
                        <Form.Check
                            type="checkbox"
                            id={`facultate-${facultate.id}`}
                            label={facultate.nume}
                            value={facultate.id}
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