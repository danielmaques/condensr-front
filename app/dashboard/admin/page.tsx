"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
  roles: string[];
  createdAt: string;
  status: "active" | "suspended" | "inactive";
  linksCount: number;
}

interface SystemStats {
  totalUsers: number;
  totalLinks: number;
  totalClicks: number;
  activeLinksToday: number;
  averageClickRate: number;
  systemUsage: {
    cpu: number;
    memory: number;
    storage: number;
  };
}

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState<"users" | "stats">("users");
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        // This would be replaced with an actual API call or JWT token verification
        // const response = await fetch("https://condensr-back.onrender.com/api/user/me", {
        //   headers: {
        //     "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        //   }
        // });
        // const data = await response.json();
        // const isUserAdmin = data.user.roles.includes("admin");
        
        // For demonstration, assume the user is an admin
        const isUserAdmin = true;
        
        setIsAdmin(isUserAdmin);
        
        if (!isUserAdmin) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Failed to check user role:", error);
        router.push("/dashboard");
      }
    };

    checkAdmin();
  }, [router]);

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      if (!isAdmin) return;
      
      setLoading(true);
      try {
        // This would be replaced with an actual API call
        // const response = await fetch(`https://condensr-back.onrender.com/api/admin/users?search=${searchTerm}`, {
        //   headers: {
        //     "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        //   }
        // });
        // const data = await response.json();
        // setUsers(data.users);

        // For demonstration, use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate 15 mock users
        const mockUsers: UserData[] = Array.from({ length: 15 }, (_, i) => {
          const statuses: ("active" | "suspended" | "inactive")[] = ["active", "suspended", "inactive"];
          const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
          
          return {
            id: `user-${i + 1}`,
            name: `Usuário ${i + 1}`,
            email: `usuario${i + 1}@example.com`,
            roles: i === 0 ? ["admin"] : ["user"],
            createdAt: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: randomStatus,
            linksCount: Math.floor(Math.random() * 100)
          };
        });

        // Filter by search term if provided
        const filteredUsers = searchTerm
          ? mockUsers.filter(
              user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : mockUsers;

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isAdmin, searchTerm]);

  // Fetch system stats
  useEffect(() => {
    const fetchStats = async () => {
      if (!isAdmin) return;
      
      try {
        // This would be replaced with an actual API call
        // const response = await fetch("https://condensr-back.onrender.com/api/admin/stats", {
        //   headers: {
        //     "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        //   }
        // });
        // const data = await response.json();
        // setStats(data.stats);

        // For demonstration, use mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockStats: SystemStats = {
          totalUsers: 573,
          totalLinks: 12489,
          totalClicks: 247932,
          activeLinksToday: 843,
          averageClickRate: 19.85,
          systemUsage: {
            cpu: 32,
            memory: 64,
            storage: 48
          }
        };

        setStats(mockStats);
      } catch (error) {
        console.error("Failed to fetch system stats:", error);
      }
    };

    fetchStats();
  }, [isAdmin]);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  // Handle user status change
  const handleStatusChange = async (userId: string, newStatus: "active" | "suspended" | "inactive") => {
    try {
      // This would be replaced with an actual API call
      // await fetch(`https://condensr-back.onrender.com/api/admin/users/${userId}/status`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      //   },
      //   body: JSON.stringify({ status: newStatus })
      // });
      
      // For demonstration, just update the state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      ));
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="py-12 text-center">
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
        <p className="mt-4 text-gray-500">Verificando permissões...</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Painel de Administração</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gerencie usuários e visualize estatísticas do sistema.
          </p>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="mt-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setCurrentTab("users")}
            className={`${
              currentTab === "users"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
          >
            Usuários
          </button>
          <button
            onClick={() => setCurrentTab("stats")}
            className={`${
              currentTab === "stats"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
          >
            Estatísticas do Sistema
          </button>
        </nav>
      </div>

      {/* Users tab */}
      {currentTab === "users" && (
        <div className="mt-6">
          {/* Search */}
          <div className="mb-6">
            <label htmlFor="search" className="sr-only">
              Buscar usuários
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
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
                placeholder="Buscar por nome ou e-mail"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Users table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {loading ? (
              <div className="py-20 text-center">
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
                <p className="mt-4 text-gray-500">Carregando usuários...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="py-16 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum usuário encontrado</h3>
                {searchTerm && (
                  <p className="mt-1 text-sm text-gray-500">
                    Tente uma busca diferente.
                  </p>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuário
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Função
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data de Criação
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Links
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-800 font-medium text-sm">
                                {user.name.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.roles.includes("admin") ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              Admin
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Usuário
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={user.status}
                            onChange={(e) => handleStatusChange(user.id, e.target.value as "active" | "suspended" | "inactive")}
                            className={`text-sm rounded-md border-gray-300 ${
                              user.status === "active"
                                ? "text-green-800 bg-green-50"
                                : user.status === "suspended"
                                ? "text-yellow-800 bg-yellow-50"
                                : "text-red-800 bg-red-50"
                            }`}
                          >
                            <option value="active">Ativo</option>
                            <option value="suspended">Suspenso</option>
                            <option value="inactive">Inativo</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.linksCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => router.push(`/dashboard/admin/users/${user.id}`)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Detalhes
                          </button>
                          {!user.roles.includes("admin") && (
                            <button
                              onClick={() => {
                                const newRoles = user.roles.includes("admin")
                                  ? user.roles.filter(role => role !== "admin")
                                  : [...user.roles, "admin"];
                                
                                setUsers(users.map(u => 
                                  u.id === user.id ? { ...u, roles: newRoles } : u
                                ));
                              }}
                              className="text-purple-600 hover:text-purple-900"
                            >
                              {user.roles.includes("admin") ? "Remover Admin" : "Tornar Admin"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats tab */}
      {currentTab === "stats" && (
        <div className="mt-6">
          {/* System Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total de Usuários</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stats?.totalUsers.toLocaleString() || "..."}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total de Links</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stats?.totalLinks.toLocaleString() || "..."}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total de Cliques</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stats?.totalClicks.toLocaleString() || "..."}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Links Ativos Hoje</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stats?.activeLinksToday.toLocaleString() || "..."}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-pink-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Taxa de Cliques Média</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stats?.averageClickRate.toFixed(1) || "..."} por link
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Usage */}
          <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Utilização do Sistema</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Métricas de uso de recursos.</p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>CPU</span>
                    <span>{stats?.systemUsage.cpu || 0}%</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        (stats?.systemUsage.cpu || 0) > 80 
                          ? "bg-red-500" 
                          : (stats?.systemUsage.cpu || 0) > 60 
                          ? "bg-yellow-500" 
                          : "bg-green-500"
                      }`} 
                      style={{ width: `${stats?.systemUsage.cpu || 0}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Memória</span>
                    <span>{stats?.systemUsage.memory || 0}%</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        (stats?.systemUsage.memory || 0) > 80 
                          ? "bg-red-500" 
                          : (stats?.systemUsage.memory || 0) > 60 
                          ? "bg-yellow-500" 
                          : "bg-green-500"
                      }`} 
                      style={{ width: `${stats?.systemUsage.memory || 0}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Armazenamento</span>
                    <span>{stats?.systemUsage.storage || 0}%</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        (stats?.systemUsage.storage || 0) > 80 
                          ? "bg-red-500" 
                          : (stats?.systemUsage.storage || 0) > 60 
                          ? "bg-yellow-500" 
                          : "bg-green-500"
                      }`} 
                      style={{ width: `${stats?.systemUsage.storage || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 