import Card from '../../components/card/Card';
import './home.scss';

import { fetchFromAPI } from '../../utils/fetchFromAPI';
import { useEffect, useState } from 'react';

type Props = {}


const Home = (props: Props) => {

  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => { setVideos(data.items)});


  }, [selectedCategory]);

  return (  
    <div className='home'>

      {videos.map((item, idx) => (
        <>
          <Card data={item} key={idx}/>
          {/* {item.id.videoId && <Card/>} */}
          {/* {item.id.channelId && <ChannelCard/>} */}
        </>
      ))}

    </div>
  )
}

export default Home