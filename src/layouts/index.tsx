import React, { FC, ReactNode } from "react";
import GlobalStyles from "../assets/styles/globals";

import Navigation from "../components/Navigation";

type LayoutProps = {
  children: ReactNode,
}

const Layout: FC = ({ children }: LayoutProps) => (
  <>
    <GlobalStyles />
    <Navigation/>
    {children}
  </>
)

export default Layout;