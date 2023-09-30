// // Channel.tsx

// import React, { useState } from 'react';
// import './channel.scss';

// const Channel = () => {
// const [activeNavItem, setActiveNavItem] = useState('videos');

// const handleNavItemClick = (item: string) => {
//   setActiveNavItem(item);
// };

//   return (
//     <div className="channel-page">
//       <header className="channel-header">
//         <nav className="channel-nav">
//           <ul>
//             <li className={activeNavItem === 'home' ? 'active' : ''}>
//               <a href="#" onClick={() => handleNavItemClick('home')}>Home</a>
//             </li>
//             <li className={activeNavItem === 'videos' ? 'active' : ''}>
//               <a href="#" onClick={() => handleNavItemClick('videos')}>Videos</a>
//             </li>
//             <li className={activeNavItem === 'playlists' ? 'active' : ''}>
//               <a href="#" onClick={() => handleNavItemClick('playlists')}>Playlists</a>
//             </li>
//             <li className={activeNavItem === 'channels' ? 'active' : ''}>
//               <a href="#" onClick={() => handleNavItemClick('channels')}>Channels</a>
//             </li>
//             {/* Add more navigation items as needed */}
//           </ul>
//         </nav>
//       </header>
//       {/* ... rest of the component */}
//     </div>
//   );
// };

// export default Channel;

import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../../utils/fetchFromAPI';
import { useParams } from 'react-router-dom';
import channel_bg from '../../img/video_img.png'
import channel_pp from '../../img/default.jpg'
import './channel.scss'
import Card from '../../components/card/Card';

type Props = {}
type channelType = {
  kind: string;
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      }
      medium: {
        url: string;
        width: number;
        height: number;
      }
      high: {
        url: string;
        width: number;
        height: number;
      }
    }
    localized: {
      title: string;
      description: string;
    }
  }
  contentDetails: {
    relatedPlaylists: {
      likes: string;
      uploads: string;
    }
  }
  statistics: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  }
  brandingSettings: {
    channel: {
      title: string;
      description: string;
      keywords: string;
      unsubscribedTrailer: string;
    }
    image: {
      bannerExternalUrl: string;
    }
  }
}

function Channel(props: Props) {

  const { id } = useParams();
  const [channelDetails, setChannelDetails] = useState<channelType | null>(null)
  const [activeNavItem, setActiveNavItem] = useState('videos');

  const handleNavItemClick = (item: string) => {
    setActiveNavItem(item);
  };

  const [videos, setVideos] = useState([])


  
  
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet,statistics&id=${id}`)
    .then((data) => { setChannelDetails(data.items[0]) });
    
    fetchFromAPI(`search?part=snippet,id&channelId=${id}&order=date&type=video`)
    .then((data) => setVideos(data.items));
  }, [id]);


  return (
    <div className='channel'>
      <div className="channel-details">
        <div className="channel-banner">
          <img src={channelDetails?.brandingSettings.image.bannerExternalUrl} alt="" />
        </div>
        <div className="channel-user">
          <div className="user-details">
            <img src={channelDetails?.snippet.thumbnails.medium.url} alt="" />
            <div className="details">
              <span className="name">{channelDetails?.snippet.title}</span>
              <div className="stats">
                <span className="username">{channelDetails?.snippet.customUrl}</span>
                <span className="subs">{channelDetails?.statistics.subscriberCount} subscribers</span>
                <span className="videos">{channelDetails?.statistics.videoCount} videos</span>
              </div>
            </div>
          </div>
          <button>SUBSCRIBE</button>
        </div>
        <div className="content-details">
          <header className="channel-header">
            <nav className="channel-nav">
              <ul>
                <li className={activeNavItem === 'home' ? 'active' : ''}>
                  <a href="#" onClick={() => handleNavItemClick('home')}>Home</a>
                </li>
                <li className={activeNavItem === 'videos' ? 'active' : ''}>
                  <a href="#" onClick={() => handleNavItemClick('videos')}>Videos</a>
                </li>
                <li className={activeNavItem === 'playlists' ? 'active' : ''}>
                  <a href="#" onClick={() => handleNavItemClick('playlists')}>Playlists</a>
                </li>
                <li className={activeNavItem === 'channels' ? 'active' : ''}>
                  <a href="#" onClick={() => handleNavItemClick('channels')}>Channels</a>
                </li>
                {/* Add more navigation items as needed */}
              </ul>
            </nav>
          </header>

          { activeNavItem === 'videos' && <div className="videos">
          {videos.map((item, idx) => (
        <>
          <Card data={item} key={idx}/>
          {/* {item.id.videoId && <Card/>} */}
          {/* {item.id.channelId && <ChannelCard/>} */}
        </>
      ))}
          </div>}

        </div>
      </div>
    </div>
  )
}

export default Channel