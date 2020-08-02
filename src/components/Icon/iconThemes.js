import defaultTheme from './defaultTheme'
import featherTheme from './featherTheme'
import materialTheme from './materialTheme'

const createThemedIcons = (themeName, iconPack) => {
  const fullIconPack = { ...defaultTheme, ...iconPack }
  return Object.keys(fullIconPack).reduce((acc, iconName) => {
    const Icon = fullIconPack[iconName]
    return { ...acc, [`${themeName}${iconName}`]: Icon }
  }, {})
}

const iconThemes = {
  ...createThemedIcons('feather', featherTheme),
  ...createThemedIcons('material', materialTheme),
}

export default iconThemes
