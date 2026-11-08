'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { Perfil } from '@/types/autor.types';
import type { PapelUsuario } from '@/types/database.types';
import {
  PERFIS_AUTORES_MOCK,
  PERFIL_LEITOR_MOCK,
  PERFIL_ADMIN_MOCK,
  TODOS_PERFIS_PROTOTIPO,
} from '@/services/mocks/autores.mock';

export type PapelSessao = PapelUsuario | 'visitante';

export interface AuthContextType {
  perfil: Perfil | null;
  papel: PapelSessao;
  isAutenticado: boolean;
  isAutor: boolean;
  isAdmin: boolean;
  loginAs: (perfilId: string | null) => void;
  logout: () => void;
  perfisDisponiveis: Perfil[];
}

const STORAGE_KEY = 'aresta_mock_auth_profile_id';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Padrão inicial: Lucas Campos (primeiro autor titular) para conveniência no protótipo
  const [perfil, setPerfil] = useState<Perfil | null>(PERFIS_AUTORES_MOCK[0]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    try {
      const storedId = localStorage.getItem(STORAGE_KEY);
      if (storedId === 'anonimo') {
        setPerfil(null);
      } else if (storedId) {
        const encontrado = TODOS_PERFIS_PROTOTIPO.find((p) => p.id === storedId);
        if (encontrado) {
          setPerfil(encontrado);
        }
      }
    } catch {
      // Ignora erro de localStorage em ambientes restritos
    } finally {
      setCarregado(true);
    }
  }, []);

  const loginAs = useCallback((perfilId: string | null) => {
    if (!perfilId) {
      setPerfil(null);
      try {
        localStorage.setItem(STORAGE_KEY, 'anonimo');
      } catch {}
      return;
    }

    const novo = TODOS_PERFIS_PROTOTIPO.find((p) => p.id === perfilId);
    if (novo) {
      setPerfil(novo);
      try {
        localStorage.setItem(STORAGE_KEY, novo.id);
      } catch {}
    }
  }, []);

  const logout = useCallback(() => {
    loginAs(null);
  }, [loginAs]);

  const papel: PapelSessao = perfil ? perfil.papel : 'visitante';
  const isAutenticado = perfil !== null;
  const isAutor = perfil?.papel === 'autor';
  // Todo autor possui privilégios administrativos no portal, e admins gerais também
  const isAdmin = perfil?.papel === 'autor' || perfil?.papel === 'admin';

  const value = useMemo(
    () => ({
      perfil,
      papel,
      isAutenticado,
      isAutor,
      isAdmin,
      loginAs,
      logout,
      perfisDisponiveis: TODOS_PERFIS_PROTOTIPO,
    }),
    [perfil, papel, isAutenticado, isAutor, isAdmin, loginAs, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
}
