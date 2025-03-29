"use client";

import {
    ArrowDown,
    ArrowUp,
    CalendarBlank,
    CaretDown,
    ChartBar,
    ChartLine,
    ChartPie,
    Clock,
    Desktop,
    DeviceMobile,
    DeviceTablet,
    DownloadSimple,
    Gauge,
    Globe,
    Users
} from "phosphor-react";
import { useEffect, useState } from "react";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("7"); // Padrão: últimos 7 dias

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-slate-500">Carregando análises...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <ChartLine className="mr-2" size={24} />
            Análise de Links
          </h2>
          <p className="mt-1 text-slate-500">
            Visualize o desempenho dos seus links encurtados
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white rounded-lg border border-slate-200 shadow-sm px-3 py-1.5">
            <CalendarBlank className="mr-2 text-indigo-500" size={18} />
            <select 
              className="bg-transparent pr-8 py-1 text-sm focus:outline-none text-slate-700"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="7">Últimos 7 dias</option>
              <option value="30">Últimos 30 dias</option>
              <option value="90">Últimos 90 dias</option>
              <option value="365">Último ano</option>
            </select>
          </div>
          <button className="inline-flex items-center px-3 py-2 border border-slate-200 shadow-sm text-sm leading-4 font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            <DownloadSimple className="mr-1.5" size={16} />
            Exportar
            <CaretDown className="ml-1" size={14} />
          </button>
        </div>
      </div>

      {/* Gráfico de visão geral */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <ChartBar className="mr-2" size={20} weight="regular" />
          Visão geral de cliques
        </h3>
        <div className="h-64 w-full bg-slate-50 flex items-center justify-center rounded-lg border border-slate-200">
          <div className="text-center">
            <ChartLine className="mx-auto h-10 w-10 text-slate-300" weight="thin" />
            <p className="mt-2 text-slate-500">Gráfico de cliques será exibido aqui</p>
          </div>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-md rounded-xl border border-slate-100 hover:shadow-lg transition-all duration-200">
          <div className="px-6 py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-3 shadow-md">
                <Gauge className="h-6 w-6 text-white" weight="bold" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">
                    Taxa de Cliques Média
                  </dt>
                  <dd className="flex items-baseline mt-1">
                    <div className="text-2xl font-semibold text-slate-900">
                      26.5%
                    </div>
                    <div className="ml-2 flex items-center text-sm text-emerald-600">
                      <ArrowUp className="self-center flex-shrink-0 h-5 w-5" />
                      <span>3.2%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-md rounded-xl border border-slate-100 hover:shadow-lg transition-all duration-200">
          <div className="px-6 py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg p-3 shadow-md">
                <Clock className="h-6 w-6 text-white" weight="bold" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">
                    Tempo Médio de Sessão
                  </dt>
                  <dd className="flex items-baseline mt-1">
                    <div className="text-2xl font-semibold text-slate-900">
                      1m 32s
                    </div>
                    <div className="ml-2 flex items-center text-sm text-rose-600">
                      <ArrowDown className="self-center flex-shrink-0 h-5 w-5" />
                      <span>0.4%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-md rounded-xl border border-slate-100 hover:shadow-lg transition-all duration-200">
          <div className="px-6 py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-3 shadow-md">
                <Users className="h-6 w-6 text-white" weight="bold" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">
                    Novos Visitantes
                  </dt>
                  <dd className="flex items-baseline mt-1">
                    <div className="text-2xl font-semibold text-slate-900">
                      63%
                    </div>
                    <div className="ml-2 flex items-center text-sm text-emerald-600">
                      <ArrowUp className="self-center flex-shrink-0 h-5 w-5" />
                      <span>2.7%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-md rounded-xl border border-slate-100 hover:shadow-lg transition-all duration-200">
          <div className="px-6 py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg p-3 shadow-md">
                <ChartPie className="h-6 w-6 text-white" weight="bold" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">
                    Taxa de Rejeição
                  </dt>
                  <dd className="flex items-baseline mt-1">
                    <div className="text-2xl font-semibold text-slate-900">
                      27.9%
                    </div>
                    <div className="ml-2 flex items-center text-sm text-emerald-600">
                      <ArrowUp className="self-center flex-shrink-0 h-5 w-5" />
                      <span>1.3%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gráficos de dispositivos e localizações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dispositivos */}
        <div className="bg-white shadow-md overflow-hidden rounded-xl border border-slate-100">
          <div className="px-6 py-5 border-b border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center">
              <DeviceMobile className="mr-2" size={20} /> 
              Dispositivos
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Distribuição de acessos por tipo de dispositivo
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-white to-slate-50">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-slate-100">
                <DeviceMobile className="h-8 w-8 text-indigo-500" weight="duotone" />
                <span className="mt-3 text-2xl font-semibold text-slate-900">58%</span>
                <span className="text-sm text-slate-500 mt-1">Mobile</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-slate-100">
                <Desktop className="h-8 w-8 text-indigo-500" weight="duotone" />
                <span className="mt-3 text-2xl font-semibold text-slate-900">36%</span>
                <span className="text-sm text-slate-500 mt-1">Desktop</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-slate-100">
                <DeviceTablet className="h-8 w-8 text-indigo-500" weight="duotone" />
                <span className="mt-3 text-2xl font-semibold text-slate-900">6%</span>
                <span className="text-sm text-slate-500 mt-1">Tablet</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Localizações */}
        <div className="bg-white shadow-md overflow-hidden rounded-xl border border-slate-100">
          <div className="px-6 py-5 border-b border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center">
              <Globe className="mr-2" size={20} />
              Principais Localizações
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              De onde seus links são mais acessados
            </p>
          </div>
          <div className="">
            <ul className="divide-y divide-slate-100">
              <li className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-7 h-5 rounded-sm overflow-hidden mr-3 shadow-sm">
                    <div className="bg-green-500 h-1/3"></div>
                    <div className="bg-yellow-500 h-1/3"></div>
                    <div className="bg-blue-500 h-1/3"></div>
                  </div>
                  <span className="font-medium text-slate-800">Brasil</span>
                </div>
                <div className="flex items-center">
                  <div className="w-36 bg-slate-200 rounded-full h-2 mr-3">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 w-10 text-right">65%</span>
                </div>
              </li>
              <li className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-7 h-5 rounded-sm overflow-hidden mr-3 shadow-sm">
                    <div className="bg-red-500 h-1/3"></div>
                    <div className="bg-white h-1/3"></div>
                    <div className="bg-blue-500 h-1/3"></div>
                  </div>
                  <span className="font-medium text-slate-800">Estados Unidos</span>
                </div>
                <div className="flex items-center">
                  <div className="w-36 bg-slate-200 rounded-full h-2 mr-3">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 w-10 text-right">15%</span>
                </div>
              </li>
              <li className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-7 h-5 rounded-sm overflow-hidden mr-3 shadow-sm">
                    <div className="bg-green-500 h-1/2"></div>
                    <div className="bg-red-500 h-1/2"></div>
                  </div>
                  <span className="font-medium text-slate-800">Portugal</span>
                </div>
                <div className="flex items-center">
                  <div className="w-36 bg-slate-200 rounded-full h-2 mr-3">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 w-10 text-right">8%</span>
                </div>
              </li>
              <li className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-7 h-5 bg-slate-300 rounded-sm mr-3 flex items-center justify-center shadow-sm">
                    <Globe size={12} className="text-slate-700" />
                  </div>
                  <span className="font-medium text-slate-800">Outros</span>
                </div>
                <div className="flex items-center">
                  <div className="w-36 bg-slate-200 rounded-full h-2 mr-3">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 w-10 text-right">12%</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabela de principais referenciadores */}
      <div className="bg-white shadow-md overflow-hidden rounded-xl border border-slate-100">
        <div className="px-6 py-5 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center">
            <Globe className="mr-2" size={20} />
            Principais Referenciadores
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            De onde vêm os seus visitantes
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Origem
                </th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Visitantes
                </th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Taxa de Conversão
                </th>
                <th scope="col" className="px-6 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Tendência
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 text-xs font-bold">G</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-slate-900">Google</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  3,425
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    4.8%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 text-right">
                  <div className="inline-flex items-center text-emerald-600">
                    <ArrowUp className="h-4 w-4 mr-0.5" />
                    <span>12%</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 text-xs font-bold">D</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-slate-900">Direct</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  2,863
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    3.2%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 text-right">
                  <div className="inline-flex items-center text-emerald-600">
                    <ArrowUp className="h-4 w-4 mr-0.5" />
                    <span>3.5%</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 text-xs font-bold">T</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-slate-900">Twitter</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  1,753
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    2.9%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 text-right">
                  <div className="inline-flex items-center text-rose-600">
                    <ArrowDown className="h-4 w-4 mr-0.5" />
                    <span>1.8%</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 text-xs font-bold">L</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-slate-900">LinkedIn</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  1,486
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    2.4%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 text-right">
                  <div className="inline-flex items-center text-emerald-600">
                    <ArrowUp className="h-4 w-4 mr-0.5" />
                    <span>5.2%</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center">
                      <span className="text-pink-600 text-xs font-bold">I</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-slate-900">Instagram</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  1,024
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    1.8%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 text-right">
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