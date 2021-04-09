import React, { FC, ReactNode } from "react";
import GlobalStyles from "../assets/styles/globals";
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from "../components/Footer";

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => (
    <>  
        <Helmet>
            <script src="https://www.google.com/recaptcha/api.js" async defer />
        </Helmet>
        <ToastContainer />
        <GlobalStyles />
        {children}
        <Footer/>
    </>
)

type LayoutProps = {
    children: ReactNode,
}

export default Layout;