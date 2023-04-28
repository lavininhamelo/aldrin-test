function SearchInput(props) {
  return (
    <div className="container__search">
      <input
        type="text"
        placeholder="Search coins"
        value={props.searchTerm}
        onChange={props.handleSearchTermChange}
        data-testid="search-input"
      />
    </div>
  );
}

export default SearchInput;