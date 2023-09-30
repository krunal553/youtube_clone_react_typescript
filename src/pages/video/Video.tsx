import React, { useEffect, useState } from 'react'
import './video.scss'
import TestVideo from '../../img/video.mp4'
import channel_pp from '../../img/default.jpg'
import Card from '../../components/card/Card'
import { AddTaskOutlined, ReplyOutlined, ThumbDownAltOutlined, ThumbDownOffAltOutlined, ThumbUpOutlined } from '@mui/icons-material/';

import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Comments from '../../components/comments/Comments'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/youtube'

type Props = {}



type videoDetailType = {
  id: string;
  kind: string;
  snippet: {
    categoryId: string;
    channelId: string;
    channelTitle: string;
    defaultAudioLanguage: string;
    defaultLanguage: string;
    description: string;
    liveBroadcastContent: string;
    publishedAt: string;
    title: string;

  };
  statistics: {
    commentCount: string;
    favoriteCount: string;
    likeCount: string;
    viewCount: string;
  }
}

const Video = (props: Props) => {

  const [videoDetail, setVideoDetail] = useState<videoDetailType | null>(null);

  const [videos, setVideos] = useState([])

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data) => { setVideoDetail(data.items[0])});

    fetchFromAPI(`search?part=snippet&relatedVideoId=${id}&type=video`)
    .then((data) => setVideos(data.items));


  }, [id]);


  return (
    <div className='video'>
      <div className='content'>
        <div className='video-wrapper'>
          <ReactPlayer 
            className='react-player' 
            url={`https://www.youtube.com/watch?v=${id}`} 
            controls
            width='100%'
            height={720}
          />
        </div>
        <div className='title'>{videoDetail?.snippet.title}</div>
        <div className='details'>
          <div className='info'>{videoDetail?.statistics.viewCount} views . {videoDetail?.snippet.publishedAt.slice(0, 10)}</div>
          <div className='buttons'>
            <button>
              <ThumbUpOutlinedIcon/> 
              {videoDetail?.statistics.likeCount}
            </button>
            <button>
              <ThumbDownAltOutlinedIcon /> 
              Dislike
            </button>
            <button>
              <ReplyOutlinedIcon />
               Share
            </button>
            <button>
              <AddTaskOutlinedIcon /> 
              Save
            </button>
          </div>
        </div>
        <hr />
        <div className='channel'>
          <div className='channel-info'>
          <Link to={`channels/${videoDetail?.snippet.channelId}`} style={{ textDecoration: "none" }}>
            <img className='image' src={channel_pp}/>
          </Link>
            <div className='channel-details'>
            <Link to={`channels/${videoDetail?.snippet.channelId}`} style={{ textDecoration: "none" }}>
              <div className='channel-name'>{videoDetail?.snippet.channelTitle}</div>
            </Link>
              <div className='channel-counter'>200K subscribers</div>
              <div className='desc'>{videoDetail?.snippet.description.slice(0, 90)} <strong>more...</strong></div>
            </div>
          </div>
          <button className='subscribe'>SUBSCRIBE</button>
        </div>
        <hr/>
        <Comments/>
      </div>
      <div className='recommendations'>
        {videos.map((item, idx) => (
        <>
          <Card data={item} key={idx}/>
          {/* {item.id.videoId && <Card/>} */}
          {/* {item.id.channelId && <ChannelCard/>} */}
        </>
      ))}
      </div>
    </div>
    // <></>
  )
}

export default Video