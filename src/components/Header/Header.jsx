import { useNavigate, NavLink } from "react-router-dom"
import { useState } from "react";

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuBookIcon from '@mui/icons-material/MenuBook';


function Header() {

    const navigate = useNavigate();

    const [auth, setAuth] = useState(true);
    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (

        <AppBar sx={{ backgroundColor: 'green', borderBottom: '2px solid black' }} position="static">
            <Container maxWidth="xl"
            >
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={auth}
                                onChange={handleChange}
                                aria-label="login switch"
                            />
                        }
                        label={auth ? 'Logout' : 'Login'}
                    />
                </FormGroup>
                <Toolbar disableGutters>
                    <MenuBookIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        onClick={() => navigate('/')}
                    >
                        Book Shop
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none', '.MuiList-root': { padding: '20px' }, } }}
                        >
                            <MenuItem onClick={() => {
                                navigate('/');
                                setAnchorElNav(null);
                            }}>
                                <Typography sx={{ textAlign: 'center' }}>Home</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                navigate('/about');
                                setAnchorElNav(null);
                                }}>
                                <Typography sx={{ textAlign: 'center' }}>About</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                navigate('/contact');
                                setAnchorElNav(null);
                                }}>
                                <Typography sx={{ textAlign: 'center' }}>Contact Us</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <MenuBookIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        onClick={() => navigate('/')}
                    >
                        Book Store
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={() => navigate('/')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Home
                        </Button>
                        <Button
                            onClick={() => navigate('/about')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            About
                        </Button>
                        <Button
                            onClick={() => navigate('/contact')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Contact Us
                        </Button>
                    </Box>
                    {auth ?
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{
                                    mt: '45px',
                                    '.MuiList-root': {
                                        padding: '20px',
                                    },
                                }}

                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={() => {
                                    navigate('/profile');
                                    setAnchorElUser(null);
                                    }}>
                                    <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    navigate('/cart');
                                    setAnchorElUser(null);
                                    }}>
                                    <Typography sx={{ textAlign: 'center' }}>Cart</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    navigate('/orders');
                                    setAnchorElUser(null);
                                }}>
                                    <Typography sx={{ textAlign: 'center' }}>Orders</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        :
                        <NavLink to="/login">Log in</NavLink>
                    }
                </Toolbar>
            </Container>
        </AppBar>

    )
}

export default Header