import React, { ReactNode } from 'react';
import Grid from '@mui/material/Grid';
import { Theme, useMediaQuery } from '@mui/material';

type AppGridContainerProps = {
  children: ReactNode;

  [x: string]: any;
};

const AppGridContainer: React.FC<AppGridContainerProps> = ({
  children,
  ...others
}) => {
  const isMDDown = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );
  console.log(isMDDown);
  
  return (
    <Grid mb={3} mt={2} mr={0} container  {...others}>
      {children}
    </Grid>
  );
};

export default AppGridContainer;
