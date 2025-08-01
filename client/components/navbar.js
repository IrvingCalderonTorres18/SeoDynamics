import React from 'react';
import Link from 'next/link';
const NavBar = () => {
  return (
    <nav className="bg-blue-500 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
              <img src="/SeoDynamics2.png" alt="Mi imagen" className="rounded-xl" width={50} height={50}/>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm">
                  Inicio
                </Link>
                <Link href="/dashboard" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm">
                  Dashboard
                </Link>
                <Link href="/herramientas" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm">
                  Herramientas
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="bg-white p-2 rounded-full text-blue-500"
              >
                <span className="sr-only">Buscar</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
