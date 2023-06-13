//searchRegiuni component
import { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';

export default function RegiuniFilter({selectedRegiuni, setSelectedRegiuni}) {
    const [regiuniData, setRegiuniData] = useState([]);
    
    useEffect(() => {
        fetch('/api/regiuni')
        .then(response => response.json())
        .then(setRegiuniData);
    }, []);
    
    const handleCheck = (event) => {
        const { value, checked } = event.target;
        console.log("Checked value: ", Number(value), " Checked status: ", checked);
        if (checked) {
            setSelectedRegiuni(prevSelected => [...prevSelected, Number(value)]);
        }
        else {
            setSelectedRegiuni(prevSelected => prevSelected.filter(id => id !== Number(value)));
        }
    };
    
    return (
        <Table>
        <tbody>
            {regiuniData.map(regiune => (
            <tr key={regiune.id}>
                <td>
                <Form.Check
                    type="checkbox"
                    id={`regiune-${regiune.id}`}
                    label={regiune.nume}
                    value={regiune.id}
                    onChange={handleCheck}
                />
                </td>
            </tr>
            ))}
        </tbody>
        </Table>
    );
    }
    