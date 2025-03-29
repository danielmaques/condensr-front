"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  roles: string[];
  customDomain?: string;
  notificationsEnabled: boolean;
}

export default function ConfiguracoesPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [customDomain, setCustomDomain] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // This would be replaced with an actual API call
        // const response = await fetch("https://condensr-back.onrender.com/api/user/profile", {
        //   headers: {
        //     "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        //   }
        // });
        // const data = await response.json();
        // setProfile(data.user);
        // setName(data.user.name);
        // setNotificationsEnabled(data.user.notificationsEnabled);
        // setCustomDomain(data.user.customDomain || "");

        // For demonstration, use mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockUser: UserProfile = {
          id: "c8442628-e180-4d6c-82ef-00620f0ddf7a",
          name: "Daniel Marques",
          email: "ddanielddiniz@gmail.com",
          roles: ["admin"],
          customDomain: "",
          notificationsEnabled: true
        };

        setProfile(mockUser);
        setName(mockUser.name);
        setNotificationsEnabled(mockUser.notificationsEnabled);
        setCustomDomain(mockUser.customDomain || "");
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setMessage({
          type: "error",
          text: "Falha ao carregar perfil do usuário. Por favor, tente novamente."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Update profile handler
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      // This would be replaced with an actual API call
      // const response = await fetch("https://condensr-back.onrender.com/api/user/profile", {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      //   },
      //   body: JSON.stringify({
      //     name,
      //     notificationsEnabled,
      //     customDomain: customDomain || null
      //   })
      // });
      
      // For demonstration, just update the state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfile(prev => {
        if (!prev) return null;
        return {
          ...prev,
          name,
          notificationsEnabled,
          customDomain: customDomain || undefined
        };
      });

      setMessage({
        type: "success",
        text: "Perfil atualizado com sucesso!"
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      setMessage({
        type: "error",
        text: "Falha ao atualizar perfil. Por favor, tente novamente."
      });
    } finally {
      setSaving(false);
    }
  };

  // Change password handler
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    if (newPassword !== confirmPassword) {
      setMessage({
        type: "error",
        text: "As novas senhas não coincidem."
      });
      setSaving(false);
      return;
    }

    if (newPassword.length < 8) {
      setMessage({
        type: "error",
        text: "A nova senha deve ter pelo menos 8 caracteres."
      });
      setSaving(false);
      return;
    }

    try {
      // This would be replaced with an actual API call
      // const response = await fetch("https://condensr-back.onrender.com/api/user/change-password", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      //   },
      //   body: JSON.stringify({
      //     currentPassword,
      //     newPassword
      //   })
      // });
      
      // For demonstration, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setMessage({
        type: "success",
        text: "Senha alterada com sucesso!"
      });
    } catch (error) {
      console.error("Failed to change password:", error);
      setMessage({
        type: "error",
        text: "Falha ao alterar senha. Verifique se a senha atual está correta."
      });
    } finally {
      setSaving(false);
    }
  };

  // Delete account handler
  const handleDeleteAccount = async () => {
    const confirmed = confirm(
      "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita e todos os seus links e dados serão permanentemente removidos."
    );

    if (!confirmed) return;

    const secondConfirmation = prompt(
      'Para confirmar a exclusão, digite "EXCLUIR" abaixo:'
    );

    if (secondConfirmation !== "EXCLUIR") {
      alert("Exclusão de conta cancelada.");
      return;
    }

    try {
      // This would be replaced with an actual API call
      // const response = await fetch("https://condensr-back.onrender.com/api/user/account", {
      //   method: "DELETE",
      //   headers: {
      //     "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      //   }
      // });
      
      // For demonstration, just log out
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Logout
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      
      // Redirect to home
      router.push("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("Falha ao excluir conta. Por favor, tente novamente.");
    }
  };

  if (loading) {
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
        <p className="mt-4 text-gray-500">Carregando configurações...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-2xl leading-6 font-medium text-gray-900">
          Configurações de Conta
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Gerencie suas preferências e informações pessoais.
        </p>
      </div>

      {message.text && (
        <div
          className={`mt-4 rounded-md p-4 ${
            message.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          <p>{message.text}</p>
        </div>
      )}

      <div className="mt-6 shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <h4 className="text-lg font-medium text-gray-900">Informações do Perfil</h4>
          <form onSubmit={handleUpdateProfile} className="mt-5 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  disabled
                  value={profile?.email || ""}
                  className="shadow-sm bg-gray-100 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md cursor-not-allowed"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                O e-mail não pode ser alterado. Entre em contato com o suporte se precisar atualizá-lo.
              </p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label htmlFor="customDomain" className="block text-sm font-medium text-gray-700">
                Domínio Personalizado (opcional)
              </label>
              <div className="mt-1">
                <input
                  id="customDomain"
                  name="customDomain"
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="exemplo.com.br"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Para utilizar um domínio personalizado, você precisará configurar um registro CNAME para o seu domínio.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notifications"
                  name="notifications"
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="notifications" className="font-medium text-gray-700">
                  Receber notificações
                </label>
                <p className="text-gray-500">
                  Receba atualizações sobre novas funcionalidades, dicas e relatórios de uso.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  saving
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {saving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Salvando...
                  </>
                ) : (
                  "Salvar alterações"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="mt-6 shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <h4 className="text-lg font-medium text-gray-900">Alterar Senha</h4>
          <form onSubmit={handleChangePassword} className="mt-5 space-y-6">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Senha Atual
              </label>
              <div className="mt-1">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                Nova Senha
              </label>
              <div className="mt-1">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Mínimo de 8 caracteres.
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar Nova Senha
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  saving
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {saving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Alterando...
                  </>
                ) : (
                  "Alterar Senha"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-6 shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <h4 className="text-lg font-medium text-red-600">Zona de Perigo</h4>
          <p className="mt-1 text-sm text-gray-500">
            Ações irreversíveis que afetarão permanentemente sua conta.
          </p>
          <div className="mt-5">
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            >
              Excluir minha conta
            </button>
            <p className="mt-2 text-xs text-gray-500">
              Ao excluir sua conta, todos os seus dados, incluindo links encurtados, estatísticas e
              configurações serão permanentemente excluídos e não poderão ser recuperados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 