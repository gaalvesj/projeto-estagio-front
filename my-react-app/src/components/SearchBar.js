import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [search, setSearch] = useState('');
  
    const handleSearchChange = (event) => {
      setSearch(event.target.value);
      onSearch(event.target.value);
    };
  
    return (
        <div className='searchBar'>
      <input type="text" value={search} onChange={handleSearchChange} placeholder="Buscar por título..." />
         </div>
    );
  }


  export default SearchBar