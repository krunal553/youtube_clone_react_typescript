import React from 'react'
import { Link } from 'react-router-dom'
import channel_pp from '../../img/default.jpg'
import video_img from '../../img/video_img.png'

import './card.scss'

interface ThumbnailInfo {
  url: string;
  width: number;
  height: number;
}

type Props = {
  data: {
    id: {
      kind: string;
      videoId: string;
    };
    kind: string;
    snippet: {
      channelId: string;
      channelTitle: string;
      description: string;
      liveBroadcastContent: string;
      publishTime: string;
      publishedAt: string;
      thumbnails: {
        default: ThumbnailInfo;
        high: ThumbnailInfo;
        medium: ThumbnailInfo;
      };
      title: string;
    };
  }
}

const Card = (props: Props) => {
  return (
    <div className='card'>
      <Link to={`/video/${props.data.id.videoId}`} style={{ textDecoration: "none" }}>
        <img className='image' src={props.data.snippet.thumbnails.medium.url} />
      </Link>
      <div className='details'>
        <img className='channel-image' src={channel_pp} />
        <div className='texts'>
          <Link to={`/video/${props.data.id.videoId}`} style={{ textDecoration: "none" }}>
            <h1 className='title'>{props.data.snippet.title.slice(0, 60)}...</h1>
          </Link>
          <Link to={`channels/${props.data.snippet.channelId}`} style={{ textDecoration: "none" }}>
            <h2 className='channel-name'>{props.data.snippet.channelTitle}</h2>
          </Link>
          <div className='info'>660,903 views . {props.data.snippet.publishedAt}</div>
        </div>
      </div>
    </div>
  )
}

export default Card