import {
  MdPlayArrow,
  MdPause,
  MdFastRewind,
  MdFastForward,
  MdSkipPrevious,
  MdSkipNext,
  MdShuffle,
  MdRepeat,
  MdRepeatOne,
  MdFavorite,
} from 'react-icons/md'
import { AiOutlineLoading } from 'react-icons/ai'

const materialTheme = {
  Play: MdPlayArrow,
  Pause: MdPause,
  FastPrevious: MdFastRewind,
  FastNext: MdFastForward,
  SkipPrevious: MdSkipPrevious,
  SkipNext: MdSkipNext,
  Spinner: AiOutlineLoading,
  Shuffle: MdShuffle,
  Repeat: MdRepeat,
  RepeatOne: MdRepeatOne,
  Favorite: MdFavorite,
}

export default materialTheme
