import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Pagination, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';


const SearchResults = ({
  selectedDomenii,
  selectedRamuri,
  selectedRegiuni,
  selectedOrase,
  selectedUniversitati,
  selectedFacultati
}) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 9;
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  useEffect(() => {
    setLoading(true);

    fetch('/api/search')
      .then(response => response.json())
      .then(data => {
        const searchTermNormalized = debouncedSearchText.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const filteredResults = data.filter(result => {
          const doesSearchTextMatch = Object.values(result).some(value => {
            const valueNormalized = String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            return valueNormalized.toLowerCase().includes(searchTermNormalized.toLowerCase());
          });

          return (
            doesSearchTextMatch &&
            (selectedDomenii.length === 0 || selectedDomenii.includes(result["id-d"])) &&
            (selectedRamuri.length === 0 || selectedRamuri.includes(result["id-ra"])) &&
            (selectedRegiuni.length === 0 || selectedRegiuni.includes(result["id-re"])) &&
            (selectedOrase.length === 0 || selectedOrase.includes(result["id-o"])) &&
            (selectedUniversitati.length === 0 || selectedUniversitati.includes(result["id-u"])) &&
            (selectedFacultati.length === 0 || selectedFacultati.includes(result["id-f"]))
          );
        });

        setResults(filteredResults);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    debouncedSearchText,
    selectedDomenii,
    selectedRamuri,
    selectedRegiuni,
    selectedOrase,
    selectedUniversitati,
    selectedFacultati
  ]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  let start = Math.max(currentPage - 2, 1);
  let end = Math.min(start + 4, totalPages);

  if (currentPage === 1) {
    end = Math.min(5, totalPages);
  }

  if (end === totalPages) {
    start = Math.max(end - 4, 1);
  }

  const pages = Array.from({ length: (end - start + 1) }, (_, i) => start + i);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
      <div className="search-results w-100">

        <InputGroup className="my-3" style={{ boxShadow: '0 0 15px 20px white' }}>
          <InputGroup.Text id="basic-addon1"><i className="bi bi-search"></i></InputGroup.Text>
          <FormControl
            placeholder="Search..."
            aria-label="Search..."
            aria-describedby="basic-addon2"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </InputGroup>

        {loading ? (
          <p>Loading...</p>
        ) : currentResults.length > 0 ? (
          <>
            <Row xs={1} md={2} lg={3} className="g-4 pb-4 mb-2">
              {currentResults.map((result, index) => (
                <Col key={index} lg={12}>
                  <Card className="w-100">
                    <Card.Body className="bg-light">
                      <Row>
                        <Col lg={3} className="my-auto">
                          <Card.Title>
                            <a href={`/specializare/${result["id-s"]}`} className="text-decoration-none w-100">
                              {result.Specializare}
                            </a>
                          </Card.Title>
                        </Col>
                        <Col lg={4} className="bg-white">
                          <p className="mt-5 mb-0">
                            <a href={`/domeniu/${result["id-d"]}`} className="text-decoration-none w-100">
                              <i className="bi bi-stop"></i> Domeniul {result.Domeniu}
                            </a>
                          </p>
                          <p className="mb-4">
                            <a href={`/ramura/${result["id-ra"]}`} className="text-decoration-none w-100">
                              <i className="bi bi-diagram-3"></i> Ramura {result.Ramura}
                            </a>
                          </p>
                        </Col>
                        <Col lg={5} className="bg-white">
                          <p className="my-2">
                            <a href={`/regiune/${result["id-re"]}`} className="text-decoration-none w-100">
                              <i className="bi bi-geo-alt"></i> {result.Regiune}
                            </a>
                          </p>
                          <p className="mb-2">
                            <a href={`/oras/${result["id-o"]}`} className="text-decoration-none w-100">
                              <i className="bi bi-building"></i> {result.Oras}
                            </a>
                          </p>
                          <p className="mb-2">
                            <a href={`/universitate/${result["id-u"]}`} className="text-decoration-none w-100">
                              <i className="bi bi-house"></i> {result.Universitate}
                            </a>
                          </p>
                          <p className="mb-2">
                            <a href={`/facultate/${result["id-f"]}`} className="text-decoration-none w-100">
                              <i className="bi bi-award"></i> {result.Facultate}
                            </a>
                          </p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <div
              style={{
                width: '100%',
                textAlign: 'center'
              }}
              className='sticky-bottom pb-3'
            >
              <Pagination style={{ marginInline: 'auto' }}>
                <Pagination.First style={{ boxShadow: '0 0 20px 10px white' }} onClick={() => handlePageChange(1)} />
                <Pagination.Prev style={{ boxShadow: '0 0 20px 10px white' }} onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)} />

                {start > 1 ? (
                  <Pagination.Ellipsis style={{ boxShadow: '0 0 20px 10px white' }} />
                ) : (
                  <Pagination.Ellipsis disabled style={{ boxShadow: '0 0 20px 10px white' }} />
                )}

                {pages.map(page => (
                  <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                    style={{ width: '50px', boxShadow: '0 0 20px 10px white' }}
                  >
                    {page}
                  </Pagination.Item>
                ))}

                {end < totalPages ? (
                  <Pagination.Ellipsis style={{ boxShadow: '0 0 20px 10px white' }} />
                ) : (
                  <Pagination.Ellipsis disabled style={{ boxShadow: '0 0 20px 10px white' }} />
                )}

                <Pagination.Next style={{ boxShadow: '0 0 20px 10px white' }} onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)} />
                <Pagination.Last style={{ boxShadow: '0 0 20px 10px white' }} onClick={() => handlePageChange(totalPages)} />
              </Pagination>
            </div>

          </>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
