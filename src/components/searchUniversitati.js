//searchUniversitati component
import { useState, useEffect } from 'react';
import { Table, Form, InputGroup, FormControl } from 'react-bootstrap';

export default function UniversitatiFilter({ selectedUniversitati, setSelectedUniversitati }) {
    const [universitatiData, setUniversitatiData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/api/universitati')
        .then(response => response.json())
        .then(setUniversitatiData);
    }, []);

    const handleCheck = (event) => {
        const { value, checked } = event.target;
        //console.log("Checked value: ", Number(value), " Checked status: ", checked);
        if (checked) {
            setSelectedUniversitati(prevSelected => [...prevSelected, Number(value)]);
        }
        else {
            setSelectedUniversitati(prevSelected => prevSelected.filter(id => id !== Number(value)));
        }
    };

    const handleChange = event => {
        const searchTermNormalized = event.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        setSearchTerm(searchTermNormalized);
    };
    
    const filteredUniversitati = universitatiData.filter(universitate => 
        universitate.nume.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(searchTerm)
    );

    return (
        <div>
            <div className="sticky-top">
            <InputGroup className="mb-3" style={{ boxShadow: '0 0 15px 20px white' }}>
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
                    {filteredUniversitati.map(universitate => (
                    <tr key={universitate.id}>
                        <td>
                        <Form.Check
                            type="checkbox"
                            id={`universitate-${universitate.id}`}
                            label={universitate.nume}
                            value={universitate.id}
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