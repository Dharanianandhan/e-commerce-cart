

import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState}from 'react';
export default function Search(){
    const navigate=useNavigate();
    const location=useLocation();
    const [keyword,setKeyword]=useState("")

    const searchHandler=(e)=>{
        e.preventDefault();
        navigate(`/search/${keyword}`);
    }

    const clearKeyword=()=>{
      setKeyword("");
    }
    useEffect(()=>{
      if(location.pathname==='/'){
        clearKeyword();
      }
    },[location])
    return (
    <form onSubmit={searchHandler}>
        <div className="input-group">
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Enter Product Name ..."
            onChange={(e)=>{setKeyword(e.target.value)}}
            value={keyword}
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn" type="submit" aria-label="Search">
              <svg className="search-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 001.48-5.34C15.3 5.11 12.19 2 8.5 2S1.7 5.11 1.7 8.39 4.81 14.78 8.5 14.78c1.61 0 3.09-.59 4.22-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-7 0C5.01 14 2.7 11.69 2.7 8.89S5.01 3.78 8.5 3.78s5.8 2.31 5.8 5.11S11.99 14 8.5 14z"/>
              </svg>
            </button>
          </div>
          </div>
          </form>
        
    )
}