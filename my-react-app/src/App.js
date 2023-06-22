
import './App.css';
import React, { useEffect, useState } from 'react';

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input type="text" value={search} onChange={handleSearchChange} placeholder="Buscar por título..." />
  );
}

function App() {
  const[data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const URL = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/'
    const codeVerify = [500, 502, 503, 504, 507, 508, 509]
    fetch( URL, {
      headers: {
        'dev-email-address': 'seuemail@exemplo.com'
      }
    })
    .then(response => {
      if (codeVerify.includes(response.status)) {
        console.log(response.status);
        setError('O servidor falhou em responder, tente recarregar a página');
        return Error;
      }
      return response.json();
    })
    .then(data => {
      if (data === 'error') {
        setData('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde')
      }
      setData(data);
      console.log(data)

    })
    .catch(() => setError('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde'));
  }, [])
  if (error) {
    return <div>O servidor falhou em responder, tente recarregar a página</div>;
  }

  const filteredData = data ? data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())) : [];

  return (
    <div>
      <SearchBar onSearch={setSearch} />
      {filteredData.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <img src={item.thumbnail} alt={item.title} />
        </div>
      ))}
    </div>
  );
}

export default App;
