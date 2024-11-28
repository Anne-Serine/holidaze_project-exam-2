import Button from "./Buttons";
import useVenues from "../../hooks/Store";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Search() {
  const allSearchedVenues = useVenues((state) => state.allVenues);
  const searchVenues = useVenues((state) => state.searchVenues);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVenues, setFilteredVenues] = useState([]);

  useEffect(() => {
    searchTerm.length > 0 && searchVenues(searchTerm);
  }, [searchVenues, searchTerm]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = allSearchedVenues.filter(
        (venue) =>
          venue.name &&
          venue.name.toLowerCase().includes(searchTerm.toLowerCase())
        // ||
        // venue.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVenues(filtered);
    } else {
      setFilteredVenues([]);
    }
  }, [searchTerm, allSearchedVenues]);

  return (
    <>
      <div className="flex">
        <input
          type="search"
          placeholder="E.g Sunny Shores Bungalow"
          id="sarchInput"
          aria-label="Search for venue name or description"
          aria-controls="searchResults"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-daze-white p-4 border-daze-primary-op50 border-[5px] border-r-0 w-full focus:outline-none focus:border-r-[5px] focus:border-daze-primary"
        />
        <Button text="Search" />
      </div>
      {searchTerm && (
        <div>
          <ul
            className=""
            aria-label="searchResult"
            aria-live="polite"
            id="searchResult"
          >
            {filteredVenues.length ? (
              filteredVenues.map((venue) => (
                <li key={venue.id} className="bg-white px-5 py-2 border rounded-sm hover:bg-daze-primary-op30">
                  <Link
                    onClick={() => {
                      setSearchTerm("");
                      setFilteredVenues([]);
                    }}
                    to={`/venue/${venue.id}`}
                    className="flex gap-3 items-center text-sm truncate max-w-[70%]"
                  >
                    <img src={venue.media?.[0]?.url || ""} alt={venue.name} className="size-10" />
                    {venue.name}
                  </Link>               
                </li>
              ))
            ) : (
              <li className="font-medium p-5 py-2 bg-daze-accent-op30">No search results...</li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default Search;
