import Button from "./Buttons";

function Search() {
  return (
    <div className="flex mb-10">
      <input
        type="search"
        placeholder="E.g Sunny Shores Bungalow"
        id="sarchInput"
        aria-label="Search for venue name"
        aria-controls="searchResults"
        onChange=""
        className="bg-daze-white p-4 border-daze-primary-op50 border-[5px] border-r-0 w-full focus:outline-none focus:border-r-[5px] focus:border-daze-primary"
        />
        <Button text="Search" />
    </div>
  )
}

export default Search;