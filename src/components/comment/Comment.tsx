import channel_pp from '../../img/channel_pp.png'
import './comment.scss';

type Props = {
  data: {
    id: string;
    kind: string;
    snippet: {
      canReply: boolean;
      channelId: string;
      isPublic: boolean;
      totalReplyCount: number;
      videoId: string;
      topLevelComment: {
        id: string;
        kind: string;
        snippet: {
          authorChannelId: string;
          authorChannelUrl: string;
          authorDisplayName: string;
          authorProfileImageUrl: string;
          publishedAt: string;
          textDisplay: string;
          textOriginal: string;
        }
      }
    }
      
    
  }
}

const Comment = (props: Props) => {
  return (
    <div className='comment'>
      <img className='avatar' src={props.data.snippet.topLevelComment.snippet.authorProfileImageUrl} />
      <div className='details'>
        <span className='name'>
          {props.data.snippet.topLevelComment.snippet.authorDisplayName} <span className='date'>{props.data.snippet.topLevelComment.snippet.publishedAt}</span>
        </span>
        <span className='text'>
          {props.data.snippet.topLevelComment.snippet.textDisplay}
        </span>
      </div>
    </div>
  )
}

export default Comment;