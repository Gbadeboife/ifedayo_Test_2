import React, { memo } from 'react';

import { areEqual } from 'utils/equalityChecks';

import { SideBar } from 'Components/SideBar';
import { navItems } from 'Utils/navItems';
import { useUser } from 'context/User';

interface Props {
  sideBarDesktop: boolean;
  sideBarMobile: boolean;
  toggleSideBar: () => void;
  pathname: string;
}

const SideBarContainer = ({ sideBarDesktop, sideBarMobile, toggleSideBar, pathname }: Props) => {
  const user = useUser();

  const { companies } = user;

  return (
    <SideBar
      sideBarDesktop={sideBarDesktop}
      sideBarMobile={sideBarMobile}
      toggleSideBar={toggleSideBar}
      navItems={navItems}
      pathname={pathname}
      companyName={companies?.[0]?.name}
    />
  );
};
const SideBarContainerMemo = memo(SideBarContainer, areEqual);

export { SideBarContainerMemo as SideBarContainer };
