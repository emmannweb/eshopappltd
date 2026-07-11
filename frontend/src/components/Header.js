import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IconShoppingCard from "./IconShoppingCard";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CartSidebar from "./CartSidebar";
import { logout } from "../redux/slices/authSlices";
import { useDispatch, useSelector } from "react-redux";
import { useLogOutUserMutation } from "../redux/slices/userApiSlice";
import { toast } from "react-toastify";

const drawerWidth = 240;

function Header(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [logOutUser] = useLogOutUserMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = [
    { page: "Home", link: "/" },
    { page: "Register", link: "/register" },
    !userInfo && { page: "Login", link: "/login" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  //manage cart sidebar
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  //manage cart sidebar

  // handle dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // handle dropdown menu

  //mobile drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        E-Shop APP
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, id) => (
          <ListItem key={id} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              button="true"
              component="a"
              to={`${item?.link}`}
            >
              <ListItemText primary={item?.page} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  //logout
  const logoutHandler = async () => {
    try {
      await logOutUser();
      dispatch(logout());
      toast("Log out successfully!");
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CartSidebar state={state} toggleDrawer={toggleDrawer} />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          elevation={
            location?.pathname !== "/" &&
            location?.pathname !== "/login" &&
            location?.pathname !== "/register"
              ? 3
              : 0
          }
          position="absolute"
          sx={{
            backgroundColor:
              location?.pathname === "/checkout" ||
              location?.pathname?.startsWith("/product/")
                ? "#5b83c0"
                : "#ffffff10",
            backdropFilter: "blur(12px)",
          }}
        >
          <Container>
            <Toolbar sx={{ pl: "0!important" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  textTransform: "uppercase",
                }}
              >
                E-Shop APP
              </Typography>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navItems.map((item, id) => (
                  <Button
                    key={id}
                    sx={{ color: "#fff" }}
                    startIcon={
                      <LockIcon
                        sx={{
                          mr: 0,
                          display: item?.link === "/login" ? "block" : "none",
                        }}
                      />
                    }
                  >
                    <Link
                      style={{ textDecoration: "none", color: "#fff" }}
                      to={item?.link}
                    >
                      {item?.page}
                    </Link>
                  </Button>
                ))}

                <IconShoppingCard toggleDrawer={toggleDrawer} color="#ffffff" />
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar />
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/user/dashboard"
              >
                User Dashboard
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar />
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/admin/dashboard"
              >
                Admin Dashboard
              </Link>
            </MenuItem>
            <Divider />

            <MenuItem onClick={logoutHandler}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </AppBar>

        {/* mobile nav */}
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </>
  );
}

export default Header;
