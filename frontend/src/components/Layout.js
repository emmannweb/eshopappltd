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
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconMui from "./Icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogOutUserMutation } from "../redux/slices/userApiSlice";
import { logout } from "../redux/slices/authSlices";
import { toast } from "react-toastify";

const drawerWidth = 240;

function Layout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [logOutUser] = useLogOutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const { pathname } = useLocation();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // dashboard links
  const navLinks = [
    userInfo &&
      userInfo.role === 0 && {
        text: "Dashboard",
        path: "/user/dashboard",
        icon: "Dashboard",
      },
    userInfo &&
      userInfo.role === 0 && {
        text: "My Orders",
        path: "/user/orders",
        icon: "ShoppingCart",
      },
    userInfo &&
      userInfo.role === 1 && {
        text: "Dashboard",
        path: "/admin/dashboard",
        icon: "Dashboard",
      },
    userInfo &&
      userInfo.role === 1 && {
        text: "Orders",
        path: "/admin/orders",
        icon: "ShoppingCart",
      },
    userInfo &&
      userInfo.role === 1 && {
        text: "Products",
        path: "/admin/products",
        icon: "ListAlt",
      },
    userInfo &&
      userInfo.role === 1 && {
        text: "Categories",
        path: "/admin/categories",
        icon: "Category",
      },
  ];

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

  const drawer = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box>
        <Toolbar></Toolbar>
        <Divider />
        <List>
          {navLinks.map((navLink, id) => {
            const isActive =
              navLink?.path !== "/" ? pathname.startsWith(navLink?.path) : "";
            if (navLink) {
              return (
                <ListItem key={id} disablePadding>
                  <ListItemButton
                    button="true"
                    component={Link}
                    to={navLink?.path}
                    sx={{ bgcolor: isActive ? "#1976d252" : "" }}
                  >
                    <ListItemIcon>
                      <IconMui iconName={navLink?.icon} />
                    </ListItemIcon>
                    <ListItemText primary={navLink?.text} />
                  </ListItemButton>
                </ListItem>
              );
            }
          })}
        </List>
      </Box>

      <Box>
        <ListItem disablePadding>
          <ListItemButton button="true" onClick={logoutHandler}>
            <ListItemIcon>
              <IconMui iconName="Login" />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </ListItem>
      </Box>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", background: "#f1f5f9", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "oklch(0.218022 0.040901 233.565)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: "100%!important",
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

export default Layout;
