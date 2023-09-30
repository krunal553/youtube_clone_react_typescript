import React, { useContext } from 'react'
import { AppContext } from '../../context/AppProvider';

type Props = {}

const Playlist = (props: Props) => {
    
    const { searchQuery } = useContext(AppContext);

    return (
        <div style={{color:'white'}}>Search: {searchQuery}</div>
    )
}

export default Playlist