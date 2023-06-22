
import './App.css';
import React, { useEffect, useState } from 'react';


function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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
  return (
    <div>
       {data ? data.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <p>{item.genre}</p>
          <img src={item.thumbnail} alt={item.title} />
        </div>
      )) : 'loading...'}
    </div>
  );
}

export default App;
