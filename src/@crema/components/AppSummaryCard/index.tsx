import React, {  ReactNode } from 'react';
import Card from '@mui/material/Card';
import { Box, CardHeader } from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';
import Link from '@mui/material/Link';
import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';

type AppCardProps = {
  title?: string | ReactNode;
  titleStyle?: any;
  contentStyle?: any;
  headerStyle?: any;
  action?: ReactNode | string;
  actionStyle?: any;
  footer?: any;
  footerPosition?: string;
  footerStyle?: any;
  children: ReactNode;

  sxStyle?: any;
  [x: string]: any;
};

const AppSummaryCard: React.FC<AppCardProps> = ({
  sxStyle,
  title = '',
  titleStyle,
  headerStyle,
  contentStyle,
  action,
  actionStyle,
  footer,
  footerPosition = 'left',
  footerStyle,
  children,
  ...rest
}) => {
  console.log(rest);
  
  return (
    <Card
      sx={{ display: 'flex', flexDirection: 'column',borderRadius:"0px",background:"#ECF1EF",boxShadow:"none" }}

    >
      {title ? (
        <CardHeader
          sx={{
            px: 0,
            pb: 0,
            '& .MuiCardHeader-action': {
              marginTop: 0,
              marginRight: 0,
            },
            '& .MuiCardHeader-content': {
            },
            ...headerStyle,
          }}
          title={       
              <Box
                component='h3'
                sx={{
                  color: '#000',
                  fontWeight: Fonts.SEMI_BOLD,
                  fontSize: "22px",
                 
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                  lineHeight:"22.6px",
                  ...titleStyle,
                }}
              >
                {title}
              </Box>
            
          }
          
          action={
            typeof action === 'object' ? (
              action
            ) : (
              <span {...actionStyle}>
                <Link
                  href='#'
                  color='secondary'
                  underline='none'
                  sx={{
                    fontSize: 14,
                    fontWeight: Fonts.MEDIUM,
                  }}
                >
                  {action}
                </Link>
              </span>
            )
          }
        />
      ) : null}
      <CardContent
        sx={{
          height: '100%',
          px: 0,
          '&:last-of-type': {
            pb: 4,
          },
          ...contentStyle,
        }}
      >
        {children}
      </CardContent>
   
    </Card>
  );
};

export default AppSummaryCard;
