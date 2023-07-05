"use client";
import Header from "../components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";
import Footer from "../components/Footer";
import { isAuthenticated } from "../helper/authentication";
import { useState, useEffect } from "react";

const hideNavbarPages = ["/success", "/signin"];

export default function RootLayout({ children }) {
  const router = usePathname();
  const hideNavbar = hideNavbarPages.includes(router);
  // const logged = isAuthenticated();
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Header />
        <div className="min-h-screen">
          {hideNavbar ? null : <Navbar />}
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
