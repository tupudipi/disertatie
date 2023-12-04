// searchDomenii component
import { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';

export default function DomeniiFilter({ selectedDomenii, setSelectedDomenii }) {
  const [domeniiData, setDomeniiData] = useState([]);

  useEffect(() => {
    fetch('/api/domenii')
      .then(response => response.json())
      .then(setDomeniiData);
  }, []);

  const handleCheck = (event) => {
    const { value, checked } = event.target;
    //console.log("Checked value: ", Number(value), " Checked status: ", checked);
    if (checked) {
        setSelectedDomenii(prevSelected => [...prevSelected, Number(value)]);
    } else {
        setSelectedDomenii(prevSelected => prevSelected.filter(id => id !== Number(value)));
    }
  };

  return (
    <Table>
      <tbody>
        {domeniiData.map(domeniu => (
          <tr key={domeniu.id}>
            <td>
              <Form.Check
                type="checkbox"
                id={`domeniu-${domeniu.id}`}
                label={domeniu.nume}
                value={domeniu.id}
                onChange={handleCheck}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
