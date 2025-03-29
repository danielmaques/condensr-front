"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Bell,
    ChartPie,
    Envelope,
    Gear,
    House,
    Link as LinkIcon,
    RocketLaunch,
    SignOut,
    Sliders,
    User,
    Users
} from "phosphor-react";
import React, { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(3); // Example notifications

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
    setLoading(false);
  }, []);

  // Function to check if the current route is active
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // Navigation items
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: House, current: isActive("/dashboard") },
    { name: "My Links", href: "/dashboard/links", icon: LinkIcon, current: isActive("/dashboard/links") },
    { name: "Analytics", href: "/dashboard/analytics", icon: ChartPie, current: isActive("/dashboard/analytics") },
    { name: "Settings", href: "/dashboard/settings", icon: Gear, current: isActive("/dashboard/settings") },
  ];

  // Admin navigation items
  const adminNavigation = [
    { name: "Users", href: "/dashboard/admin/users", icon: Users, current: isActive("/dashboard/admin/users") },
    { name: "Global Settings", href: "/dashboard/admin/settings", icon: Sliders, current: isActive("/dashboard/admin/settings") },
  ];

  const isAdmin = user?.role === "admin";

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-5 text-slate-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if no user data found
    if (typeof window !== "undefined") {
      window.location.href = "/signin";
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-800/70 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar for desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r border-slate-200 p-0 shadow-xl transition-all duration-300 lg:translate-x-0 lg:relative lg:w-80 lg:shadow-none ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="bg-gradient-to-r from-indigo-600 to-blue-500 p-2 rounded-lg shadow-md mr-3">
                  <RocketLaunch className="h-6 w-6 text-white" weight="bold" />
                </span>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
                  Condensr
                </h1>
              </div>
              <button
                type="button"
                className="rounded-md p-2 text-slate-500 lg:hidden hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 overflow-y-auto space-y-1.5">
            <div className="space-y-1.5 mb-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-200 ${
                    item.current
                      ? "bg-indigo-50 text-indigo-600 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-6 w-6 transition-all duration-200 ${
                      item.current
                        ? "text-indigo-600"
                        : "text-slate-400 group-hover:text-indigo-500"
                    }`}
                    weight={item.current ? "bold" : "regular"}
                  />
                  {item.name}
                  {item.current && (
                    <div className="ml-auto w-1.5 h-5 bg-indigo-500 rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Pro upgrade banner */}
            <div className="my-8 px-4 py-6 bg-gradient-to-r from-indigo-500/90 to-blue-500/90 rounded-2xl shadow-md text-white overflow-hidden relative">
              <div className="absolute -top-14 -right-14 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center">
                  <span className="p-1.5 bg-white/20 rounded-lg mr-3">
                    <RocketLaunch className="h-5 w-5 text-white" weight="fill" />
                  </span>
                  <h3 className="font-semibold text-lg">Upgrade to Pro</h3>
                </div>
                <p className="mt-3 text-indigo-100 text-sm leading-relaxed opacity-90">
                  Unlock advanced analytics, custom domains, and priority support.
                </p>
                <button className="mt-4 w-full px-4 py-2.5 bg-white/15 backdrop-blur-sm text-white text-sm font-medium rounded-lg border border-white/30 hover:bg-white/25 transition-colors">
                  View plans
                </button>
              </div>
            </div>

            {/* Admin navigation section */}
            {isAdmin && (
              <div>
                <h3 className="px-4 text-xs font-medium text-slate-500 uppercase tracking-wider my-5">
                  Administration
                </h3>
                <div className="space-y-1">
                  {adminNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-200 ${
                        item.current
                          ? "bg-indigo-50 text-indigo-600 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 flex-shrink-0 h-6 w-6 transition-all duration-200 ${
                          item.current
                            ? "text-indigo-600"
                            : "text-slate-400 group-hover:text-indigo-500"
                        }`}
                        weight={item.current ? "bold" : "regular"}
                      />
                      {item.name}
                      {item.current && (
                        <div className="ml-auto w-1.5 h-5 bg-indigo-500 rounded-full"></div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* User profile */}
          <div className="relative mt-auto p-4 border-t border-slate-100">
            <div className="mx-2 mt-2 flex items-center bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl overflow-hidden relative">
              <div className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-indigo-100/80 blur-xl"></div>
              <div className="relative">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-md overflow-hidden">
                    <User className="h-6 w-6 text-white" weight="bold" />
                  </div>
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white"></div>
                </div>
              </div>
              <div className="ml-3 min-w-0 flex-1 relative z-10">
                <p className="text-sm font-medium text-slate-900 truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
              <div className="ml-2 flex-shrink-0 relative z-10">
                <button className="bg-white p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm">
                  <SignOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              className="lg:hidden rounded-md p-2 text-slate-500 hover:bg-slate-100"
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Search bar */}
            <div className="relative flex-1 max-w-lg">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input 
                type="search" 
                className="block w-full p-2.5 pl-10 text-sm text-slate-900 border border-slate-200 rounded-lg bg-white/80 focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="Search in dashboard..." 
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-colors">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-indigo-600"></span>
                </button>
              </div>
              <div className="relative">
                <button className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-colors">
                  <Envelope className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 