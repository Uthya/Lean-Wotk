import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import AppMessages from "../../../AppMessages";
import AppNotifications from "../../../AppNotifications";

type Props = {
  toggleNavCollapsed: () => void;
};
const AppHeader = ({ toggleNavCollapsed }: Props) => {
console.log(toggleNavCollapsed);

  return (
    <AppBar
      color="inherit"
      sx={{
        boxShadow: "none",
        // borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: "background.paper",
        transition: "width 0.5s ease",
        width: "100%",
      }}
      className="app-bar"
    >
      <Toolbar
        sx={{
          boxSizing: "border-box",
          minHeight: { xs: 56, sm: 64 },
          paddingLeft: { xs: 2.5, md: 5},
          paddingRight: { xs: 2.5, md: 5, xl: 12.5 },
        }}
      >


        <Box
          sx={{
            flexGrow: 1,
          }}
        />




        <Box
          sx={{
            ml: 4,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Hidden smDown>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                marginLeft: -2,
                marginRight: -2,
              }}
            >
              <Box
                sx={{
                  px: 1.85,
                }}
              >
                <AppNotifications />
              </Box>
              <Box
                sx={{
                  px: 1.85,
                }}
              >
                <AppMessages />
              </Box>
              <Box
                sx={{
                  px: 1.85,
                }}
              >
              <label style={{fontWeight:500,fontSize:16}}>Settings</label>
                        {/* <Typography fontWeight={500} variant="body1">Settings</Typography> */}
                        {/* <Typography fontWeight={500} variant="body1">Settings</Typography> */}
          
              </Box>
            </Box>
          </Hidden>


      
          {/* <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <AppNotifications isMenu />
            </MenuItem>
            <MenuItem>
              <AppMessages isMenu />
            </MenuItem>
            <MenuItem>Setting</MenuItem>
          </Menu> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default AppHeader;
