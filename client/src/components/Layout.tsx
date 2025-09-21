import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-light">
      <Header />
      <main className="flex-grow pt-16 md:pt-20 pb-20 lg:pb-0">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
