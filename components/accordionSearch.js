import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DomeniiFilter from './searchDomenii';
import RamuriFilter from './searchRamuri';
import RegiuniFilter from './searchRegiuni';
import OraseFilter from './searchOrase';
import UniversitatiFilter from './searchUniversitati';
import FacultatiFilter from './searchFacultati';


export default function SearchFilters ({
    selectedDomenii, setSelectedDomenii,
    selectedRamuri, setSelectedRamuri,
    selectedRegiuni, setSelectedRegiuni,
    selectedOrase, setSelectedOrase,
    selectedUniversitati, setSelectedUniversitati,
    selectedFacultati, setSelectedFacultati
}) {

    
    return (
        <Accordion alwaysOpen className='mb-5 mt-3'>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Domeniul fundamental de studiu</Accordion.Header>
                <Accordion.Body style={{ maxHeight: '400px', overflow: 'auto' }}>
                    <DomeniiFilter selectedDomenii={selectedDomenii} setSelectedDomenii={setSelectedDomenii} />
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
                <Accordion.Header>Ramura științei</Accordion.Header>
                <Accordion.Body style={{ maxHeight: '400px', overflow: 'auto' }}>
                    <RamuriFilter selectedDomenii={selectedDomenii} selectedRamuri={selectedRamuri} setSelectedRamuri={setSelectedRamuri}/>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
                <Accordion.Header>Regiune</Accordion.Header>
                <Accordion.Body style={{ maxHeight: '400px', overflow: 'auto' }}>
                    <RegiuniFilter selectedRegiuni={selectedRegiuni} setSelectedRegiuni={setSelectedRegiuni}/>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
                <Accordion.Header>Oraș</Accordion.Header>
                <Accordion.Body style={{ maxHeight: '400px', overflow: 'auto' }}>
                    <OraseFilter selectedRegiuni={selectedRegiuni} selectedOrase={selectedOrase} setSelectedOrase={setSelectedOrase}/>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
                <Accordion.Header>Universitate</Accordion.Header>
                <Accordion.Body style={{ maxHeight: '400px', overflow: 'auto' }}>
                    <UniversitatiFilter selectedUniversitati={selectedUniversitati} setSelectedUniversitati={setSelectedUniversitati} />
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
                <Accordion.Header>Facultate</Accordion.Header>
                <Accordion.Body style={{ maxHeight: '400px', overflow: 'auto' }}>
                    <FacultatiFilter selectedUniversitati={selectedUniversitati} selectedFacultati={selectedFacultati} setSelectedFacultati={setSelectedFacultati}/>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

