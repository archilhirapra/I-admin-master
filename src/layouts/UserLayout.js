import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import Layout from 'src/@core/layouts/Layout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'
import HorizontalNavItems from 'src/navigation/horizontal'

// ** Component Import
// Uncomment the below line (according to the layout type) when using server-side menu
// import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems'
// import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems'

import VerticalAppBarContent from './components/vertical/AppBarContent'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'

// ** Hook Import
import {useSettings} from 'src/@core/hooks/useSettings'


// ** app logo branding
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
// import Layout from 'src/@core/layouts/Layout'


// ** MUI Imports
// import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
// import Typography from '@mui/material/Typography'
// import useMediaQuery from '@mui/material/useMediaQuery'

const UserLayout = ({children}) => {
  // ** Hooks
  const {settings, saveSettings} = useSettings()

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))


  const AppBrand = () => {
    return (
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <img src='/images/logo.png' alt='logo' width='40' height='40'/>
        <Typography variant='h6' sx={{ml: 2}}>
          SparkleUp
        </Typography>
      </Box>
    )
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      {...(settings.layout === 'horizontal'
        ? {
          // ** Navigation Items
          horizontalNavItems: HorizontalNavItems(),

          // Uncomment the below line when using server-side menu in horizontal layout and comment the above line
          // horizontalNavItems: ServerSideHorizontalNavItems(),
          // ** AppBar Content
          horizontalAppBarContent: () => (
            <HorizontalAppBarContent hidden={hidden} settings={settings} saveSettings={saveSettings}/>
          )
        }
        : {
          // ** Navigation Items
          verticalNavItems: VerticalNavItems(),

          // Uncomment the below line when using server-side menu in vertical layout and comment the above line
          // verticalNavItems: ServerSideVerticalNavItems(),
          // ** AppBar Content
          verticalAppBarContent: props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )
        })}
      // verticalNavMenuBranding={() => <AppBrand />}
      // horizontalAppMenuBranding={() => <AppBrand />}
      {...(settings.layout === 'horizontal'
        ? {horizontalAppBarBranding: () => <AppBrand/>}
        : {verticalNavMenuBranding: () => <AppBrand/>})}


      footerContent={
        () => {
          return (
            <>
              <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography sx={{mr: 2}}>
                  {`© ${new Date().getFullYear()}, Made with `}
                  <Box component='span' sx={{color: 'error.main'}}>
                    ❤️
                  </Box>
                  {` by `}
                  <Link target='_blank' href=' '>
                    Deluxe
                  </Link>
                </Typography>
              </Box>
            </>
          )
        }}
    >
      {children}

    </Layout>
  )
}

export default UserLayout
