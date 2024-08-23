import React, { useMemo } from 'react';
import { Icon, ListItemText } from '@mui/material';
import clsx from 'clsx';
import AppBadge from '../../../../AppBadge';
import AppNavLink from '../../../../AppNavLink';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import { checkPermission } from '@crema/helpers/RouteHelper';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import VerticalNavItem from './VerticalNavItem';
import { RouterConfigData } from '@crema/types/models/Apps';

type VerticalItemProps = {
  item: RouterConfigData;
  level: number;
};

const VerticalItem: React.FC<VerticalItemProps> = ({ level, item }) => {
  const { user } = useAuthUser();
  const hasPermission = useMemo(
    () => checkPermission(item.permittedRole, user.role),
    [item.permittedRole, user.role],
  );
  if (!hasPermission) {
    return null;
  }

  return (
    <VerticalNavItem
      level={level}
      button
      component={AppNavLink}
      to={item.url}
      activeClassName='active'
      exact={item.exact}
      style={{textAlign:"center",padding:"0px"}}
    >
      {item.icon && (
        <Box component='span'>
          <Icon
            sx={{
              fontSize: 18,
              display: 'block',
              ml:2,
              mb:1.4
            }}
            className={clsx('nav-item-icon', 'material-icons-outlined')}
            color='action'
          >
            {item.icon}
          </Icon>
        </Box>
      )}
      <ListItemText
        className='nav-item-content' style={{marginLeft:"-10px",marginTop:"6px"}}
        primary={<IntlMessages id={item.messageId} />}
        classes={{ primary: 'nav-item-text' }}
      />
      {item.count && (
        <Box sx={{ mr: 3.5 }} className='menu-badge'>
          <AppBadge count={item.count} color={item.color} />
        </Box>
      )}
    </VerticalNavItem>
  );
};

export default React.memo(VerticalItem);
