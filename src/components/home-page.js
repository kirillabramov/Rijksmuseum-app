import React from 'react';
import Items from './items';
import Search from './search';
import Pagination from './pagination';
import Sorting from './sorting';

const HomePage = () => {
  return (
    <div className="home">
      <div className="filter">
        <Sorting />
        <Search />
      </div>
      <Items />
      <Pagination />
    </div>
  );
};

export default HomePage;
