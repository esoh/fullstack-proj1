import React from 'react';
import StyledAppBar from './StyledAppBar';
import StyledPersistentDrawer from './StyledPersistentDrawer';

export default function HeaderWithSideMenu(props){
  return (
    <>
      <StyledAppBar
        appName={props.appName}
        handleDrawerOpen={props.handleDrawerOpen}
        open={props.open}
      />
      <StyledPersistentDrawer
        handleDrawerClose={props.handleDrawerClose}
        drawerItems={props.drawerItems}
        open={props.open}
      />
    </>
  )
};
