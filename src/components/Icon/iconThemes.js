import featherTheme from './featherTheme'
import materialTheme from './materialTheme'

const createThemedIcons = (themeName, iconPack) =>
  Object.keys(iconPack).reduce((acc, iconName) => {
    const Icon = iconPack[iconName]
    return { ...acc, [`${themeName}${iconName}`]: Icon }
  }, {})

const iconThemes = {
  ...createThemedIcons('feather', featherTheme),
  ...createThemedIcons('material', materialTheme),
}

export default iconThemes
