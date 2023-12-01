'use client'
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchFilters from '@/components/accordionSearch';
import SearchResults from '@/components/searchResults';

const SearchPage = () => {
    const [selectedDomenii, setSelectedDomenii] = useState([]);
    const [selectedRamuri, setSelectedRamuri] = useState([]);
    const [selectedRegiuni, setSelectedRegiuni] = useState([]);
    const [selectedOrase, setSelectedOrase] = useState([]);
    const [selectedUniversitati, setSelectedUniversitati] = useState([]);
    const [selectedFacultati, setSelectedFacultati] = useState([]);

    return (
        <Row>
            <Col md={4}>
                <SearchFilters
                    selectedDomenii={selectedDomenii}
                    setSelectedDomenii={setSelectedDomenii}
                    selectedRamuri={selectedRamuri}
                    setSelectedRamuri={setSelectedRamuri}
                    selectedRegiuni={selectedRegiuni}
                    setSelectedRegiuni={setSelectedRegiuni}
                    selectedOrase={selectedOrase}
                    setSelectedOrase={setSelectedOrase}
                    selectedUniversitati={selectedUniversitati}
                    setSelectedUniversitati={setSelectedUniversitati}
                    selectedFacultati={selectedFacultati}
                    setSelectedFacultati={setSelectedFacultati}
                />
            </Col>
            <Col md={8}>
                <SearchResults
                    selectedDomenii={selectedDomenii}
                    selectedRamuri={selectedRamuri}
                    selectedRegiuni={selectedRegiuni}
                    selectedOrase={selectedOrase}
                    selectedUniversitati={selectedUniversitati}
                    selectedFacultati={selectedFacultati}
                />
            </Col>
        </Row>
    )
}

export default SearchPage;