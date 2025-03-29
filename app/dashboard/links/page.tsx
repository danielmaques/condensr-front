"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LinkData {
  id: string;
  originalUrl: string;
  shortCode: string;
  alias: string | null;
  clicks: number;
  createdAt: string;
  expiresAt: string;
}

export default function LinksPage() {
  const router = useRouter();
  const [links, setLinks] = useState<LinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Fetch links data
  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      try {
        // This would be replaced with an actual API call
        // const response = await fetch(`https://condensr-back.onrender.com/api/links?page=${currentPage}&search=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}`, {
        //   headers: {
        //     "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        //   }
        // });
        // const data = await response.json();
        // setLinks(data.links);
        // setTotalPages(data.totalPages);

        // For demonstration, use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate 10 mock links
        const mockLinks: LinkData[] = Array.from({ length: 10 }, (_, i) => ({
          id: `link-${i + 1}`,
          originalUrl: `https://example.com/very/long/url/path/${i + 1}`,
          shortCode: Math.random().toString(36).substring(2, 8),
          alias: i % 3 === 0 ? `custom-alias-${i + 1}` : null,
          clicks: Math.floor(Math.random() * 1000),
          createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + (7 - i % 7) * 24 * 60 * 60 * 1000).toISOString()
        }));

        setLinks(mockLinks);
        setTotalPages(5); // Mock total pages
      } catch (error) {
        console.error("Failed to fetch links:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, [currentPage, searchTerm, sortBy, sortOrder]);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  // Calculate days until expiration
  const getDaysUntilExpiration = (expiresAt: string) => {
    const today = new Date();
    const expiration = new Date(expiresAt);
    const diffTime = expiration.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Handle selecting all links
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedLinks(links.map(link => link.id));
    } else {
      setSelectedLinks([]);
    }
  };

  // Handle selecting individual link
  const handleSelectLink = (id: string) => {
    if (selectedLinks.includes(id)) {
      setSelectedLinks(selectedLinks.filter(linkId => linkId !== id));
    } else {
      setSelectedLinks([...selectedLinks, id]);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (!selectedLinks.length || !confirm("Tem certeza que deseja excluir os links selecionados?")) {
      return;
    }

    try {
      // This would be replaced with an actual API call
      // await fetch("https://condensr-back.onrender.com/api/links/bulk-delete", {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      //   },
      //   body: JSON.stringify({ ids: selectedLinks })
      // });

      // For demonstration, just update the state
      setLinks(links.filter(link => !selectedLinks.includes(link.id)));
      setSelectedLinks([]);
    } catch (error) {
      console.error("Failed to delete links:", error);
    }
  };

  // Handle sorting
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  // Copy link to clipboard
  const copyToClipboard = (shortCode: string, alias: string | null) => {
    const linkToCopy = `https://condensr.app/${alias || shortCode}`;
    navigator.clipboard.writeText(linkToCopy)
      .then(() => {
        alert("Link copiado para área de transferência!");
      })
      .catch(err => {
        console.error("Falha ao copiar link:", err);
      });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Links Encurtados</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos os seus links encurtados e suas estatísticas.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/dashboard/links/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Criar Novo Link
          </Link>
        </div>
      </div>

      {/* Search and filter */}
      <div className="mt-6 flex flex-col lg:flex-row justify-between">
        <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
          <label htmlFor="search" className="sr-only">
            Buscar links
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              id="search"
              name="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Buscar por URL ou alias"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Bulk actions */}
        {selectedLinks.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 text-sm">
              {selectedLinks.length} selecionado(s)
            </span>
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Excluir
            </button>
          </div>
        )}
      </div>

      {/* Links table */}
      <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
        {loading ? (
          <div className="py-24 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="mt-4 text-gray-500">Carregando links...</p>
          </div>
        ) : links.length === 0 ? (
          <div className="py-16 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum link encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              Comece criando um novo link encurtado.
            </p>
            <div className="mt-6">
              <Link
                href="/dashboard/links/create"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Criar Novo Link
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <input
                        id="select-all"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={selectedLinks.length === links.length && links.length > 0}
                        onChange={handleSelectAll}
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("originalUrl")}
                  >
                    <div className="flex items-center">
                      <span>URL Original</span>
                      {sortBy === "originalUrl" && (
                        <span className="ml-1">
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("shortCode")}
                  >
                    <div className="flex items-center">
                      <span>Link Encurtado</span>
                      {sortBy === "shortCode" && (
                        <span className="ml-1">
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("clicks")}
                  >
                    <div className="flex items-center">
                      <span>Cliques</span>
                      {sortBy === "clicks" && (
                        <span className="ml-1">
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center">
                      <span>Criado em</span>
                      {sortBy === "createdAt" && (
                        <span className="ml-1">
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Expira em
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {links.map((link) => {
                  const daysUntilExpiration = getDaysUntilExpiration(link.expiresAt);
                  const isExpiringSoon = daysUntilExpiration <= 2 && daysUntilExpiration > 0;
                  const isExpired = daysUntilExpiration <= 0;

                  return (
                    <tr key={link.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          checked={selectedLinks.includes(link.id)}
                          onChange={() => handleSelectLink(link.id)}
                        />
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="text-sm text-gray-900 truncate" title={link.originalUrl}>
                          {link.originalUrl}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-blue-600">
                            condensr.app/{link.alias || link.shortCode}
                          </span>
                          <button
                            onClick={() => copyToClipboard(link.shortCode, link.alias)}
                            className="ml-2 text-gray-400 hover:text-gray-500"
                            title="Copiar link"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                            </svg>
                          </button>
                        </div>
                        {link.alias && (
                          <div className="text-xs text-gray-500">
                            Alias personalizado
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{link.clicks}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(link.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isExpired ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Expirado
                          </span>
                        ) : isExpiringSoon ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {daysUntilExpiration} dia{daysUntilExpiration !== 1 ? "s" : ""}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500">
                            {daysUntilExpiration} dias
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => router.push(`/dashboard/links/${link.id}`)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Detalhes
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Tem certeza que deseja excluir este link?")) {
                              setLinks(links.filter(l => l.id !== link.id));
                            }
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && links.length > 0 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-md shadow">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Próximo
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">1</span> a{" "}
                <span className="font-medium">{links.length}</span> de{" "}
                <span className="font-medium">
                  {/* This would be the total count from the API */}
                  {links.length * totalPages}
                </span>{" "}
                resultados
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Primeira</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border ${
                        currentPage === page
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      } text-sm font-medium`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Última</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 