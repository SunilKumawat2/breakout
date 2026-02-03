import React from "react";
import Image from "next/image";
import search from "@/images/search.svg";
import selectDrop from "@/images/select-drop.svg";

const Sidebar = ({
  handleSearchChange,
  handleSortChange,
  totalResources,
  searchRef,
}) => {
  return (
    <div>
      <h3 className="sec-head medium-20 text-center">Find Blog</h3>
      <div className="form-group search-group style-2 mt-4">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search..."
            onKeyDown={handleSearchChange}
            ref={searchRef}
          />
          <Image src={search} alt="search" />
        </div>
      </div>
      <p className="para text-center mb-0">{totalResources} blog found!</p>

      <h3 className="sec-head medium-20 text-center mt-3">Filter</h3>
      <div className="form-group search-group style-2 mt-4">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search..."
            onKeyDown={handleSearchChange}
            ref={searchRef}
          />
          <Image src={search} alt="search" />
        </div>
      </div>
      <p className="para text-center mb-0">{totalResources} blog found!</p>
      {/* <div className="form-group mt-5 style-2">
        <div className="input-group">
          <p className="sec-head book-20">
            <span>Filter</span>
          </p>
        </div>
      </div> */}
      <h3 className="sec-head mt-5 medium-20 text-center">Sort By</h3>
      <div className="form-group mt-4 style-2">
        <div className="input-group">
          {/* <p className="sec-head book-20">
            <span>Sort by</span>
          </p> */}
          <div className="select-group">
            <select name="sort" id="sort" onChange={handleSortChange}>
              {/* <option value="">Sort by</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Most Popular</option> */}
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
            <Image src={selectDrop} alt="select" />
          </div>
        </div>
      </div>
      {/* <div className="form-group mt-4 style-2">
        <div className="input-group">
          <p className="sec-head book-20">
            <span>Resource Type</span>
          </p>
          <div className="select-group">
            <select name="" id="">
              <option value="">Select Type</option>
              <option value="">All</option>
              <option value="">All</option>
              <option value="">All</option>
              <option value="">All</option>
            </select>
            <Image src={selectDrop} alt="select" />
          </div>
        </div>
      </div>
      <div className="form-group mt-4 style-2">
        <div className="input-group">
          <p className="sec-head book-20">
            <span>Looking For?</span>
          </p>
          <div className="select-group">
            <select name="" id="">
              <option value="">Select Option</option>
              <option value="">All</option>
              <option value="">All</option>
              <option value="">All</option>
              <option value="">All</option>
            </select>
            <Image src={selectDrop} alt="select" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
