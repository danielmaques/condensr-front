"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LinkData {
  id: string;
  originalUrl: string;
  shortCode: string;
  alias: string | null;
  clicks: number;
  createdAt: string;
  expiresAt: string;
  qrCode?: string;
}

interface ClickData {
  date: string;
  count: number;
}

interface GeoData {
  country: string;
  count: number;
  percentage: number;
}

interface DeviceData {
  type: string;
  count: number;
  percentage: number;
}

interface BrowserData {
  name: string;
  count: number;
  percentage: number;
}

export default function LinkDetails() {
  const router = useRouter();
  const params = useParams();
  const linkId = params.id as string;
  
  const [link, setLink] = useState<LinkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [clicksData, setClicksData] = useState<ClickData[]>([]);
  const [geoData, setGeoData] = useState<GeoData[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [browserData, setBrowserData] = useState<BrowserData[]>([]);
  const [showQRCode, setShowQRCode] = useState(false);

  // Fetch link data
  useEffect(() => {
    const fetchLinkDetails = async () => {
      setLoading(true);
      try {
        // This would be replaced with an actual API call
        // const response = await fetch(`https://condensr-back.onrender.com/api/links/${linkId}`, {
        //   headers: {
        //     "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        //   }
        // });
        // const data = await response.json();
        // setLink(data.link);
        // setClicksData(data.clicksData);
        // setGeoData(data.geoData);
        // setDeviceData(data.deviceData);
        // setBrowserData(data.browserData);

        // For demonstration, use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock link data
        const mockLink: LinkData = {
          id: linkId,
          originalUrl: "https://example.com/very/long/url/path/example",
          shortCode: "a1b2c3",
          alias: linkId.includes("custom") ? "my-custom-link" : null,
          clicks: 1278,
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
          qrCode: "data:image/png;base64,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"
        };

        // Generate mock clicks data (last 30 days)
        const mockClicksData: ClickData[] = Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          count: Math.floor(Math.random() * 100)
        }));

        // Generate mock geo data
        const mockGeoData: GeoData[] = [
          { country: "Brasil", count: 850, percentage: 66.5 },
          { country: "Estados Unidos", count: 210, percentage: 16.4 },
          { country: "Portugal", count: 98, percentage: 7.7 },
          { country: "Alemanha", count: 65, percentage: 5.1 },
          { country: "Outros", count: 55, percentage: 4.3 }
        ];

        // Generate mock device data
        const mockDeviceData: DeviceData[] = [
          { type: "Desktop", count: 723, percentage: 56.6 },
          { type: "Mobile", count: 492, percentage: 38.5 },
          { type: "Tablet", count: 63, percentage: 4.9 }
        ];

        // Generate mock browser data
        const mockBrowserData: BrowserData[] = [
          { name: "Chrome", count: 843, percentage: 66.0 },
          { name: "Safari", count: 187, percentage: 14.6 },
          { name: "Firefox", count: 134, percentage: 10.5 },
          { name: "Edge", count: 89, percentage: 7.0 },
          { name: "Outros", count: 25, percentage: 1.9 }
        ];

        setLink(mockLink);
        setClicksData(mockClicksData);
        setGeoData(mockGeoData);
        setDeviceData(mockDeviceData);
        setBrowserData(mockBrowserData);
      } catch (error) {
        console.error("Failed to fetch link details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinkDetails();
  }, [linkId]);

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

  // Get expiration status
  const getExpirationStatus = () => {
    if (!link) return { status: "", className: "" };
    
    const daysLeft = getDaysUntilExpiration(link.expiresAt);
    
    if (daysLeft <= 0) {
      return { 
        status: "Expirado", 
        className: "text-red-800 bg-red-100" 
      };
    } else if (daysLeft <= 2) {
      return { 
        status: `Expira em ${daysLeft} dia${daysLeft !== 1 ? 's' : ''}`, 
        className: "text-yellow-800 bg-yellow-100" 
      };
    } else {
      return { 
        status: `Expira em ${daysLeft} dias`, 
        className: "text-blue-800 bg-blue-50" 
      };
    }
  };

  // Copy link to clipboard
  const copyToClipboard = () => {
    if (!link) return;
    
    const linkToCopy = `https://condensr.app/${link.alias || link.shortCode}`;
    navigator.clipboard.writeText(linkToCopy)
      .then(() => {
        alert("Link copiado para área de transferência!");
      })
      .catch(err => {
        console.error("Falha ao copiar link:", err);
      });
  };

  // Delete link handler
  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este link?")) {
      return;
    }

    try {
      // This would be replaced with an actual API call
      // await fetch(`https://condensr-back.onrender.com/api/links/${linkId}`, {
      //   method: "DELETE",
      //   headers: {
      //     "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      //   }
      // });

      // For demonstration, just navigate back
      router.push("/dashboard/links");
    } catch (error) {
      console.error("Failed to delete link:", error);
    }
  };

  // Download QR code
  const downloadQRCode = () => {
    if (!link?.qrCode) return;
    
    const a = document.createElement("a");
    a.href = link.qrCode;
    a.download = `condensr-qr-${link.alias || link.shortCode}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) {
    return (
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
        <p className="mt-4 text-gray-500">Carregando detalhes do link...</p>
      </div>
    );
  }

  if (!link) {
    return (
      <div className="py-16 text-center">
        <svg
          className="mx-auto h-12 w-12 text-red-400"
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
        <h3 className="mt-2 text-sm font-medium text-gray-900">Link não encontrado</h3>
        <p className="mt-1 text-sm text-gray-500">
          Este link não existe ou você não tem permissão para visualizá-lo.
        </p>
        <div className="mt-6">
          <Link
            href="/dashboard/links"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Voltar para links
          </Link>
        </div>
      </div>
    );
  }

  const expirationStatus = getExpirationStatus();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
            Detalhes do Link
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Estatísticas e informações detalhadas sobre este link encurtado.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          <Link
            href="/dashboard/links"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Voltar
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Excluir Link
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 flex justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Informações do Link
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Detalhes e estatísticas básicas.
            </p>
          </div>
          <div>
            <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${expirationStatus.className}`}>
              {expirationStatus.status}
            </span>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Link encurtado</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <span className="font-medium text-blue-600">
                  https://condensr.app/{link.alias || link.shortCode}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="ml-2 text-gray-400 hover:text-gray-500"
                  title="Copiar link"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </button>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">URL original</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <a href={link.originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                  {link.originalUrl}
                </a>
              </dd>
            </div>
            {link.alias && (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Alias personalizado</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {link.alias}
                </dd>
              </div>
            )}
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total de cliques</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-semibold">
                {link.clicks.toLocaleString()}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Criado em</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {formatDate(link.createdAt)}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Expira em</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {formatDate(link.expiresAt)}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">QR Code</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowQRCode(!showQRCode)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {showQRCode ? "Ocultar QR Code" : "Mostrar QR Code"}
                  </button>
                  {showQRCode && (
                    <button
                      onClick={downloadQRCode}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Baixar QR Code
                    </button>
                  )}
                </div>
                {showQRCode && link.qrCode && (
                  <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg inline-block">
                    <img src={link.qrCode} alt="QR Code" className="w-48 h-48" />
                  </div>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Clicks Over Time Chart */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Cliques ao Longo do Tempo
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Últimos 30 dias.
            </p>
          </div>
          <div className="border-t border-gray-200 p-4">
            <div className="h-64 flex items-end space-x-2">
              {clicksData.map((data, index) => {
                const maxClicks = Math.max(...clicksData.map(d => d.count));
                const height = maxClicks > 0 ? (data.count / maxClicks) * 100 : 0;
                
                return (
                  <div key={index} className="flex flex-col items-center flex-1" title={`${data.date}: ${data.count} cliques`}>
                    <div 
                      className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-all duration-200"
                      style={{ height: `${height}%`, minHeight: data.count > 0 ? '4px' : '0' }}
                    ></div>
                    {index % 5 === 0 && (
                      <span className="text-xs text-gray-500 mt-1 rotate-90 lg:rotate-0 origin-left lg:origin-center">
                        {new Date(data.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric' })}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Distribuição Geográfica
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Principais países de origem dos cliques.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-4">
                {geoData.map((geo, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm font-medium">
                      <span>{geo.country}</span>
                      <span>{geo.count} ({geo.percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${geo.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Device Types */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Tipos de Dispositivos
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Distribuição de cliques por tipo de dispositivo.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {deviceData.map((device, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full">
                      {device.type === "Desktop" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      ) : device.type === "Mobile" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="mt-2">
                      <p className="text-lg font-semibold text-gray-900">{device.percentage.toFixed(1)}%</p>
                      <p className="text-sm text-gray-500">{device.type}</p>
                      <p className="text-xs text-gray-400">{device.count} cliques</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Browser Types */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Navegadores
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Distribuição de cliques por navegador.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-4">
                {browserData.map((browser, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm font-medium">
                      <span>{browser.name}</span>
                      <span>{browser.count} ({browser.percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${browser.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 