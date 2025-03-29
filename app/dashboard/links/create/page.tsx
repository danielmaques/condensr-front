"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    AndroidLogo,
    AppleLogo,
    ArrowLeft,
    ArrowSquareOut,
    ArrowsClockwise,
    BracketsCurly as BracketsSquare,
    Calendar,
    CaretDown,
    ChartLineUp as Chart,
    ChartLine,
    Check,
    Copy,
    DesktopTower,
    DeviceMobile,
    DeviceTablet,
    DownloadSimple,
    Eye,
    EyeSlash,
    FolderOpen,
    Globe,
    Image,
    Info,
    Key,
    Link as LinkIcon,
    List,
    PencilSimple,
    Plus,
    QrCode,
    Rocket,
    Share,
    ShareNetwork,
    Tag,
    TextAlignLeft,
    TextT,
    X
} from "phosphor-react";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function CreateLinkPage() {
  const router = useRouter();
  
  // Estados básicos para o formulário
  const [originalUrl, setOriginalUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [suggestedAlias, setSuggestedAlias] = useState("");
  const [isAliasAvailable, setIsAliasAvailable] = useState(true);
  const [isUrlValid, setIsUrlValid] = useState(true);
  const [createdLink, setCreatedLink] = useState<string | null>(null);
  
  // Estados para campos avançados
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [maxClicks, setMaxClicks] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [category, setCategory] = useState("");
  const [metadata, setMetadata] = useState("{}");
  
  // UTM Params
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [utmTerm, setUtmTerm] = useState("");
  const [utmContent, setUtmContent] = useState("");
  
  // Redirecionamento por dispositivo
  const [mobileUrl, setMobileUrl] = useState("");
  const [tabletUrl, setTabletUrl] = useState("");
  const [desktopUrl, setDesktopUrl] = useState("");
  
  // QR Code
  const [enableQrCode, setEnableQrCode] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  
  // Open Graph
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [ogType, setOgType] = useState("website");
  
  // Deep Links
  const [iosAppId, setIosAppId] = useState("");
  const [iosAppPath, setIosAppPath] = useState("");
  const [androidPackage, setAndroidPackage] = useState("");
  const [androidAppPath, setAndroidAppPath] = useState("");
  const [trackEvents, setTrackEvents] = useState(false);
  
  // Estados para controle de UI
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    validity: false,
    organization: false,
    utm: false,
    devices: false,
    qrcode: false,
    opengraph: false,
    deeplinks: false,
  });
  const [showAllAdvanced, setShowAllAdvanced] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Referência para o campo de cópia
  const shortUrlRef = useRef<HTMLInputElement>(null);

  // Generate a random short code as preview when alias changes
  const generateLinkPreview = () => {
    if (alias.trim()) {
      return `condensr.app/${alias}`;
    } else {
      // Generate random code
      const randomCode = Math.random().toString(36).substring(2, 8);
      return `condensr.app/${randomCode}`;
    }
  };

  // Update link preview
  const updateLinkPreview = () => {
    setQrCodeUrl(generateLinkPreview());
  };

  // Validação de URL
  const validateUrl = (url: string): boolean => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Geração de alias sugerido baseado na URL
  useEffect(() => {
    if (originalUrl && validateUrl(originalUrl)) {
      setIsUrlValid(true);
      try {
        const url = new URL(originalUrl);
        const domain = url.hostname.replace('www.', '');
        const path = url.pathname.split('/').filter(p => p).join('-');
        const suggestion = `${domain}-${path}`.substring(0, 20)
          .replace(/[^a-zA-Z0-9-]/g, '')
          .toLowerCase();
        
        setSuggestedAlias(suggestion || generateRandomAlias());
      } catch (e) {
        setSuggestedAlias(generateRandomAlias());
      }
    } else {
      setIsUrlValid(originalUrl.length === 0 || validateUrl(originalUrl));
      setSuggestedAlias("");
    }
  }, [originalUrl]);

  // Gerar um alias aleatório
  const generateRandomAlias = (): string => {
    return Math.random().toString(36).substring(2, 10);
  };

  // Verificação de disponibilidade de alias
  useEffect(() => {
    if (alias) {
      // Simula um check de disponibilidade - em produção seria uma chamada API
      const checkAvailability = setTimeout(() => {
        // Simulando que aliases que começam com 'test' já estão ocupados
        setIsAliasAvailable(!alias.startsWith('test'));
      }, 500);
      
      return () => clearTimeout(checkAvailability);
    } else {
      setIsAliasAvailable(true);
    }
  }, [alias]);

  // Adicionar tag
  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  // Remover tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Toggle para expandir seções
  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Mostrar todas as seções avançadas
  const toggleAllAdvanced = () => {
    const newState = !showAllAdvanced;
    setShowAllAdvanced(newState);
    
    // Atualiza todas as seções para o mesmo estado
    const updatedSections = Object.keys(expandedSections).reduce((acc, section) => {
      acc[section] = newState;
      return acc;
    }, {} as Record<string, boolean>);
    
    setExpandedSections(updatedSections);
  };

  // Construir a URL encurtada para preview
  const getShortUrl = (): string => {
    const baseUrl = window.location.origin;
    const aliasToUse = alias || suggestedAlias;
    return aliasToUse ? `${baseUrl}/${aliasToUse}` : baseUrl;
  };

  // Validar o formulário completo
  const validateForm = (): boolean => {
    if (!originalUrl || !validateUrl(originalUrl)) {
      setFormError("URL original é obrigatória e deve ser válida");
      return false;
    }
    
    if (alias && !isAliasAvailable) {
      setFormError("O alias escolhido não está disponível");
      return false;
    }
    
    // Validar JSON de metadados se preenchido
    if (metadata && metadata !== "{}") {
      try {
        JSON.parse(metadata);
      } catch (e) {
        setFormError("O formato do JSON de metadados é inválido");
        return false;
      }
    }
    
    // Verificar URLs de redirecionamento se preenchidas
    if (mobileUrl && !validateUrl(mobileUrl)) {
      setFormError("URL para dispositivos móveis inválida");
      return false;
    }
    
    if (tabletUrl && !validateUrl(tabletUrl)) {
      setFormError("URL para tablets inválida");
      return false;
    }
    
    if (desktopUrl && !validateUrl(desktopUrl)) {
      setFormError("URL para desktop inválida");
      return false;
    }
    
    return true;
  };

  // Copiar URL encurtada para a área de transferência
  const copyToClipboard = () => {
    if (shortUrlRef.current) {
      shortUrlRef.current.select();
      document.execCommand('copy');
      setFormSuccess("Link copiado para a área de transferência!");
      
      setTimeout(() => {
        setFormSuccess(null);
      }, 3000);
    }
  };

  // Limpar o formulário
  const resetForm = () => {
    setOriginalUrl("");
    setAlias("");
    setSuggestedAlias("");
    setIsPrivate(false);
    setPassword("");
    setExpiryDate(null);
    setMaxClicks(null);
    setTags([]);
    setCategory("");
    setMetadata("{}");
    setUtmSource("");
    setUtmMedium("");
    setUtmCampaign("");
    setUtmTerm("");
    setUtmContent("");
    setMobileUrl("");
    setTabletUrl("");
    setDesktopUrl("");
    setEnableQrCode(false);
    setOgTitle("");
    setOgDescription("");
    setOgImage("");
    setOgType("website");
    setIosAppId("");
    setIosAppPath("");
    setAndroidPackage("");
    setAndroidAppPath("");
    setTrackEvents(false);
    setCreatedLink(null);
    setFormError(null);
    setFormSuccess(null);
  };

  // Manipular o envio do formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setFormError(null);
    
    try {
      // Simulação de envio para API - em produção seria uma chamada real
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // URL encurtada gerada
      const shortUrl = getShortUrl();
      setCreatedLink(shortUrl);
      
      // Gerar QR Code se solicitado
      if (enableQrCode) {
        setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shortUrl)}`);
      }
      
      setFormSuccess("Link criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar link:", error);
      setFormError("Ocorreu um erro ao criar o link. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.5s_ease-in-out] max-w-5xl mx-auto pb-12 bg-slate-50/50">
      {/* Cabeçalho aprimorado com design moderno */}
      <div className="bg-gradient-to-r from-[#3366CC] via-[#1E88E5] to-[#3366CC] text-white p-6 rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center">
            <Link 
              href="/dashboard/links" 
              className="mr-4 p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors duration-200 flex items-center justify-center"
              aria-label="Voltar para lista de links"
            >
              <ArrowLeft size={20} weight="bold" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Criar Novo Link</h1>
              <p className="text-blue-100 text-sm mt-1 flex items-center flex-wrap">
                <span>Encurte e personalize seus links em poucos passos</span>
                <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded ml-2 backdrop-blur-sm">
                  * Campos obrigatórios
                </span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!originalUrl || !isUrlValid || isLoading}
            className={`px-5 py-2.5 rounded-lg font-medium text-sm shadow-md flex items-center transition-all duration-300
              ${originalUrl && isUrlValid && !isLoading
                ? "bg-white text-[#3366CC] hover:bg-blue-50 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0" 
                : "bg-white/20 text-white/60 cursor-not-allowed"}`}
          >
            {isLoading ? (
              <>
                <ArrowsClockwise className="mr-2 animate-spin" size={18} weight="bold" />
                Processando...
              </>
            ) : (
              <>
                <Check className="mr-2" size={18} weight="bold" />
                Criar Link
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Indicador de progresso visual aprimorado */}
      <div className="flex items-center justify-center px-4 py-3">
        <div className="flex items-center w-full max-w-2xl justify-between">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#3366CC] flex items-center justify-center text-white font-semibold mb-1 shadow-md">
              1
            </div>
            <span className="text-xs text-[#3366CC] font-medium">Informações básicas</span>
          </div>
          <div className="h-1 bg-slate-200 flex-1 mx-2 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#3366CC] to-[#1E88E5] rounded-full transition-all duration-700" style={{ width: `${showAllAdvanced ? '100' : '33'}%` }}></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mb-1 shadow-sm transition-all duration-300 ${showAllAdvanced ? 'bg-[#3366CC] scale-105' : 'bg-slate-300'}`}>
              2
            </div>
            <span className={`text-xs font-medium ${showAllAdvanced ? 'text-[#3366CC]' : 'text-slate-500'}`}>Opções avançadas</span>
          </div>
          <div className="h-1 bg-slate-200 flex-1 mx-2 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#3366CC] to-[#1E88E5] rounded-full transition-all duration-700" style={{ width: `${createdLink ? '100' : '0'}%` }}></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mb-1 shadow-sm transition-all duration-300 ${createdLink ? 'bg-[#3366CC] scale-105' : 'bg-slate-300'}`}>
              3
            </div>
            <span className={`text-xs font-medium ${createdLink ? 'text-[#3366CC]' : 'text-slate-500'}`}>Link criado</span>
          </div>
        </div>
      </div>
      
      {/* Mensagem de erro/sucesso aprimorada */}
      {formError && (
        <div className="bg-rose-50 border-l-4 border-rose-500 text-rose-700 p-4 rounded-lg flex items-center shadow-sm animate-[fadeIn_0.3s_ease-in-out]">
          <div className="rounded-full bg-rose-100 p-1.5 mr-3 flex-shrink-0">
            <X size={18} weight="bold" />
          </div>
          <div>
            <h3 className="font-medium">Não foi possível criar o link</h3>
            <p className="text-sm text-rose-600">{formError}</p>
          </div>
        </div>
      )}
      
      {formSuccess && (
        <div className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 p-4 rounded-lg flex items-center shadow-sm animate-[fadeIn_0.3s_ease-in-out]">
          <div className="rounded-full bg-emerald-100 p-1.5 mr-3 flex-shrink-0">
            <Check size={18} weight="bold" />
          </div>
          <div>
            <h3 className="font-medium">Sucesso!</h3>
            <p className="text-sm text-emerald-600">{formSuccess}</p>
          </div>
        </div>
      )}
      
      {/* Formulário */}
      <form onSubmit={handleSubmit}>
        {/* Link criado com sucesso - mostra card de resultado */}
        {createdLink ? (
          <div className="bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 animate-[fadeIn_0.5s_ease-in-out]">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 py-6 px-6">
              <h3 className="text-xl text-white font-bold flex items-center">
                <div className="bg-white rounded-full p-1.5 mr-3 flex-shrink-0">
                  <Check size={22} className="text-emerald-500" weight="bold" />
                </div>
                Link Criado com Sucesso!
              </h3>
              <p className="text-emerald-50 mt-1 text-sm">Seu link encurtado está pronto para ser compartilhado</p>
            </div>
            <div className="p-6 space-y-5 bg-gradient-to-b from-white to-slate-50">
              <div>
                <label htmlFor="shortUrl" className="block text-sm font-medium text-slate-700 mb-2">
                  Seu Link Encurtado
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="shortUrl"
                    ref={shortUrlRef}
                    value={createdLink}
                    readOnly
                    className="flex-1 min-w-0 block w-full px-4 py-3 rounded-l-lg border border-slate-300 shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 font-medium"
                  />
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="inline-flex items-center px-5 py-3 border border-transparent bg-[#3366CC] text-white rounded-r-lg hover:bg-[#1E88E5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3366CC] transition-colors"
                  >
                    <Copy size={18} className="mr-2" weight="bold" />
                    Copiar
                  </button>
                </div>
              </div>
              
              {enableQrCode && qrCodeUrl && (
                <div className="flex flex-col items-center mt-6 p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
                  <h4 className="text-slate-800 font-medium mb-4">QR Code para seu link</h4>
                  <div className="bg-white p-3 border-2 border-blue-100 rounded-lg shadow-sm">
                    <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <a 
                      href={qrCodeUrl} 
                      download="qrcode.png"
                      className="text-sm bg-blue-50 text-[#3366CC] hover:bg-blue-100 px-4 py-2 rounded-lg flex items-center font-medium transition-colors"
                    >
                      <DownloadSimple size={16} className="mr-2" weight="bold" />
                      Download PNG
                    </a>
                    <button
                      type="button"
                      className="text-sm bg-slate-50 text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-lg flex items-center font-medium transition-colors"
                      onClick={() => {/* Implementar compartilhamento */}}
                    >
                      <Share size={16} className="mr-2" weight="bold" />
                      Compartilhar
                    </button>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center px-5 py-2.5 bg-white border border-[#3366CC]/40 shadow-sm text-sm font-medium rounded-lg text-[#3366CC] hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3366CC] transition-all"
                >
                  <Plus size={18} className="mr-2" weight="bold" />
                  Criar Outro Link
                </button>
                <div className="flex items-center space-x-3">
                  <Link 
                    href={`/dashboard/links/edit/${alias || suggestedAlias}`}
                    className="inline-flex items-center px-5 py-2.5 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
                  >
                    <PencilSimple size={18} className="mr-2" weight="bold" />
                    Editar Link
                  </Link>
                  <Link 
                    href="/dashboard/links"
                    className="inline-flex items-center px-5 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-[#3366CC] hover:bg-[#1E88E5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3366CC] transition-colors"
                  >
                    <List size={18} className="mr-2" weight="bold" />
                    Todos os Links
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Seção 1: Informações Básicas (sempre visível) - design aprimorado */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="bg-gradient-to-r from-blue-50 to-[#3366CC]/10 border-b border-slate-200 px-6 py-4 flex items-center">
                <div className="bg-[#3366CC] rounded-lg p-2 mr-3 shadow-md">
                  <LinkIcon size={20} className="text-white" weight="bold" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Informações Básicas
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                {/* URL Original - aprimorada */}
                <div>
                  <div className="flex justify-between">
                    <label htmlFor="originalUrl" className="block text-sm font-medium text-slate-700 mb-1">
                      URL Original <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">https://exemplo.com/minha-pagina</span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe size={18} className="text-slate-400" />
                    </div>
                    <input
                      type="url"
                      id="originalUrl"
                      name="originalUrl"
                      placeholder="Cole ou digite a URL que deseja encurtar"
                      value={originalUrl}
                      onChange={(e) => setOriginalUrl(e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border ${
                        isUrlValid ? 'border-slate-300 focus:border-[#3366CC]' : 'border-rose-500 focus:border-rose-500'
                      } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3366CC] text-slate-900 text-sm transition-all duration-200`}
                      required
                    />
                    {originalUrl && isUrlValid && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Check size={18} className="text-emerald-500" weight="bold" />
                      </div>
                    )}
                  </div>
                  {!isUrlValid && originalUrl && (
                    <p className="mt-1.5 text-sm text-rose-500 flex items-center bg-rose-50 px-3 py-1 rounded-md">
                      <X size={14} className="mr-1.5 flex-shrink-0" weight="bold" />
                      Por favor, informe uma URL válida que comece com http:// ou https://
                    </p>
                  )}
                  {isUrlValid && originalUrl && (
                    <p className="mt-1.5 text-xs text-emerald-600 flex items-center">
                      <Check size={14} className="mr-1" weight="bold" />
                      URL válida
                    </p>
                  )}
                </div>
                
                {/* Alias personalizado - aprimorado */}
                <div className="pt-5 border-t border-slate-100">
                  <div className="flex justify-between">
                    <label htmlFor="alias" className="block text-sm font-medium text-slate-700 mb-1">
                      Alias Personalizado (opcional)
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setAlias(suggestedAlias)}
                      className="text-xs text-[#3366CC] hover:text-[#1E88E5] flex items-center bg-blue-50 px-2 py-0.5 rounded hover:bg-blue-100 transition-colors"
                    >
                      <ArrowsClockwise size={12} className="mr-1" weight="bold" />
                      Usar sugestão
                    </button>
                  </div>
                  <div className="flex rounded-lg shadow-sm overflow-hidden">
                    <div className="flex-shrink-0 inline-flex items-center px-4 py-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm font-medium">
                      {window.location.origin}/
                    </div>
                    <input
                      type="text"
                      id="alias"
                      name="alias"
                      placeholder={suggestedAlias || "seu-alias-personalizado"}
                      value={alias}
                      onChange={(e) => setAlias(e.target.value.replace(/[^a-zA-Z0-9-]/g, ''))}
                      className={`flex-1 block w-full px-3 py-3 rounded-r-lg border ${
                        isAliasAvailable ? 'border-slate-300' : 'border-rose-500'
                      } focus:outline-none focus:ring-1 focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm transition-all duration-200`}
                    />
                  </div>
                  {!isAliasAvailable && (
                    <div className="mt-1.5 bg-rose-50 text-rose-700 px-3 py-1.5 rounded-md text-sm flex items-center animate-[fadeIn_0.3s_ease-in-out]">
                      <X size={14} className="mr-1.5 flex-shrink-0" weight="bold" />
                      Este alias já está em uso. Por favor, escolha outro.
                    </div>
                  )}
                  {isAliasAvailable && alias && (
                    <div className="mt-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-md text-sm flex items-center animate-[fadeIn_0.3s_ease-in-out]">
                      <Check size={14} className="mr-1.5 flex-shrink-0" weight="bold" />
                      "{alias}" está disponível para uso
                    </div>
                  )}
                  {!alias && suggestedAlias && (
                    <div className="mt-1.5 flex items-center">
                      <p className="text-xs text-slate-500">
                        Sugestão baseada na sua URL: <span className="font-medium text-[#3366CC] bg-blue-50 px-2 py-0.5 rounded">{suggestedAlias}</span>
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Preview da URL - aprimorada com design mais visual */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preview da URL Encurtada
                  </label>
                  <div className="bg-gradient-to-r from-blue-50 via-blue-50 to-blue-50 border border-blue-100 rounded-lg p-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="bg-white border border-blue-200 rounded-lg px-4 py-3 flex items-center flex-1 shadow-sm">
                        <LinkIcon size={18} className="text-[#3366CC] mr-2 flex-shrink-0" weight="bold" />
                        <span className="text-sm font-medium text-slate-900 truncate">{getShortUrl()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-[#3366CC] text-white px-2 py-1 rounded-full font-medium whitespace-nowrap">
                          {(alias?.length || suggestedAlias?.length || 0) + 10}% mais curta
                        </span>
                        {originalUrl && (
                          <div className="bg-blue-100 text-[#3366CC] text-xs px-2 py-1 rounded-full font-medium flex items-center" title="Economiza espaço em posts e mensagens">
                            <ChartLine size={12} className="mr-1" weight="bold" />
                            Economiza caracteres
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Botão para mostrar/esconder todas as opções avançadas - design totalmente renovado */}
            <div className="mt-8 mb-4 flex justify-center">
              <button
                type="button"
                onClick={toggleAllAdvanced}
                className={`inline-flex items-center px-6 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 transform ${
                  showAllAdvanced 
                    ? "bg-blue-100 text-[#3366CC] hover:bg-blue-200 scale-105" 
                    : "bg-gradient-to-r from-[#3366CC] to-[#1E88E5] text-white hover:shadow-lg hover:from-[#2b58af] hover:to-[#1a78cb] hover:scale-105"
                }`}
              >
                <div className={`mr-2 rounded-full bg-white/20 p-1 transition-transform duration-300 ${showAllAdvanced ? 'rotate-180' : ''}`}>
                  <CaretDown size={16} weight="bold" />
                </div>
                {showAllAdvanced ? "Ocultar Opções Avançadas" : "Mostrar Opções Avançadas"}
                <div className={`ml-2 bg-white/20 backdrop-blur-sm text-xs px-1.5 rounded transition-opacity duration-300 ${showAllAdvanced ? 'opacity-0' : 'opacity-100'}`}>
                  +7 opções
                </div>
              </button>
            </div>
            
            {/* 2.1 Validade e Acesso - design renovado */}
            <div className="mt-6 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <button
                type="button"
                onClick={() => toggleSection('validity')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 text-left"
              >
                <div className="flex items-center">
                  <div className="bg-[#3366CC] rounded-lg p-2 mr-3 shadow-md transition-all duration-300 transform group-hover:scale-110">
                    <Calendar size={22} className="text-white" weight="bold" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Validade e Acesso</span>
                    <p className="text-xs text-slate-500 mt-0.5">Defina quando o link expira e quem pode acessá-lo</p>
                  </div>
                </div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 transition-transform duration-300 ${expandedSections.validity ? 'rotate-180 bg-blue-100' : ''}`}>
                  <CaretDown size={18} className={`${expandedSections.validity ? 'text-[#3366CC]' : 'text-slate-600'}`} weight="bold" />
                </div>
              </button>
              
              {expandedSections.validity && (
                <div className="p-6 space-y-6 bg-white animate-[fadeIn_0.4s_ease-in-out]">
                  {/* Data de expiração - renovada */}
                  <div className="bg-gradient-to-r from-slate-50 to-white rounded-lg p-4 border border-slate-200 shadow-sm">
                    <div className="flex items-start mb-3">
                      <div className="bg-[#3366CC] rounded-full p-2 mr-3 border border-blue-200 shadow-md">
                        <Calendar size={18} className="text-white" weight="bold" />
                      </div>
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-slate-700 mb-1">
                          Data de Expiração
                        </label>
                        <p className="text-xs text-slate-500">
                          Se definido, o link não funcionará após esta data
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="date"
                        id="expiryDate"
                        name="expiryDate"
                        value={expiryDate ? expiryDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => setExpiryDate(e.target.value ? new Date(e.target.value) : null)}
                        min={new Date().toISOString().split('T')[0]}
                        className="block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                      />
                    </div>
                    <div className="mt-3 flex items-center text-xs text-slate-600 bg-blue-50 p-2 rounded">
                      <Info size={14} className="mr-1.5 text-[#3366CC] flex-shrink-0" weight="fill" />
                      {expiryDate 
                        ? `O link expirará em ${expiryDate.toLocaleDateString()} às 23:59 (UTC)` 
                        : "Se não definido, o link não expira automaticamente"}
                    </div>
                  </div>
                  
                  {/* Link privado com senha - renovado */}
                  <div className="bg-gradient-to-r from-slate-50 to-white rounded-lg p-4 border border-slate-200 shadow-sm">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="bg-[#3366CC] rounded-full p-2 mr-3 shadow-md">
                          <Key size={18} className="text-white" weight="bold" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <label htmlFor="isPrivate" className="text-sm font-medium text-slate-700">
                            Link Privado com Proteção por Senha
                          </label>
                          <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                            <input
                              type="checkbox"
                              id="isPrivate"
                              name="isPrivate"
                              checked={isPrivate}
                              onChange={() => setIsPrivate(!isPrivate)}
                              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer checked:right-0 checked:border-[#3366CC] transition-all duration-200 shadow-sm"
                            />
                            <label
                              htmlFor="isPrivate"
                              className={`toggle-label block overflow-hidden h-6 rounded-full bg-slate-200 cursor-pointer ${isPrivate ? 'bg-blue-100' : ''}`}
                            ></label>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mb-3">
                          Adicione uma camada extra de proteção, exigindo uma senha para acessar o link encurtado
                        </p>
                      </div>
                    </div>
                    
                    {isPrivate && (
                      <div className="mt-4 bg-white rounded-lg p-4 border border-blue-100 shadow-sm animate-[fadeIn_0.3s_ease-in-out]">
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                          Senha de Acesso
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Digite uma senha forte"
                            className="block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-700"
                          >
                            {showPassword ? (
                              <EyeSlash size={18} weight="bold" />
                            ) : (
                              <Eye size={18} weight="bold" />
                            )}
                          </button>
                        </div>
                        
                        {password && (
                          <div className="mt-3">
                            <div className="flex items-center mb-1.5">
                              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-300 ${
                                    password.length < 4 ? 'w-1/4 bg-rose-500' : 
                                    password.length < 6 ? 'w-1/2 bg-amber-500' :
                                    password.length < 8 ? 'w-3/4 bg-emerald-500' :
                                    'w-full bg-emerald-500'
                                  }`}>
                                </div>
                              </div>
                              <span className={`ml-2 text-xs font-medium ${
                                password.length < 4 ? 'text-rose-600' : 
                                password.length < 6 ? 'text-amber-600' :
                                'text-emerald-600'
                              }`}>
                                {password.length < 4 ? 'Fraca' : 
                                 password.length < 6 ? 'Média' :
                                 password.length < 8 ? 'Boa' : 'Forte'}
                              </span>
                            </div>
                            
                            <p className="mt-3 text-xs text-slate-500 flex items-center bg-blue-50 p-2 rounded">
                              <Info size={14} className="mr-1.5 flex-shrink-0 text-[#3366CC]" weight="fill" />
                              A senha será solicitada quando alguém tentar acessar este link
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Máximo de cliques - renovado */}
                  <div className="bg-gradient-to-r from-slate-50 to-white rounded-lg p-4 border border-slate-200 shadow-sm">
                    <div className="flex items-start mb-3">
                      <div className="bg-[#3366CC] rounded-full p-2 mr-3 shadow-md">
                        <Chart size={18} className="text-white" weight="bold" />
                      </div>
                      <div>
                        <label htmlFor="maxClicks" className="block text-sm font-medium text-slate-700 mb-1">
                          Limite de Cliques
                        </label>
                        <p className="text-xs text-slate-500">
                          Defina um número máximo de cliques antes do link ser desativado
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        id="maxClicks"
                        name="maxClicks"
                        value={maxClicks || ''}
                        onChange={(e) => setMaxClicks(e.target.value ? Number(e.target.value) : null)}
                        min="1"
                        placeholder="Ilimitado"
                        className="block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                      />
                    </div>
                    <div className="mt-3 flex items-center text-xs text-slate-600 bg-blue-50 p-2 rounded">
                      <div className="flex-shrink-0">
                        <Info size={14} className="mr-1.5 text-[#3366CC]" weight="fill" />
                      </div>
                      <span>
                        {maxClicks 
                          ? `O link será desativado automaticamente após ${maxClicks} cliques` 
                          : "Deixe em branco para permitir cliques ilimitados"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* 2.2 Organização */}
            <div className="mt-4 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => toggleSection('organization')}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 border-b border-slate-200 text-left"
              >
                <div className="flex items-center">
                  <FolderOpen size={20} className="mr-3 text-[#3366CC]" />
                  <span className="font-medium text-slate-800">Organização</span>
                </div>
                <CaretDown 
                  size={18}
                  className={`text-slate-500 transition-transform ${expandedSections.organization ? 'rotate-180' : ''}`}
                />
              </button>
              
              {expandedSections.organization && (
                <div className="p-6 space-y-5">
                  {/* Tags */}
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-slate-700 mb-1">
                      Tags
                    </label>
                    <div className="flex flex-wrap items-center gap-2 p-2 border border-slate-300 rounded-lg bg-white mb-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-[#3366CC] border border-blue-200"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-200 text-[#3366CC] hover:bg-blue-300 hover:text-[#1E88E5]"
                          >
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        id="tags"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        placeholder={tags.length === 0 ? "Adicione tags..." : ""}
                        className="flex-1 min-w-[120px] inline-flex border-0 p-0 focus:ring-0 text-sm text-slate-900 placeholder-slate-400"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addTag}
                      disabled={!currentTag}
                      className="text-xs inline-flex items-center text-[#3366CC] hover:text-[#1E88E5]"
                    >
                      <Plus size={14} className="mr-1" />
                      Adicionar Tag
                    </button>
                    <p className="mt-1 text-xs text-slate-500">
                      Tags ajudam a organizar e filtrar seus links.
                    </p>
                  </div>
                  
                  {/* Categoria */}
                  <div className="pt-3 border-t border-slate-100">
                    <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
                      Categoria
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="marketing">Marketing</option>
                      <option value="social">Redes Sociais</option>
                      <option value="product">Produtos</option>
                      <option value="blog">Blog</option>
                      <option value="internal">Uso Interno</option>
                      <option value="other">Outros</option>
                    </select>
                    <p className="mt-1 text-xs text-slate-500">
                      Categorize seus links para facilitar a organização.
                    </p>
                  </div>
                  
                  {/* Metadados (JSON) */}
                  <div className="pt-3 border-t border-slate-100">
                    <label htmlFor="metadata" className="block text-sm font-medium text-slate-700 mb-1">
                      Metadados (JSON)
                    </label>
                    <textarea
                      id="metadata"
                      name="metadata"
                      rows={4}
                      value={metadata}
                      onChange={(e) => setMetadata(e.target.value)}
                      placeholder='{"chave": "valor", "outra_chave": 123}'
                      className="block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm font-mono"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      Metadados customizados em formato JSON para uso avançado.
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* 2.3 Parâmetros UTM */}
            <div className="mt-4 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => toggleSection('utm')}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 border-b border-slate-200 text-left"
              >
                <div className="flex items-center">
                  <Rocket size={20} className="mr-3 text-[#3366CC]" />
                  <span className="font-medium text-slate-800">Parâmetros UTM</span>
                </div>
                <CaretDown 
                  size={18}
                  className={`text-slate-500 transition-transform ${expandedSections.utm ? 'rotate-180' : ''}`}
                />
              </button>
              
              {expandedSections.utm && (
                <div className="p-6 space-y-5">
                  <p className="text-sm text-slate-600 mb-4">
                    Os parâmetros UTM permitem rastrear campanhas de marketing em ferramentas de análise como o Google Analytics.
                  </p>
                  
                  {/* UTM Source */}
                  <div>
                    <label htmlFor="utmSource" className="block text-sm font-medium text-slate-700 mb-1">
                      UTM Source
                    </label>
                    <input
                      type="text"
                      id="utmSource"
                      name="utmSource"
                      value={utmSource}
                      onChange={(e) => setUtmSource(e.target.value)}
                      placeholder="google, facebook, newsletter"
                      className="block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      A origem do tráfego (Ex: google, newsletter, instagram)
                    </p>
                  </div>
                  
                  {/* UTM Medium */}
                  <div>
                    <label htmlFor="utmMedium" className="block text-sm font-medium text-slate-700 mb-1">
                      UTM Medium
                    </label>
                    <input
                      type="text"
                      id="utmMedium"
                      name="utmMedium"
                      value={utmMedium}
                      onChange={(e) => setUtmMedium(e.target.value)}
                      placeholder="cpc, banner, email"
                      className="block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      O meio pelo qual o link está sendo compartilhado (Ex: email, cpc, social)
                    </p>
                  </div>
                  
                  {/* UTM Campaign */}
                  <div>
                    <label htmlFor="utmCampaign" className="block text-sm font-medium text-slate-700 mb-1">
                      UTM Campaign
                    </label>
                    <input
                      type="text"
                      id="utmCampaign"
                      name="utmCampaign"
                      value={utmCampaign}
                      onChange={(e) => setUtmCampaign(e.target.value)}
                      placeholder="nome_da_campanha"
                      className="block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      O nome da campanha ou promoção (Ex: black_friday, lancamento_produto)
                    </p>
                  </div>
                  
                  {/* UTM Term */}
                  <div>
                    <label htmlFor="utmTerm" className="block text-sm font-medium text-slate-700 mb-1">
                      UTM Term
                    </label>
                    <input
                      type="text"
                      id="utmTerm"
                      name="utmTerm"
                      value={utmTerm}
                      onChange={(e) => setUtmTerm(e.target.value)}
                      placeholder="palavras-chave"
                      className="block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      Identifica palavras-chave pagas (Ex: descontos, ofertas_especiais)
                    </p>
                  </div>
                  
                  {/* UTM Content */}
                  <div>
                    <label htmlFor="utmContent" className="block text-sm font-medium text-slate-700 mb-1">
                      UTM Content
                    </label>
                    <input
                      type="text"
                      id="utmContent"
                      name="utmContent"
                      value={utmContent}
                      onChange={(e) => setUtmContent(e.target.value)}
                      placeholder="banner_superior, modal_popup"
                      className="block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      Diferencia diferentes elementos na mesma posição (Ex: imagem_banner, texto_link)
                    </p>
                  </div>
                  
                  {/* UTM Preview */}
                  <div className="pt-3 mt-2 border-t border-slate-100">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Preview da URL com Parâmetros UTM
                    </label>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 overflow-x-auto">
                      <code className="text-xs text-slate-800 font-mono whitespace-nowrap">
                        {originalUrl}
                        {(utmSource || utmMedium || utmCampaign || utmTerm || utmContent) && '?'}
                        {utmSource && `utm_source=${utmSource}`}
                        {utmMedium && (utmSource ? '&' : '') + `utm_medium=${utmMedium}`}
                        {utmCampaign && ((utmSource || utmMedium) ? '&' : '') + `utm_campaign=${utmCampaign}`}
                        {utmTerm && ((utmSource || utmMedium || utmCampaign) ? '&' : '') + `utm_term=${utmTerm}`}
                        {utmContent && ((utmSource || utmMedium || utmCampaign || utmTerm) ? '&' : '') + `utm_content=${utmContent}`}
                      </code>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2.4 Redirecionamento por Dispositivo - melhorado */}
            <div className="mt-4 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <button
                type="button"
                onClick={() => toggleSection('devices')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 text-left"
              >
                <div className="flex items-center">
                  <div className="bg-blue-50 rounded-lg p-2 mr-3">
                    <DeviceMobile size={22} className="text-[#3366CC]" weight="bold" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Redirecionamento por Dispositivo</span>
                    <p className="text-xs text-slate-500 mt-0.5">Configure URLs diferentes para cada tipo de dispositivo</p>
                  </div>
                </div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 transition-transform duration-300 ${expandedSections.devices ? 'rotate-180' : ''}`}>
                  <CaretDown size={18} className="text-slate-600" weight="bold" />
                </div>
              </button>
              
              {expandedSections.devices && (
                <div className="p-6 space-y-6 bg-white">
                  <div className="text-sm text-slate-600 mb-2 bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start">
                    <span className="mt-0.5 mr-2 text-[#3366CC]">
                      <Info size={16} weight="fill" />
                    </span>
                    <span>
                      Configure URLs específicas baseadas no dispositivo. Quando um usuário clicar no link, ele será redirecionado para a URL correspondente ao seu dispositivo.
                    </span>
                  </div>

                  {/* Mobile URL */}
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start mb-3">
                      <div className="bg-white rounded-full p-1.5 mr-3 border border-slate-200 shadow-sm">
                        <DeviceMobile size={18} className="text-[#3366CC]" weight="bold" />
                      </div>
                      <div>
                        <label htmlFor="mobileUrl" className="block text-sm font-medium text-slate-700 mb-1">
                          URL para Dispositivos Móveis
                        </label>
                        <p className="text-xs text-slate-500">
                          URL específica para smartphones
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe size={16} className="text-slate-400" />
                      </div>
                      <input
                        type="url"
                        id="mobileUrl"
                        name="mobileUrl"
                        value={mobileUrl}
                        onChange={(e) => setMobileUrl(e.target.value)}
                        placeholder="https://m.exemplo.com"
                        className="block w-full pl-10 px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                      />
                    </div>
                  </div>

                  {/* Tablet URL */}
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start mb-3">
                      <div className="bg-white rounded-full p-1.5 mr-3 border border-slate-200 shadow-sm">
                        <DeviceTablet size={18} className="text-[#3366CC]" weight="bold" />
                      </div>
                      <div>
                        <label htmlFor="tabletUrl" className="block text-sm font-medium text-slate-700 mb-1">
                          URL para Tablets
                        </label>
                        <p className="text-xs text-slate-500">
                          URL específica para tablets
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe size={16} className="text-slate-400" />
                      </div>
                      <input
                        type="url"
                        id="tabletUrl"
                        name="tabletUrl"
                        value={tabletUrl}
                        onChange={(e) => setTabletUrl(e.target.value)}
                        placeholder="https://tablet.exemplo.com"
                        className="block w-full pl-10 px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                      />
                    </div>
                  </div>

                  {/* Desktop URL */}
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start mb-3">
                      <div className="bg-white rounded-full p-1.5 mr-3 border border-slate-200 shadow-sm">
                        <DesktopTower size={18} className="text-[#3366CC]" weight="bold" />
                      </div>
                      <div>
                        <label htmlFor="desktopUrl" className="block text-sm font-medium text-slate-700 mb-1">
                          URL para Desktop
                        </label>
                        <p className="text-xs text-slate-500">
                          URL específica para computadores desktop
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe size={16} className="text-slate-400" />
                      </div>
                      <input
                        type="url"
                        id="desktopUrl"
                        name="desktopUrl"
                        value={desktopUrl}
                        onChange={(e) => setDesktopUrl(e.target.value)}
                        placeholder="https://www.exemplo.com"
                        className="block w-full pl-10 px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2.5 QR Code - Melhorado */}
            <div className="mt-4 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <button
                type="button"
                onClick={() => toggleSection('qrcode')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 text-left"
              >
                <div className="flex items-center">
                  <div className="bg-blue-50 rounded-lg p-2 mr-3">
                    <QrCode size={22} className="text-[#3366CC]" weight="bold" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">QR Code</span>
                    <p className="text-xs text-slate-500 mt-0.5">Gere um QR Code para seu link encurtado</p>
                  </div>
                </div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 transition-transform duration-300 ${expandedSections.qrcode ? 'rotate-180' : ''}`}>
                  <CaretDown size={18} className="text-slate-600" weight="bold" />
                </div>
              </button>
              
              {expandedSections.qrcode && (
                <div className="p-6 bg-white">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="bg-white rounded-full p-1.5 mr-3 border border-slate-200 shadow-sm">
                        <QrCode size={18} className="text-[#3366CC]" weight="bold" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="enableQrCode" className="text-sm font-medium text-slate-700">
                          Gerar QR Code
                        </label>
                        <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                          <input
                            type="checkbox"
                            id="enableQrCode"
                            name="enableQrCode"
                            checked={enableQrCode}
                            onChange={() => setEnableQrCode(!enableQrCode)}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer checked:right-0 checked:border-[#3366CC] transition-all duration-200 shadow-sm"
                          />
                          <label
                            htmlFor="enableQrCode"
                            className={`toggle-label block overflow-hidden h-6 rounded-full bg-slate-200 cursor-pointer ${enableQrCode ? 'bg-blue-100' : ''}`}
                          ></label>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">
                        Um QR Code será gerado automaticamente quando o link for criado e estará disponível para download
                      </p>
                    </div>
                  </div>
                  
                  {enableQrCode && (
                    <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
                      <div className="mb-3">
                        <QrCode size={44} className="text-[#3366CC] mx-auto opacity-50" weight="duotone" />
                      </div>
                      <p className="text-sm text-[#3366CC]">
                        QR Code será gerado após a criação do link
                      </p>
                      <p className="text-xs text-blue-500 mt-1">
                        O QR Code contém o link encurtado e pode ser compartilhado digitalmente ou impresso
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 2.6 Open Graph - Melhorado */}
            <div className="mt-4 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <button
                type="button"
                onClick={() => toggleSection('opengraph')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 text-left"
              >
                <div className="flex items-center">
                  <div className="bg-blue-50 rounded-lg p-2 mr-3">
                    <ShareNetwork size={22} className="text-[#3366CC]" weight="bold" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Open Graph (Compartilhamento Social)</span>
                    <p className="text-xs text-slate-500 mt-0.5">Personalize como o link aparece quando compartilhado em redes sociais</p>
                  </div>
                </div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 transition-transform duration-300 ${expandedSections.opengraph ? 'rotate-180' : ''}`}>
                  <CaretDown size={18} className="text-slate-600" weight="bold" />
                </div>
              </button>
              
              {expandedSections.opengraph && (
                <div className="p-6 space-y-6 bg-white">
                  <div className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start">
                    <span className="mt-0.5 mr-2 text-[#3366CC]">
                      <Info size={16} weight="fill" />
                    </span>
                    <span>
                      Configure como seu link aparecerá quando compartilhado em redes sociais como Facebook, Twitter e LinkedIn.
                    </span>
                  </div>

                  {/* OG Title */}
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start mb-3">
                      <div className="bg-white rounded-full p-1.5 mr-3 border border-slate-200 shadow-sm">
                        <TextT size={18} className="text-[#3366CC]" weight="bold" />
                      </div>
                      <div>
                        <label htmlFor="ogTitle" className="block text-sm font-medium text-slate-700 mb-1">
                          Título (Open Graph)
                        </label>
                        <p className="text-xs text-slate-500">
                          Título que aparecerá ao compartilhar o link (máx. 100 caracteres)
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        id="ogTitle"
                        name="ogTitle"
                        value={ogTitle}
                        onChange={(e) => setOgTitle(e.target.value.substring(0, 100))}
                        placeholder="Título chamativo para seu link"
                        className="block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                      />
                      <div className="absolute right-2 bottom-2 text-xs text-slate-400">
                        {ogTitle.length}/100
                      </div>
                    </div>
                  </div>

                  {/* OG Description */}
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start mb-3">
                      <div className="bg-white rounded-full p-1.5 mr-3 border border-slate-200 shadow-sm">
                        <TextAlignLeft size={18} className="text-[#3366CC]" weight="bold" />
                      </div>
                      <div>
                        <label htmlFor="ogDescription" className="block text-sm font-medium text-slate-700 mb-1">
                          Descrição (Open Graph)
                        </label>
                        <p className="text-xs text-slate-500">
                          Descrição que aparecerá ao compartilhar o link (máx. 200 caracteres)
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <textarea
                        id="ogDescription"
                        name="ogDescription"
                        value={ogDescription}
                        onChange={(e) => setOgDescription(e.target.value.substring(0, 200))}
                        placeholder="Descreva de forma atrativa o conteúdo do seu link"
                        rows={3}
                        className="block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                      />
                      <div className="absolute right-2 bottom-2 text-xs text-slate-400">
                        {ogDescription.length}/200
                      </div>
                    </div>
                  </div>

                  {/* OG Image */}
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start mb-3">
                      <div className="bg-white rounded-full p-1.5 mr-3 border border-slate-200 shadow-sm">
                        <Image size={18} className="text-[#3366CC]" weight="bold" />
                      </div>
                      <div>
                        <label htmlFor="ogImage" className="block text-sm font-medium text-slate-700 mb-1">
                          Imagem URL (Open Graph)
                        </label>
                        <p className="text-xs text-slate-500">
                          URL da imagem que aparecerá ao compartilhar o link (proporção ideal 1.91:1)
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Image size={16} className="text-slate-400" />
                      </div>
                      <input
                        type="url"
                        id="ogImage"
                        name="ogImage"
                        value={ogImage}
                        onChange={(e) => setOgImage(e.target.value)}
                        placeholder="https://exemplo.com/imagem.jpg"
                        className="block w-full pl-10 px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                      />
                    </div>
                  </div>

                  {/* OG Type */}
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start mb-3">
                      <div className="bg-white rounded-full p-1.5 mr-3 border border-slate-200 shadow-sm">
                        <Tag size={18} className="text-[#3366CC]" weight="bold" />
                      </div>
                      <div>
                        <label htmlFor="ogType" className="block text-sm font-medium text-slate-700 mb-1">
                          Tipo de Conteúdo (Open Graph)
                        </label>
                        <p className="text-xs text-slate-500">
                          Categoriza o tipo de conteúdo para as redes sociais
                        </p>
                      </div>
                    </div>
                    <select
                      id="ogType"
                      name="ogType"
                      value={ogType}
                      onChange={(e) => setOgType(e.target.value)}
                      className="block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                    >
                      <option value="website">Website</option>
                      <option value="article">Artigo</option>
                      <option value="product">Produto</option>
                      <option value="book">Livro</option>
                      <option value="profile">Perfil</option>
                      <option value="video">Vídeo</option>
                      <option value="music">Música</option>
                    </select>
                  </div>

                  {/* Preview do compartilhamento */}
                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Preview de Compartilhamento</h4>
                    <div className="bg-white border border-slate-200 rounded-lg shadow overflow-hidden">
                      {ogImage ? (
                        <div className="h-48 bg-slate-100 relative">
                          <img 
                            src={ogImage} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).onerror = null;
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x630/f3f4f6/94a3b8?text=Imagem+Indisponível';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-slate-100 flex items-center justify-center">
                          <div className="text-center text-slate-400">
                            <Image size={40} weight="thin" className="mx-auto mb-2" />
                            <p className="text-sm">Preview da imagem aparecerá aqui</p>
                          </div>
                        </div>
                      )}
                      <div className="p-4">
                        <p className="text-slate-500 text-xs mb-1">exemplo.com</p>
                        <h3 className="font-medium text-slate-900 text-base line-clamp-1">
                          {ogTitle || "Título do seu link"}
                        </h3>
                        <p className="text-slate-600 text-sm mt-1 line-clamp-2">
                          {ogDescription || "Descrição do seu link que aparecerá nas redes sociais quando compartilhado."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2.7 Deep Links - Novo! */}
            <div className="mt-4 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <button
                type="button"
                onClick={() => toggleSection('deeplinks')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 text-left"
              >
                <div className="flex items-center">
                  <div className="bg-blue-50 rounded-lg p-2 mr-3">
                    <BracketsSquare size={22} className="text-[#3366CC]" weight="bold" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Deep Links</span>
                    <p className="text-xs text-slate-500 mt-0.5">Configure redirecionamentos para apps móveis</p>
                  </div>
                </div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 transition-transform duration-300 ${expandedSections.deeplinks ? 'rotate-180' : ''}`}>
                  <CaretDown size={18} className="text-slate-600" weight="bold" />
                </div>
              </button>
              
              {expandedSections.deeplinks && (
                <div className="p-6 space-y-6 bg-white">
                  <div className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start">
                    <span className="mt-0.5 mr-2 text-[#3366CC]">
                      <Info size={16} weight="fill" />
                    </span>
                    <span>
                      Configure redirecionamentos para abrir seu aplicativo móvel diretamente quando o usuário clicar no link. Se o app não estiver instalado, o usuário será direcionado para a loja de aplicativos.
                    </span>
                  </div>

                  {/* iOS App Configuration */}
                  <div className="bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200 overflow-hidden">
                    <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
                      <div className="flex items-center">
                        <div className="bg-white rounded-full p-1 mr-2 shadow-sm">
                          <AppleLogo size={18} className="text-slate-800" weight="fill" />
                        </div>
                        <h3 className="font-medium text-slate-800">Configuração para iOS</h3>
                      </div>
                    </div>
                    <div className="p-4 space-y-4">
                      {/* iOS App ID */}
                      <div>
                        <label htmlFor="iosAppId" className="block text-sm font-medium text-slate-700 mb-1">
                          App ID / Bundle ID
                        </label>
                        <input
                          type="text"
                          id="iosAppId"
                          name="iosAppId"
                          value={iosAppId}
                          onChange={(e) => setIosAppId(e.target.value)}
                          placeholder="id123456789"
                          className="block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                        />
                        <p className="mt-1 text-xs text-slate-500">
                          ID do seu aplicativo na App Store
                        </p>
                      </div>
                      
                      {/* iOS App Path */}
                      <div>
                        <label htmlFor="iosAppPath" className="block text-sm font-medium text-slate-700 mb-1">
                          App Scheme / Universal Link
                        </label>
                        <input
                          type="text"
                          id="iosAppPath"
                          name="iosAppPath"
                          value={iosAppPath}
                          onChange={(e) => setIosAppPath(e.target.value)}
                          placeholder="meuapp://produto/123 ou https://app.meuapp.com/produto/123"
                          className="block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                        />
                        <p className="mt-1 text-xs text-slate-500">
                          URL scheme personalizado ou Universal Link para seu app iOS
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Android App Configuration */}
                  <div className="bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200 overflow-hidden">
                    <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
                      <div className="flex items-center">
                        <div className="bg-white rounded-full p-1 mr-2 shadow-sm">
                          <AndroidLogo size={18} className="text-slate-800" weight="fill" />
                        </div>
                        <h3 className="font-medium text-slate-800">Configuração para Android</h3>
                      </div>
                    </div>
                    <div className="p-4 space-y-4">
                      {/* Android Package */}
                      <div>
                        <label htmlFor="androidPackage" className="block text-sm font-medium text-slate-700 mb-1">
                          Package Name
                        </label>
                        <input
                          type="text"
                          id="androidPackage"
                          name="androidPackage"
                          value={androidPackage}
                          onChange={(e) => setAndroidPackage(e.target.value)}
                          placeholder="com.meuapp.android"
                          className="block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                        />
                        <p className="mt-1 text-xs text-slate-500">
                          Nome do pacote do seu aplicativo Android
                        </p>
                      </div>
                      
                      {/* Android App Path */}
                      <div>
                        <label htmlFor="androidAppPath" className="block text-sm font-medium text-slate-700 mb-1">
                          App Scheme / App Link
                        </label>
                        <input
                          type="text"
                          id="androidAppPath"
                          name="androidAppPath"
                          value={androidAppPath}
                          onChange={(e) => setAndroidAppPath(e.target.value)}
                          placeholder="meuapp://produto/123 ou https://app.meuapp.com/produto/123"
                          className="block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3366CC] focus:border-[#3366CC] text-slate-900 text-sm"
                        />
                        <p className="mt-1 text-xs text-slate-500">
                          URL scheme personalizado ou App Link para seu app Android
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Track Events */}
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="bg-white rounded-full p-1.5 mr-3 border border-slate-200 shadow-sm">
                          <ChartLine size={18} className="text-[#3366CC]" weight="bold" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <label htmlFor="trackEvents" className="text-sm font-medium text-slate-700">
                            Rastrear Eventos de Deep Link
                          </label>
                          <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                            <input
                              type="checkbox"
                              id="trackEvents"
                              name="trackEvents"
                              checked={trackEvents}
                              onChange={() => setTrackEvents(!trackEvents)}
                              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer checked:right-0 checked:border-[#3366CC] transition-all duration-200 shadow-sm"
                            />
                            <label
                              htmlFor="trackEvents"
                              className={`toggle-label block overflow-hidden h-6 rounded-full bg-slate-200 cursor-pointer ${trackEvents ? 'bg-blue-100' : ''}`}
                            ></label>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">
                          Coleta estatísticas detalhadas sobre aberturas de apps via deep link
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Preview do Deep Link */}
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Como funcionará seu Deep Link:</h4>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="bg-green-100 rounded-full p-1 mr-2">
                            <Check size={14} className="text-green-600" weight="bold" />
                          </div>
                          <p className="text-sm text-slate-700">
                            <span className="font-medium">Se o app estiver instalado:</span> O usuário será direcionado diretamente para o conteúdo específico no aplicativo.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-amber-100 rounded-full p-1 mr-2">
                            <ArrowSquareOut size={14} className="text-amber-600" weight="bold" />
                          </div>
                          <p className="text-sm text-slate-700">
                            <span className="font-medium">Se o app não estiver instalado:</span> O usuário será direcionado para a loja de aplicativos correspondente.
                          </p>
                        </div>
                        {(iosAppId || androidPackage) && (
                          <div className="flex items-start">
                            <div className="bg-blue-100 rounded-full p-1 mr-2">
                              <DeviceMobile size={14} className="text-[#3366CC]" weight="bold" />
                            </div>
                            <p className="text-sm text-slate-700">
                              <span className="font-medium">Configuração atual:</span> Deep links configurados para {[
                                iosAppId && 'iOS',
                                androidPackage && 'Android'
                              ].filter(Boolean).join(' e ')}.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </form>
      
      {/* CSS para os toggles */}
      <style jsx global>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #3366CC;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #e9f0ff;
        }
        .toggle-label {
          display: block;
          overflow: hidden;
          cursor: pointer;
          border-radius: 9999px;
        }
        
        /* Para esconder as setas do input number */
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
} 