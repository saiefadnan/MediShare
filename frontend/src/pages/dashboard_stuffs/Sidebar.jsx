import { useContext, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
// import { StateContext } from '../../Contexts/SidebarContext';
import signoutIcon from '../../../public/assets/signout.png'
import heartIcon from '../../../public/assets/heartLogo.png'
import dashboardIcon from '../../../public/assets/dashboard.png'
import mailIcon from '../../../public/assets/mail.png'
import starsIcon from '../../../public/assets/stars.png'
import boxIcon from '../../../public/assets/box.png'
import accountsIcon from '../../../public/assets/accounts.png'

const drawerWidth = 240;

const openedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#43755c',
  color: ' #D2D2D2',
  width: drawerWidth,
});

const closedMixin = (theme) => ({
  // transform: 'translateX(-100%)',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
  // `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: '#43755c',
  color: ' #D2D2D2',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    minHeight:'100vh',
    // filter: 'invert(1)',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

const Sidebar = ({Open})=> {
  const [open,setOpen] = Open;
  // const {open, setOpen} = useContext(StateContext);
  //const [open, setOpen] = useState(false);
  const theme = useTheme();
  const handleDrawer = () => {
    setOpen(!open);
  };
  const Menu = ['DashBoard',/*'Collection'*/,'Impact Analytics'];
  const Manage = ['Accounts', "Users' Review", 'Sign out'];

  return (
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawer}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {open?<Typography sx={{marginLeft: "10px"}}>Menu</Typography>:""}
        <List>
          {Menu.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
               <Link
                to={
                  index === 0
                    ? '/admin/dashboard'
                    : index === 1
                    ? '/admin/collection'
                    : index === 2
                    ? '/admin/donation'
                    : '/admin/chat'
                }
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  {index ===0 ? <img src={dashboardIcon}/> 
                  : index ===1 ?<img src={heartIcon}/> 
                  : <img src={boxIcon}/> }
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        {open?<Typography sx={{marginLeft: "10px"}}>Manage</Typography>:""}
        <List>
          {Manage.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <Link
                to={
                  index === 0
                    ? '/admin/accounts'
                    : index === 1
                    ? '/admin/review'
                    :'/login'
                }
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  {index ===0 ? <img src={accountsIcon}/> 
                  : index ===1 ?<img src={starsIcon}/> 
                  : <img src={signoutIcon}/> }
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
  );
}

export default Sidebar;;