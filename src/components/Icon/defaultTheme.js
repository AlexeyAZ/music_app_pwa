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
  MdLibraryMusic,
  MdTrendingUp,
} from 'react-icons/md'
import { AiOutlineLoading } from 'react-icons/ai'
import { FiSearch, FiUser } from 'react-icons/fi'

const defaultTheme = {
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
  MusicLibrary: MdLibraryMusic,
  Trending: MdTrendingUp,
  Search: FiSearch,
  User: FiUser,
}

export default defaultTheme
