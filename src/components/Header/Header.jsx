import { useNavigate, NavLink } from "react-router-dom"
import { useEffect, useState } from "react";
import ThemeSwitch from "../MUIThemeSwitch/ThemeSwitch";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";


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
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from "@mui/material/Badge";


function Header() {

    const navigate = useNavigate();

    const { isDarkMode, toggleTheme } = useTheme();
    const { isAuthenticated, logout } = useAuth();
    const {getUserCart , cartItems} = useCart();

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    useEffect(() => {
            getUserCart();
    }, [isAuthenticated])

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

        <AppBar sx={{ backgroundColor: 'green', borderBottom: '2px solid black', color: isDarkMode ? 'black' : 'white' }} position="static">
            <Container maxWidth="xl"
            >
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
                       <MenuBookIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={() => navigate('/')}
                            sx={{ my: 2, display: 'block', color: isDarkMode ? 'black' : 'white' }}
                        >
                            Home
                        </Button>
                        <Button
                            onClick={() => navigate('/about')}
                            sx={{ my: 2, display: 'block', color: isDarkMode ? 'black' : 'white' }}
                        >
                            About
                        </Button>
                        <Button
                            onClick={() => navigate('/contact')}
                            sx={{ my: 2, display: 'block', color: isDarkMode ? 'black' : 'white' }}
                        >
                            Contact Us
                        </Button>
                    </Box>

                    {isAuthenticated ?
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="User" sx={{ bgcolor: "white", border: "2px solid black" }}>
                                        <PersonIcon sx={{ color: "gray" }} />
                                    </Avatar>
                                </IconButton>
                                {
                                    cartItems?.length > 0 && <IconButton onClick={() => navigate('/cart')} aria-label="cart">
                                        <Badge badgeContent={cartItems?.length} sx={{ color: "white" }}>
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </IconButton>

                                }
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
                                <MenuItem onClick={() => {
                                    logout();
                                    setAnchorElUser(null);
                                    navigate('/');
                                }}>
                                    <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        :
                        <NavLink to="/login">Log in</NavLink>
                    }
                    <ThemeSwitch onClick={toggleTheme} />
                </Toolbar>
            </Container>
        </AppBar>

    )
}

export default Header