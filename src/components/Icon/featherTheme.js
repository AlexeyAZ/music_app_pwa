import { Play } from 'styled-icons/feather/Play'
import { Pause } from 'styled-icons/feather/Pause'
import { Rewind } from 'styled-icons/feather/Rewind'
import { FastForward } from 'styled-icons/feather/FastForward'
import { SkipBack } from 'styled-icons/feather/SkipBack'
import { SkipForward } from 'styled-icons/feather/SkipForward'
import { Spinner2 } from 'styled-icons/evil/Spinner2'

const featherTheme = {
  Play,
  Pause,
  FastRewind: Rewind,
  FastNext: FastForward,
  SkipPrevious: SkipBack,
  SkipNext: SkipForward,
  Spinner: Spinner2,
}

export default featherTheme
