import React, { useState } from 'react';
import { IconButton, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppNotificationContent from './AppNotificationContent';
import AppTooltip from '../AppTooltip';
import { alpha } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

type AppNotificationsProps = {
  drawerPosition?: 'left' | 'top' | 'right' | 'bottom';
  tooltipPosition?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  isMenu?: boolean;
  sxNotificationContentStyle?: SxProps<Theme>;
};

const AppNotifications: React.FC<AppNotificationsProps> = ({
  drawerPosition = 'right',
  tooltipPosition = 'bottom',
  isMenu = false,
  sxNotificationContentStyle = {},
}) => {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <>
      {isMenu ? (
        <Box component='span' onClick={() => setShowNotification(true)}>
          Message
        </Box>
      ) : (
        <AppTooltip title='Dark Mode' placement={tooltipPosition}>
          <IconButton
            className='icon-btn'
            sx={{
              borderRadius: '0%',
              width: 30,
              height: 30,
              color: (theme) => theme.palette.text.secondary,
              backgroundColor: "#F7F9F8",
              border: 1,
              borderColor: 'transparent',
              '&:hover, &:focus': {
                color: (theme) => theme.palette.text.primary,
                backgroundColor: (theme) =>
                  alpha(theme.palette.background.default, 0.9),
                borderColor: (theme) =>
                  alpha(theme.palette.text.secondary, 0.25),
              },
            }}
            // onClick={() => setShowNotification(true)}
            size='large'
          >
            <DarkModeOutlinedIcon className='icon'/>
            </IconButton>
        </AppTooltip>
      )}

      <Drawer
        anchor={drawerPosition}
        open={showNotification}
        onClose={() => setShowNotification(false)}
      >
        <AppNotificationContent
          sxStyle={sxNotificationContentStyle}
          onClose={() => setShowNotification(false)}
        />
      </Drawer>
    </>
  );
};

export default AppNotifications;
