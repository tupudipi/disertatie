import { useState, useEffect } from 'react';
import { Table, Form, InputGroup, FormControl } from 'react-bootstrap';

export default function RamuriFilter({ selectedDomenii, selectedRamuri, setSelectedRamuri }) {
    const [ramuriData, setRamuriData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        //console.log("Selected Domenii: ", selectedDomenii);
        fetch('/api/ramuri')
        .then(response => response.json())
        .then(setRamuriData);
    }, [selectedDomenii]);

    const handleCheck = (event) => {
        const { value, checked } = event.target;
        console.log("Checked value: ", Number(value), " Checked status: ", checked);
        if (checked) {
            setSelectedRamuri(prevSelected => [...prevSelected, Number(value)]);
        }
        else {
            setSelectedRamuri(prevSelected => prevSelected.filter(id => id !== Number(value)));
        }
    };

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const filteredRamuri = ramuriData
    .filter(ramura => selectedDomenii.length === 0 || selectedDomenii.includes(ramura.id_domeniu))
    .filter(ramura => {
      const ramuraName = ramura.nume.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const searchTermNormalized = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return ramuraName.toLowerCase().includes(searchTermNormalized.toLowerCase());
    });
    

    return (
        <div>
            <InputGroup className="mb-3 sticky-top" style={{ boxShadow: '0 0 15px 20px white' }}>
                <FormControl
                    placeholder="Search..."
                    aria-label="Search..."
                    aria-describedby="basic-addon2"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </InputGroup>
            <Table>
                <tbody>
                    {filteredRamuri.map(ramura => (
                    <tr key={ramura.id}>
                        <td>
                        <Form.Check
                            type="checkbox"
                            id={`ramura-${ramura.id}`}
                            label={ramura.nume}
                            value={ramura.id}
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
