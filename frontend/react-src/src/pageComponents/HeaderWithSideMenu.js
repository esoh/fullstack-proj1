import React from 'react';
import StyledAppBar from './StyledAppBar';
import StyledPersistentDrawer from './StyledPersistentDrawer';

export default function HeaderWithSideMenu(props){
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <>
      <StyledAppBar
        appName={props.appName}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
      />
      <StyledPersistentDrawer
        handleDrawerClose={handleDrawerClose}
        drawerItems={props.drawerItems}
        open={open}
      />
    </>
  )
};
