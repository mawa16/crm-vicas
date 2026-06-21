import { createContext, useContext, useState, useEffect } from 'react';
import { auth as authApi } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restaurer la session si un token existe déjà
  useEffect(() => {
    const token = authApi.getToken();
    if (token) {
      authApi.me()
        .then(data => {
          setUser({
            userId: data.id,
            nom:    data.name,
            email:  data.email,
            role:   data.role,
          });
        })
        .catch(() => {
          authApi.removeToken();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (account) => setUser(account);

  const logout = async () => {
    try { await authApi.logout(); } catch (_) {}
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Inter, sans-serif', color:'#6B7A99', fontSize:14 }}>
        Chargement…
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// Helpers de permission
export const ROLE = {
  DIRECTION:        'Direction',
  ADMIN:            'Administrateur',
  CHEF_CHANTIER:    'Chef de chantier',
  COMMERCIAL:       'Commercial',
};

export function can(user, action) {
  if (!user) return false;
  const r = user.role;

  const rules = {
    // Pages
    voir_dashboard:       [ROLE.DIRECTION, ROLE.ADMIN, ROLE.CHEF_CHANTIER, ROLE.COMMERCIAL],
    voir_chantiers:       [ROLE.DIRECTION, ROLE.CHEF_CHANTIER, ROLE.COMMERCIAL],
    voir_clients:         [ROLE.DIRECTION, ROLE.COMMERCIAL],
    voir_rapports:        [ROLE.DIRECTION, ROLE.CHEF_CHANTIER],
    voir_alertes:         [ROLE.DIRECTION, ROLE.CHEF_CHANTIER],
    voir_galerie:         [ROLE.DIRECTION, ROLE.CHEF_CHANTIER],
    voir_utilisateurs:    [ROLE.ADMIN],
    voir_parametres:      [ROLE.DIRECTION, ROLE.ADMIN, ROLE.CHEF_CHANTIER, ROLE.COMMERCIAL],
    voir_fiche:           [ROLE.DIRECTION, ROLE.CHEF_CHANTIER, ROLE.COMMERCIAL],

    // Actions chantiers
    modifier_chantier:    [ROLE.DIRECTION, ROLE.CHEF_CHANTIER],
    ajouter_photo:        [ROLE.DIRECTION, ROLE.CHEF_CHANTIER],
    signaler_blocage:     [ROLE.CHEF_CHANTIER],
    voir_tous_chantiers:  [ROLE.DIRECTION, ROLE.COMMERCIAL],

    // Actions clients
    modifier_client:      [ROLE.DIRECTION, ROLE.COMMERCIAL],
    ajouter_client:       [ROLE.DIRECTION, ROLE.COMMERCIAL],
    supprimer_client:     [ROLE.DIRECTION, ROLE.COMMERCIAL],

    // Actions rapports
    creer_rapport:        [ROLE.DIRECTION, ROLE.CHEF_CHANTIER],
    valider_rapport:      [ROLE.DIRECTION],

    // Paramètres
    modifier_types:       [ROLE.DIRECTION],
    modifier_parametres:  [ROLE.DIRECTION, ROLE.ADMIN],

    // Utilisateurs
    gerer_utilisateurs:   [ROLE.ADMIN],
  };

  return rules[action]?.includes(r) ?? false;
}
