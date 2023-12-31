
import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  const[data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

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

    })
    .catch(() => setError('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde'));
  }, [])


  if (error) {
    return <div>O servidor falhou em responder, tente recarregar a página</div>;
  }

  const filteredData = data ? data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())) : [];
  const genreFilter = data ? data.filter(item => item.genre === filter): [];
  return (
    <div className='app'>
      <SearchBar onSearch={setSearch} onChange={genreFilter} setFilter={setFilter}/>
      {data ? filteredData.map((item, index) => (
      <div key={index} className='card'>
        <section className='text-card'>
        <h2>{item.title}</h2>
        <p>{item.genre}</p>
        </section>
        <img src={item.thumbnail} alt={item.title} className='image' />
      </div>
    )) : <p> Loader... </p>}
    </div>
    
  );
}

export default App;
