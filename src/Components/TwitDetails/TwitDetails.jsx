import React, { useEffect } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import TweetCard from '../HomeSection/TweetCard';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findTwitsById } from '../../Store/Twit/Action';

const TwitDetails = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1)
  const dispatch = useDispatch();
  const { id } = useParams();
  const { twit } = useSelector(store => store)

  console.log("twit Detail =>", twit.twit)

  useEffect(() => {
    if (id) {
      dispatch(findTwitsById(id))
    }
  }, [])
  return (
    <React.Fragment>

      <section className={` bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
        <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack}></KeyboardBackspaceIcon>
        <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>
          Tweet
        </h1>
      </section>

      <section>
        <TweetCard item={twit?.twit} />
        <Divider sx={{ margin: "2rem 0rem" }} />
      </section>
      <section>
        {twit.twit && twit.twit.replyTwits && twit.twit.replyTwits.length > 0 ? (
          twit.twit.replyTwits.map((item) => (
            <TweetCard key={item.id} item={item} />
          ))
        ) : (
          <p className="text-center text-gray-500">No replies yet.</p>
        )}
      </section>


    </React.Fragment>
  )
}

export default TwitDetails