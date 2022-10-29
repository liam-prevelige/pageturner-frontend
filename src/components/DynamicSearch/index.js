import React, {useEffect, useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import './DynamicSearch.css';

export const DynamicSearch = ({searchFn, onSelect, placeholder}) => {
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);
  const [hide, setHide] = useState(false);

  // Function to execute the search
  const execSearch = async () => {
    if (search) {
      const results = await searchFn(search);
      results && setResults(results);
    } else {
      setResults([]);
    }
  };

  // Initial trigger on search text change
  useEffect(() => {
    if (!hide) {
      const timer = setTimeout(() => setSearch(searchInput), 500);
      return () => clearTimeout(timer);
    }
  }, [searchInput]);

  // Delayed trigger on search text change
  useEffect(() => {
    execSearch();
  }, [search]);

  return (<Card className="search">
    <Card.Body>
      <input
        className="searchInput"
        type="input"
        placeholder={placeholder}
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setHide(false);
        }}
      />
      {results.length > 0 && !hide && <ListGroup className="mt-2" variant="flush">
        {results.map((result, index) => <ListGroup.Item
          className="searchResult"
          key={index}
          onClick={() => {
            setHide(true);
            setSearchInput(result.label);
            onSelect(result.id);
          }}
        >{result.label}</ListGroup.Item>)}
      </ListGroup>}
    </Card.Body>
  </Card>);
};
