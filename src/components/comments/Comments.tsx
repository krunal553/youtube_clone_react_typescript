import { useParams } from 'react-router-dom';
import channel_pp from '../../img/default.jpg'
import Comment from '../comment/Comment';
import './comments.scss';
import { useEffect, useState } from 'react';
import { fetchFromAPI } from '../../utils/fetchFromAPI';

type Props = {}


const Comments = (props: Props) => {

  const { id } = useParams();
  const [comments, setComments] = useState([])

  useEffect(() => {

    fetchFromAPI(`commentThreads?part=snippet&videoId=${id}`)
    .then((data) => {setComments(data.items); console.log(data.items)});

  }, [id]);

  return (
    <div className='comments'>

      <div className='new-comment'>
        <img className='avatar' src={channel_pp}/>
        <input placeholder='Add a comment...'/>
      </div>

      {comments.map((item, idx) => (
        <>
          <Comment data={item} key={idx}/>
          {/* {item.id.videoId && <Card/>} */}
          {/* {item.id.channelId && <ChannelCard/>} */}
        </>
      ))}
    </div>
  )
}

export default Comments