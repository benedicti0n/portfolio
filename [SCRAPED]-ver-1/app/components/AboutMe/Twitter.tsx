import { LuSend } from 'react-icons/lu'
import Heading from '../Heading'
import FollowButton from '~/ui/FollowButton'

const Twitter = () => {
  return (
    <div className='w-full'>
      <Heading heading='Twitter' color='#bbd0ff' icon='' />
      <FollowButton color='#cd9777' text='Follow'>
        <LuSend className='h-4 w-4' />
      </FollowButton>
    </div>
  )
}

export default Twitter