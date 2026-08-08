"use client";

import React, { useEffect, useState } from "react";
import "./users.css";
import SideBar from "@/components/user/SideBar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function UserLayout({ children }) {
  const router = useRouter();
  const { isLoggedIn, token } = useSelector((state) => state.userAuth || {});
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check Redux state first
    if (isLoggedIn && token) {
      setIsAuthenticated(true);
      setIsChecking(false);
      return;
    }

    // Check localStorage fallback for persisted sessions
    try {
      const persistedState = localStorage.getItem("persist:root");
      if (persistedState) {
        const parsedRoot = JSON.parse(persistedState);
        const userAuth = parsedRoot?.userAuth ? JSON.parse(parsedRoot.userAuth) : null;
        if (userAuth?.isLoggedIn && userAuth?.token) {
          setIsAuthenticated(true);
          setIsChecking(false);
          return;
        }
      }
    } catch (e) {
      // ignore JSON parse errors
    }

    // User is NOT logged in -> Transfer to /login
    setIsAuthenticated(false);
    setIsChecking(false);
    router.replace("/login");
  }, [isLoggedIn, token, router]);

  // If checking authentication or unauthenticated, show sleek loading state
  if (isChecking || !isAuthenticated) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center py-5 my-5"
        style={{ minHeight: "50vh" }}
      >
        <div
          className="spinner-border text-primary mb-3"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5 className="fw-bold text-dark mb-1">Authenticating session...</h5>
        <p className="text-muted small">Please wait while we verify your account credentials.</p>
      </div>
    );
  }

  return (
    <div className="container pb-5">
      <div className="row mb-5 mt-5">
        <SideBar />
        {children}
      </div>
    </div>
  );
}