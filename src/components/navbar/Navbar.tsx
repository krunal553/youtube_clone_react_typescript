import React, { ChangeEvent, useContext } from 'react'
import './navbar.scss';

import { AppContext } from '../../context/AppProvider';

type Props = {}

const Navbar = (props: Props) => {

  const { searchQuery, setSearchQuery } = useContext(AppContext);

  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='search'>
          <input placeholder='Search' value={searchQuery} onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearchQuery(e.target.value)}/>
          {/* <SearchOutlinedIcon /> */}
        </div>
        <button>
          {/* <AccountCircleOutlinedIcon/>  */}
          SIGN IN
        </button>
      </div>
    </div>
  )
}

export default Navbar