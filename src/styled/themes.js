const baseline = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64]

const breakpoints = ['300px', '700px', '900px', '1200px']

// aliases
breakpoints.small = 300
breakpoints.medium = 700
breakpoints.large = 900
breakpoints.xlarge = 1200

breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

export { breakpoints }

export const themes = {
  light: {
    // new theme
    breakpoints,
    // fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
    fonts: {
      regular: 'OpenSans-Regular, Roboto, sans-serif',
      semiBold: 'OpenSans-SemiBold, Roboto, sans-serif',
      bold: 'OpenSans-Bold, Roboto, sans-serif'
    },
    colors: {
      // main
      none: 'none',
      white: '#fff',
      text: '#222',
      background: '#fff',
      backgroundhover: '#f4f4f4',
      backgroundsecondary: '#ededed',
      border: '#ddd',
      borderfocus: '#2675fe',
      borderhover: '#bebebe',
      // primary
      primary100: '#E9F0FD',
      primary200: '#D3E1FB',
      primary300: '#BCD2F8',
      primary400: '#A6C3F6',
      primary: '#2675fe',
      primary600: '#1A55BA',
      primary700: '#14408C',
      primary800: '#0D2A5D',
      primary900: '#07152F',
      // info
      info100: '#E7F9FF',
      info200: '#CFF3FF',
      info300: '#70EFFF',
      info400: '#4CDEFF',
      info: '#11C3FF',
      info600: '#0C98DB',
      info700: '#0872B7',
      // danger
      danger100: '#FFEDE9',
      danger200: '#FEDAD4',
      danger300: '#FEA57D',
      danger400: '#FD815D',
      danger: '#FC4828',
      danger600: '#D82A1D',
      danger700: '#B51414',
      // success
      success100: '#EDFAEB',
      success200: '#DCF5D7',
      success300: '#A7F085',
      success400: '#82E163',
      success: '#4FCE35',
      success600: '#33B126',
      success700: '#1C941A',
      // warning
      warning100: '#FFF7E5',
      warning200: '#FFF0CC',
      warning300: '#FFDA66',
      warning400: '#FFCB3F',
      warning: '#FFB200',
      warning600: '#DB9200',
      warning700: '#B77400',
      // error
      error100: '#FFEDE9',
      error200: '#FEDAD4',
      error300: '#FEA57D',
      error400: '#FD815D',
      error: '#FC4828',
      error600: '#D82A1D',
      error700: '#B51414',
      // cyan
      cyan: '#1098ad',
      cyanmid: '#3bc9db',
      cyanlight: '#c5f6fa',
      // grey
      gray1000: '#0E1B34',
      gray900: '#263248',
      gray800: '#3E495D',
      gray700: '#565F71',
      gray600: '#6E7685',
      gray: '#868D9A',
      gray400: '#9EA4AE',
      gray300: '#B7BBC2',
      gray200: '#CFD1D6',
      gray100: '#E7E8EB',
      gray50: '#F3F3F5'
    },
    radii: { none: 0, sm: 4, md: 8, lg: 12, xl: 16, rounded: '100rem' },
    space: baseline,
    shadows: {
      none: 'none',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05);',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);'
    },
    grid: {
      containerMaxWidth: {
        xs: '540px',
        sm: '720px',
        md: '960px',
        lg: '1136px',
        xl: '1236px'
      },
      gutterWidth: '16px',
      colCount: 12
    },
    fontSizes: {
      h1: '40px',
      h2: '32px',
      h3: '24px',
      h4: '16px',
      body: '16px',
      body2: '14px',
      caption: '12px'
    },
    lineHeights: {
      h1: '56px',
      h2: '40px',
      h3: '32px',
      h4: '24px',
      body: '24px',
      body2: '20px',
      caption: '16px'
    },
    // end new theme
    type: 'light',
    fontFamily: {
      default: 'OpenSans-Regular, Roboto, sans-serif',
      bold: 'Mont-Bold, Roboto, sans-serif'
    },
    fontSize: {
      tiny: '11px',
      mini: '12px',
      small: '13px',
      default: '14px',
      big: '16px',
      large: '18px'
    },
    color: {
      white: '#fff',
      whiteSecondary: 'rgba(255, 255, 255, .54)',
      default: 'rgba(0, 0, 0, .54)',
      primary: '#2675fe',
      text: 'rgba(0, 0, 0, .74)',
      secondary: 'rgba(0, 0, 0, .54)',
      placeholder: 'rgba(0, 0, 0, .34)',
      disabled: 'rgba(0, 0, 0, .04)',
      border: 'rgba(0, 0, 0, .15)',
      borderHover: 'rgba(0, 0, 0, .35)',
      elementBg: '#fff',
      elementBgSecondary: 'rgba(0,0,0, .034)',
      elementHover: 'rgba(0, 0, 0, .06)',
      danger: '#ea3d53',
      info: 'rgba(250, 120, 16, 1)',
      success: 'rgba(0, 217, 176, 1)'
    },
    palette: {
      transparent: {
        200: 'rgba(0, 0, 0, 0)',
        300: 'rgba(0, 0, 0, 0.064)',
        500: 'rgba(0, 0, 0, 0)',
        1000: 'rgba(0, 0, 0, 0.54)'
      },
      default: {
        200: 'rgba(0, 0, 0, .034)',
        300: 'rgba(0, 0, 0, .084)',
        500: 'rgba(0, 0, 0, .34)',
        1000: 'rgba(0, 0, 0, .44)'
      },
      inverted: {
        200: 'rgba(255, 255, 255, .034)',
        500: 'rgba(255, 255, 255, .34)',
        700: 'rgba(255, 255, 255, .54)',
        1000: 'rgba(255, 255, 255, 1)'
      },
      secondary: {
        200: 'rgba(0, 0, 0, .034)',
        300: 'rgba(0, 0, 0, .084)',
        500: 'rgba(0, 0, 0, .34)',
        1000: 'rgba(0, 0, 0, 1)'
      },
      primary: {
        200: 'rgba(38, 117, 254, .064)',
        500: 'rgba(38, 117, 254, .54)',
        800: 'rgba(38, 117, 254, .84)',
        900: 'rgba(38, 117, 254, .94)',
        1000: 'rgba(38, 117, 254, 1)'
      },
      danger: {
        200: '#F1E8E9',
        500: 'rgba(234, 61, 83, .54)',
        1000: 'rgba(234, 61, 83, 1)'
      },
      info: {
        200: 'rgba(250, 120, 16, .064)',
        500: 'rgba(250, 120, 16, .54)',
        1000: 'rgba(250, 120, 16, 1)'
      },
      success: {
        200: 'rgba(0, 217, 176, .64)',
        500: 'rgba(0, 217, 176, .54)',
        1000: 'rgba(0, 217, 176, 1)'
      },
      elementBgSecondary: {
        200: 'rgba(0,0,0, .014)',
        500: 'rgba(0,0,0, .024)',
        1000: 'rgba(0,0,0, .034)'
      }
    },
    avatarSize: {
      tiny: '28px',
      mini: '32px',
      small: '44px',
      default: '64px',
      large: '84px',
      big: '120px',
      huge: '154px'
    },
    imageSize: {
      mini: '124px',
      small: '200px',
      default: '300px',
      big: '450px',
      large: '600px',
      fluid: '100%'
    },
    elementSize: {
      tiny: '24px',
      mini: '32px',
      small: '40px',
      default: '48px',
      big: '56px',
      large: '64px'
    },
    borderRadius: {
      tiny: '2px',
      small: '4px',
      default: '6px',
      big: '8px',
      circular: '100%',
      rounded: '100rem'
    },
    boxShadow: {
      default: '1px 4px 8px rgba(0, 0, 0, 0.1)',
      primary: '0px 1px 4px rgba(0, 0, 0, 0.36)'
    },
    // paddingVertical: {
    //   tiny: '4px',
    //   mini: '8px',
    //   small: '12px',
    //   default: '16px',
    //   big: '18px',
    //   large: '24px',
    //   huge: '44px'
    // },
    // paddingHorizontal: {
    //   micro: '12px',
    //   tiny: '16px',
    //   mini: '18px',
    //   small: '22px',
    //   default: '24px',
    //   big: '34px',
    //   large: '44px',
    //   huge: '64px'
    // },
    // marginHorizontal: {
    //   tiny: '2px',
    //   default: '16px'
    // },
    spacing: {
      noSpacing: 0,
      tiny: 2,
      mini: 4,
      small: 6,
      default: 8,
      big: 16,
      large: 24,
      extraLarge: 32,
      huge: 38,
      extraHuge: 44
    },
    animation: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      default: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195
    }
  }
}

export const defaultTheme = 'light'
