import styled from 'styled-components'
import { space, layout, color, typography } from 'styled-system'

import featherTheme from './featherTheme'
import materialTheme from './materialTheme'

const createThemedIcons = (themeName, iconPack) =>
  Object.keys(iconPack).reduce((acc, iconName) => {
    const StyledIcon = iconPack[iconName]
    const icon = styled(StyledIcon)`
      ${space};
      ${color};
      ${typography};
      ${layout};
    `
    return { ...acc, [`${themeName}${iconName}`]: icon }
  }, {})

const iconThemes = {
  ...createThemedIcons('feather', featherTheme),
  ...createThemedIcons('material', materialTheme),
}

export default iconThemes
