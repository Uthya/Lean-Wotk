import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

type UserHeaderWrapperProps = {
  children: ReactNode;

  [x: string]: any;
};

const UserHeaderWrapper: React.FC<UserHeaderWrapperProps> = ({
  children,
  ...rest
}) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: "#F7F9F8",
        paddingTop: { xs: 14, sm: 15.2 },
        '& .mainContent': {
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          width: { xs: '100%', lg: 'calc(100% - 200px)' },//////
          transition: 'all 0.5s ease',
          ml: { lg: '200px' },////
        },
        '&.appMainFixedFooter': {
          pb: { xs: 12, xl: 14.5 },
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default UserHeaderWrapper;
