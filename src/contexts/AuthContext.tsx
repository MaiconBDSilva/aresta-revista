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
import { getPerfisStore } from '@/services/autoresService';
import {
  subscribeToTableChanges,
  MOCK_DB_TABLES,
  resetMockDatabase,
} from '@/services/mockRepository';
import { ARTIGOS_MOCK } from '@/services/mocks/artigos.mock';
import { COLUNAS_MOCK } from '@/services/mocks/autores.mock';
import { REVISAO_COMENTARIOS_MOCK } from '@/services/mocks/revisao.mock';
import { COMENTARIOS_MOCK } from '@/services/mocks/comentarios.mock';

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
  restaurarDadosOriginais: () => void;
}

const STORAGE_KEY = 'aresta_mock_auth_profile_id';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Padrão inicial: Lucas Campos (primeiro autor titular) para conveniência no protótipo
  const [perfil, setPerfil] = useState<Perfil | null>(PERFIS_AUTORES_MOCK[0]);
  const [perfisDisponiveis, setPerfisDisponiveis] = useState<Perfil[]>(TODOS_PERFIS_PROTOTIPO);
  const [carregado, setCarregado] = useState(false);

  const sincronizarPerfis = useCallback(() => {
    try {
      const perfisAtuais = getPerfisStore();
      setPerfisDisponiveis(perfisAtuais);

      const storedId = localStorage.getItem(STORAGE_KEY);
      if (storedId === 'anonimo') {
        setPerfil(null);
      } else if (storedId) {
        const encontrado = perfisAtuais.find((p) => p.id === storedId);
        if (encontrado) {
          setPerfil(encontrado);
        }
      } else {
        // Se ainda não gravou, usa o primeiro autor da lista
        setPerfil(perfisAtuais[0] || null);
      }
    } catch {
      // Ignora erro em ambientes restritos
    } finally {
      setCarregado(true);
    }
  }, []);

  useEffect(() => {
    sincronizarPerfis();

    // Inscreve-se para atualizar dados em tempo real caso um perfil seja editado em outra tela
    const unsubscribe = subscribeToTableChanges(MOCK_DB_TABLES.PERFIS, () => {
      sincronizarPerfis();
    });

    return unsubscribe;
  }, [sincronizarPerfis]);

  const loginAs = useCallback(
    (perfilId: string | null) => {
      if (!perfilId) {
        setPerfil(null);
        try {
          localStorage.setItem(STORAGE_KEY, 'anonimo');
        } catch {}
        return;
      }

      const perfisAtuais = getPerfisStore();
      const novo = perfisAtuais.find((p) => p.id === perfilId);
      if (novo) {
        setPerfil(novo);
        try {
          localStorage.setItem(STORAGE_KEY, novo.id);
        } catch {}
      }
    },
    []
  );

  const logout = useCallback(() => {
    loginAs(null);
  }, [loginAs]);

  const restaurarDadosOriginais = useCallback(() => {
    resetMockDatabase({
      artigos: ARTIGOS_MOCK,
      perfis: TODOS_PERFIS_PROTOTIPO,
      colunas: COLUNAS_MOCK,
      revisoes: REVISAO_COMENTARIOS_MOCK,
      comentarios: COMENTARIOS_MOCK,
    });
    sincronizarPerfis();
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }, [sincronizarPerfis]);

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
      perfisDisponiveis,
      restaurarDadosOriginais,
    }),
    [perfil, papel, isAutenticado, isAutor, isAdmin, loginAs, logout, perfisDisponiveis, restaurarDadosOriginais]
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
