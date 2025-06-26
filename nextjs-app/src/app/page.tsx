import { Header } from '@/components/header'
import { mcpServers } from '@/lib/data'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            MCP EDA Hub
          </h1>
          <p className="text-gray-600">
            Discover and explore Model Context Protocol servers for EDA workflows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mcpServers.map((server) => (
            <div
              key={server.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {server.name}
                </h3>
                <p className="text-sm text-gray-500">by {server.author}</p>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {server.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {server.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {server.category}
                </span>
                <a
                  href={server.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  View on GitHub →
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}