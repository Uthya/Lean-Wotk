import React, { ReactNode } from 'react';
import SidebarBGWrapper from './SidebarBGWrapper';
import SidebarWrapper from './SidebarWrapper';

type MainSidebarProps = {
  children: ReactNode;
};

const MainSidebar: React.FC<MainSidebarProps> = ({ children }) => {
  return (
    <SidebarWrapper className='app-sidebar' sx={{border:0}}>
      <SidebarBGWrapper>{children}</SidebarBGWrapper>
    </SidebarWrapper>
  );
};

export default MainSidebar;
