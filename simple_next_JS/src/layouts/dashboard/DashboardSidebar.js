import { useEffect } from "react";
import PropTypes from "prop-types";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { Avatar, Box, Drawer, Typography } from "@material-ui/core";
// components
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
//
import { MHidden } from "../../components/@material-extend";
import sidebarConfig from "./SidebarConfig";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useRouter();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <NextLink href="/">
          <Box sx={{ display: "inline-flex" }}>
            <Logo />
          </Box>
        </NextLink>
      </Box>

      <Box sx={{ mb: 2, mx: 2.5 }}>
        <NextLink href="#">
          <AccountStyle>
            <Avatar
              alt="My Avatar"
              src="/static/mock-images/avatars/avatar_default.jpg"
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                displayName
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                role
              </Typography>
            </Box>
          </AccountStyle>
        </NextLink>
      </Box>

      <NavSection navConfig={sidebarConfig} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: { width: DRAWER_WIDTH, bgcolor: "background.default" },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
