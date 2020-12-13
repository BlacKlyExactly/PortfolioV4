import React, { FC, ReactNode } from "react";
import GlobalStyles from "../assets/styles/globals";

import Footer from "../components/Footer";

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => (
    <>
        <GlobalStyles />
        {children}
        <Footer/>
    </>
)

type LayoutProps = {
    children: ReactNode,
}

export default Layout;