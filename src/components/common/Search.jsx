import Button from "./Buttons";
import useVenues from "../../hooks/Store";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircleX, MapPin, SearchIcon } from "lucide-react";

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
      );
      setFilteredVenues(filtered);
    } else {
      setFilteredVenues([]);
    }
  }, [searchTerm, allSearchedVenues]);

  return (
    <>
      <div className="flex relative items-center">
        <input
          type="search"
          placeholder="E.g Sunny Shores Bungalow"
          id="sarchInput"
          aria-label="Search for venue name or description"
          aria-controls="searchResults"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-daze-white p-4 border-daze-primary-op50 border-[5px] w-full focus:outline-none focus:border-daze-primary"
        />
        <div className="absolute right-5">
          {searchTerm ? (
            <Button title="clear search results" type="tertiary" icon={<CircleX />} onClick={() => setSearchTerm("")}  />
          ) : (
            <SearchIcon />
          )}
        </div>
      </div>
      {searchTerm && (
          <ul
            className="max-h-[22rem] overflow-y-auto z-10"
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
                    className="text-sm justify-between"
                  >
                    <div className="flex gap-3 items-center w-full">
                      <img src={venue.media?.[0]?.url || ""} alt={venue.name} className="size-10" />
                      <div className="flex flex-1 flex-wrap gap-1 items-center justify-between">
                        <span className="flex-[1_1_30rem]">{venue.name}</span>
                        {venue.location.country &&
                          <span className="flex gap-1 items-center"><MapPin size={16} />{venue.location.country}</span>
                        }
                      </div>
                    </div>
                  </Link>               
                </li>
              ))
            ) : (
              <li className="font-medium p-5 py-2 bg-daze-accent-op30">No search results...</li>
            )}
          </ul>
      )}
    </>
  );
}

export default Search;
