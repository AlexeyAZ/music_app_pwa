const sizes = [0, 4, 8, 16, 32, 64, 128, 256, 512]
sizes.headerXs = sizes[5]
sizes.headerL = sizes[6]
const themeDefaults = {
  header: {
    height: ['40px'],
  },
  sizes,
  navbarHeight: [30],
  iconSizes: {
    xxs: 30,
    xs: 40,
    s: 50,
    m: 60,
    l: 70,
    xl: 80,
    xxl: 90,
  },
  shadows: {
    blockShadow: '0 1px 1px rgba(0,0,0,0.1)',
  },
}

export default themeDefaults
