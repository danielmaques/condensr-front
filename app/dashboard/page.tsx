"use client";

import Link from "next/link";
import {
    ArrowDown,
    ArrowUp,
    CalendarBlank,
    ChartBar,
    ChartLine,
    Desktop,
    DeviceMobile,
    DeviceTablet,
    Gauge,
    Globe,
    LinkSimple,
    PlusCircle,
    Users
} from "phosphor-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("7"); // Default: last 7 days
  const [stats, setStats] = useState({
    totalLinks: 0,
    totalClicks: 0,
    activeLinks: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
      setStats({
        totalLinks: 48,
        totalClicks: 1243,
        activeLinks: 42,
        conversionRate: 3.2,
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-slate-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-[fadeIn_0.5s_ease-in-out] max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">Main Dashboard</span>
          </h2>
          <p className="mt-1.5 text-slate-500">
            View the overall performance of your shortened links
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white rounded-lg border border-slate-200 shadow-sm px-3 py-1.5 transition-shadow hover:shadow-md">
            <CalendarBlank className="mr-2 text-indigo-500" size={18} />
            <select 
              className="bg-transparent pr-8 py-1 text-sm focus:outline-none text-slate-700"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
          </div>
          <Link 
            href="/dashboard/links/create"
            className="inline-flex items-center px-4 py-2.5 border border-indigo-200 shadow-sm text-sm font-medium rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
          >
            <PlusCircle className="mr-2" size={18} weight="bold" />
            Create Link
          </Link>
        </div>
      </div>

      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-lg p-0.5 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600/95 to-blue-600/95 rounded-[14px] p-5 sm:p-7 text-white relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10">
            <div className="mb-5 md:mb-0">
              <h2 className="text-xl font-bold">Welcome to your Dashboard</h2>
              <p className="mt-2 text-indigo-100 max-w-2xl opacity-90">
                Track your links' performance and get valuable insights about your visitors.
              </p>
            </div>
            <div className="flex space-x-3 shrink-0">
              <button className="px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-white/20 transition-all duration-200">
                View Tutorial
              </button>
              <Link
                href="/dashboard/links"
                className="px-3 sm:px-4 py-2 sm:py-2.5 bg-white text-indigo-600 rounded-lg text-sm font-medium shadow-sm hover:bg-indigo-50 transition-all duration-200"
              >
                My Links
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-md rounded-xl border border-slate-100 hover:shadow-lg transition-all duration-200 group">
          <div className="px-5 sm:px-6 py-4 sm:py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-3 sm:p-3.5 shadow-md group-hover:scale-110 transition-transform duration-300">
                <LinkSimple className="h-5 sm:h-6 w-5 sm:w-6 text-white" weight="bold" />
              </div>
              <div className="ml-4 sm:ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">
                    Total Links
                  </dt>
                  <dd className="flex items-baseline mt-1">
                    <div className="text-xl sm:text-2xl font-semibold text-slate-900">
                      {stats.totalLinks}
                    </div>
                    <div className="ml-2 flex items-center text-sm text-emerald-600">
                      <ArrowUp className="self-center flex-shrink-0 h-4 sm:h-5 w-4 sm:w-5" />
                      <span>12%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-md rounded-xl border border-slate-100 hover:shadow-lg transition-all duration-200 group">
          <div className="px-5 sm:px-6 py-4 sm:py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg p-3 sm:p-3.5 shadow-md group-hover:scale-110 transition-transform duration-300">
                <ChartLine className="h-5 sm:h-6 w-5 sm:w-6 text-white" weight="bold" />
              </div>
              <div className="ml-4 sm:ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">
                    Total Clicks
                  </dt>
                  <dd className="flex items-baseline mt-1">
                    <div className="text-xl sm:text-2xl font-semibold text-slate-900">
                      {stats.totalClicks}
                    </div>
                    <div className="ml-2 flex items-center text-sm text-emerald-600">
                      <ArrowUp className="self-center flex-shrink-0 h-4 sm:h-5 w-4 sm:w-5" />
                      <span>8.2%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-md rounded-xl border border-slate-100 hover:shadow-lg transition-all duration-200 group">
          <div className="px-5 sm:px-6 py-4 sm:py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-3 sm:p-3.5 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Users className="h-5 sm:h-6 w-5 sm:w-6 text-white" weight="bold" />
              </div>
              <div className="ml-4 sm:ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">
                    New Visitors
                  </dt>
                  <dd className="flex items-baseline mt-1">
                    <div className="text-xl sm:text-2xl font-semibold text-slate-900">
                      63%
                    </div>
                    <div className="ml-2 flex items-center text-sm text-emerald-600">
                      <ArrowUp className="self-center flex-shrink-0 h-4 sm:h-5 w-4 sm:w-5" />
                      <span>2.7%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-md rounded-xl border border-slate-100 hover:shadow-lg transition-all duration-200 group">
          <div className="px-5 sm:px-6 py-4 sm:py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg p-3 sm:p-3.5 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Gauge className="h-5 sm:h-6 w-5 sm:w-6 text-white" weight="bold" />
              </div>
              <div className="ml-4 sm:ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">
                    Conversion Rate
                  </dt>
                  <dd className="flex items-baseline mt-1">
                    <div className="text-xl sm:text-2xl font-semibold text-slate-900">
                      {stats.conversionRate}%
                    </div>
                    <div className="ml-2 flex items-center text-sm text-emerald-600">
                      <ArrowUp className="self-center flex-shrink-0 h-4 sm:h-5 w-4 sm:w-5" />
                      <span>1.2%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview chart */}
      <div className="bg-white rounded-xl shadow-md p-0.5 border border-slate-100 overflow-hidden group hover:shadow-lg transition-all duration-200">
        <div className="p-5 sm:p-6 bg-white rounded-[10px]">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 sm:mb-5 flex items-center">
            <div className="mr-3 p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-100 transition-colors duration-200">
              <ChartBar size={20} weight="bold" />
            </div>
            Clicks overview
          </h3>
          <div className="h-64 sm:h-72 w-full bg-slate-50 flex items-center justify-center rounded-lg border border-slate-200 overflow-hidden">
            <div className="text-center">
              <ChartLine className="mx-auto h-10 sm:h-12 w-10 sm:w-12 text-slate-300" weight="thin" />
              <p className="mt-2 text-slate-500">Clicks chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Device and location charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Devices */}
        <div className="bg-white shadow-md overflow-hidden rounded-xl border border-slate-100 group hover:shadow-lg transition-all duration-200">
          <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center">
              <div className="mr-3 p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-100 transition-colors duration-200">
                <DeviceMobile size={20} weight="bold" />
              </div>
              Devices
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Access distribution by device type
            </p>
          </div>
          <div className="p-5 sm:p-6 bg-gradient-to-br from-white to-slate-50/50">
            <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
              <div className="flex flex-col items-center p-3 sm:p-5 bg-white rounded-lg shadow-sm border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200">
                <DeviceMobile className="h-8 sm:h-9 w-8 sm:w-9 text-indigo-500 mb-2 sm:mb-3" weight="duotone" />
                <span className="text-xl sm:text-2xl font-semibold text-slate-900">58%</span>
                <span className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">Mobile</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-5 bg-white rounded-lg shadow-sm border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200">
                <Desktop className="h-8 sm:h-9 w-8 sm:w-9 text-indigo-500 mb-2 sm:mb-3" weight="duotone" />
                <span className="text-xl sm:text-2xl font-semibold text-slate-900">36%</span>
                <span className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">Desktop</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-5 bg-white rounded-lg shadow-sm border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200">
                <DeviceTablet className="h-8 sm:h-9 w-8 sm:w-9 text-indigo-500 mb-2 sm:mb-3" weight="duotone" />
                <span className="text-xl sm:text-2xl font-semibold text-slate-900">6%</span>
                <span className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">Tablet</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Locations */}
        <div className="bg-white shadow-md overflow-hidden rounded-xl border border-slate-100 group hover:shadow-lg transition-all duration-200">
          <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center">
              <div className="mr-3 p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-100 transition-colors duration-200">
                <Globe size={20} weight="bold" />
              </div>
              Top Locations
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Where your links are accessed from the most
            </p>
          </div>
          <div className="">
            <ul className="divide-y divide-slate-100">
              <li className="px-5 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-7 h-5 rounded-sm overflow-hidden mr-3 shadow-sm">
                    <div className="bg-green-500 h-1/3"></div>
                    <div className="bg-yellow-500 h-1/3"></div>
                    <div className="bg-blue-500 h-1/3"></div>
                  </div>
                  <span className="font-medium text-slate-800">Brazil</span>
                </div>
                <div className="flex items-center">
                  <div className="w-24 sm:w-36 bg-slate-200 rounded-full h-2 mr-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 w-8 sm:w-10 text-right">65%</span>
                </div>
              </li>
              <li className="px-5 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-7 h-5 rounded-sm overflow-hidden mr-3 shadow-sm">
                    <div className="bg-red-500 h-1/3"></div>
                    <div className="bg-white h-1/3"></div>
                    <div className="bg-blue-500 h-1/3"></div>
                  </div>
                  <span className="font-medium text-slate-800">USA</span>
                </div>
                <div className="flex items-center">
                  <div className="w-24 sm:w-36 bg-slate-200 rounded-full h-2 mr-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 w-8 sm:w-10 text-right">15%</span>
                </div>
              </li>
              <li className="px-5 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-7 h-5 rounded-sm overflow-hidden mr-3 shadow-sm">
                    <div className="bg-green-500 h-1/2"></div>
                    <div className="bg-red-500 h-1/2"></div>
                  </div>
                  <span className="font-medium text-slate-800">Portugal</span>
                </div>
                <div className="flex items-center">
                  <div className="w-24 sm:w-36 bg-slate-200 rounded-full h-2 mr-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 w-8 sm:w-10 text-right">8%</span>
                </div>
              </li>
              <li className="px-5 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-7 h-5 bg-slate-200 rounded-sm mr-3 flex items-center justify-center shadow-sm">
                    <Globe size={12} className="text-slate-600" />
                  </div>
                  <span className="font-medium text-slate-800">Others</span>
                </div>
                <div className="flex items-center">
                  <div className="w-24 sm:w-36 bg-slate-200 rounded-full h-2 mr-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 w-8 sm:w-10 text-right">12%</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Top referrers table */}
      <div className="bg-white shadow-md overflow-hidden rounded-xl border border-slate-100 group hover:shadow-lg transition-all duration-200">
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center">
            <div className="mr-3 p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-100 transition-colors duration-200">
              <Globe size={20} weight="bold" />
            </div>
            Top Referrers
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Where your visitors are coming from
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-5 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Source
                </th>
                <th scope="col" className="px-5 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Visitors
                </th>
                <th scope="col" className="px-5 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Conversion
                </th>
                <th scope="col" className="px-5 sm:px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-red-100 flex items-center justify-center shadow-sm">
                      <span className="text-red-600 text-xs font-bold">G</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-slate-900">Google</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-slate-600">
                  3,425
                </td>
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    4.8%
                  </div>
                </td>
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-slate-600 text-right">
                  <div className="inline-flex items-center text-emerald-600">
                    <ArrowUp className="h-4 w-4 mr-0.5" />
                    <span>12%</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm">
                      <span className="text-indigo-600 text-xs font-bold">D</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-slate-900">Direct</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-slate-600">
                  2,863
                </td>
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    3.2%
                  </div>
                </td>
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-slate-600 text-right">
                  <div className="inline-flex items-center text-emerald-600">
                    <ArrowUp className="h-4 w-4 mr-0.5" />
                    <span>3.5%</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
                      <span className="text-blue-600 text-xs font-bold">T</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-slate-900">Twitter</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-slate-600">
                  1,753
                </td>
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    2.9%
                  </div>
                </td>
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-slate-600 text-right">
                  <div className="inline-flex items-center text-rose-600">
                    <ArrowDown className="h-4 w-4 mr-0.5" />
                    <span>1.8%</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
                      <span className="text-blue-600 text-xs font-bold">L</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-slate-900">LinkedIn</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-slate-600">
                  1,486
                </td>
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    2.4%
                  </div>
                </td>
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-slate-600 text-right">
                  <div className="inline-flex items-center text-emerald-600">
                    <ArrowUp className="h-4 w-4 mr-0.5" />
                    <span>5.2%</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-pink-100 flex items-center justify-center shadow-sm">
                      <span className="text-pink-600 text-xs font-bold">I</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-slate-900">Instagram</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-slate-600">
                  1,024
                </td>
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    1.8%
                  </div>
                </td>
                <td className="px-5 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-slate-600 text-right">
                  <div className="inline-flex items-center text-emerald-600">
                    <ArrowUp className="h-4 w-4 mr-0.5" />
                    <span>8.3%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 