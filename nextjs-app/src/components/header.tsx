'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              MCP EDA Hub
            </Link>
          </div>
          
          <nav className="flex items-center space-x-4">
            {status === 'loading' ? (
              <span className="text-gray-500">Loading...</span>
            ) : session ? (
              <>
                <span className="text-gray-700">
                  Welcome, {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}