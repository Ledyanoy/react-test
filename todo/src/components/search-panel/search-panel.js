import React from "react";
import './search-panel.css';

const SearchPanel = () => {
  const searchText = "Type here to Search";
  
  return <input placeholder={searchText} type="text" className="form-control search-input"/>;
};

export default SearchPanel;
