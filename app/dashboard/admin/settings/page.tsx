"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminSettingsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para a página principal de admin
    router.push("/dashboard/admin");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-500">Redirecionando...</p>
      </div>
    </div>
  );
} 