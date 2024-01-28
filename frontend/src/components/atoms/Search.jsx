"use client";
import { ChangeEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="relative hidden lg:block rounded-lg border border-[#636488] min-w-[MIN(50%,406px)] font-light text-[#636488]">
      <input
        className="pl-8 px-4 rounded-lg py-2 w-full placeholder:text-[#636488]"
        placeholder="Search dashboard"
        type="text"
        value={search}
        onChange={handleSearch}
      />
      {!search && (
        <FaSearch
          color={"#636488"}
          className="text-sm absolute top-[50%] opacity-40 -translate-y-[50%] left-2 text-[#636488]"
        />
      )}
    </div>
  );
};

export default Search;
