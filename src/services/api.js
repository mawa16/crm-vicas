// ─── Configuration ────────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

function getToken() {
  return localStorage.getItem('vicas_token');
}

function setToken(token) {
  localStorage.setItem('vicas_token', token);
}

function removeToken() {
  localStorage.removeItem('vicas_token');
}

// ─── Requête de base ──────────────────────────────────────────────────────────
async function request(method, endpoint, data = null, isFormData = false) {
  const headers = {};

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  headers['Accept'] = 'application/json';

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = isFormData ? data : JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  // Token expiré → déconnexion automatique
  if (response.status === 401) {
    removeToken();
    window.location.reload();
    return;
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erreur serveur' }));
    throw new Error(error.message || `Erreur ${response.status}`);
  }

  // Réponses vides (ex: DELETE 204)
  if (response.status === 204) return null;

  return response.json();
}

const get    = (endpoint)         => request('GET',    endpoint);
const post   = (endpoint, data, isFormData) => request('POST',   endpoint, data, isFormData);
const put    = (endpoint, data)   => request('PUT',    endpoint, data);
const patch  = (endpoint, data)   => request('PATCH',  endpoint, data);
const del    = (endpoint)         => request('DELETE', endpoint);

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const auth = {
  login: async (email, password) => {
    const data = await post('/login', { email, password });
    if (data?.token) setToken(data.token);
    return data; // { token, user }
  },

  logout: async () => {
    await post('/logout');
    removeToken();
  },

  me: () => get('/me'),

  getToken,
  removeToken,
};

// ─── Chantiers ────────────────────────────────────────────────────────────────
export const chantiers = {
  list:    ()           => get('/chantiers'),
  get:     (id)         => get(`/chantiers/${id}`),
  create:  (data)       => post('/chantiers', data),
  update:  (id, data)   => patch(`/chantiers/${id}`, data),
  delete:  (id)         => del(`/chantiers/${id}`),

  // Avancements
  getAvancements:  (id)       => get(`/chantiers/${id}/avancements`),
  addAvancement:   (id, data) => post(`/chantiers/${id}/avancements`, data),

  // Photos
  getPhotos:  (id)       => get(`/chantiers/${id}/photos`),
  addPhoto:   (id, form) => post(`/chantiers/${id}/photos`, form, true), // FormData
  deletePhoto:(id)       => del(`/photos/${id}`),

  // Blocages
  getBlocages:  (id)       => get(`/chantiers/${id}/blocages`),
  addBlocage:   (id, data) => post(`/chantiers/${id}/blocages`, data),
  updateBlocage:(id, data) => patch(`/blocages/${id}`, data),
};

// ─── Clients ──────────────────────────────────────────────────────────────────
export const clients = {
  list:   ()          => get('/clients'),
  get:    (id)        => get(`/clients/${id}`),
  create: (data)      => post('/clients', data),
  update: (id, data)  => put(`/clients/${id}`, data),
  delete: (id)        => del(`/clients/${id}`),
};

// ─── Contrats ─────────────────────────────────────────────────────────────────
export const contrats = {
  list:   ()          => get('/contrats'),
  get:    (id)        => get(`/contrats/${id}`),
  create: (data)      => post('/contrats', data),
  update: (id, data)  => put(`/contrats/${id}`, data),
  delete: (id)        => del(`/contrats/${id}`),
};

// ─── Notifications ────────────────────────────────────────────────────────────
export const notifications = {
  list:     ()   => get('/notifications'),
  markRead: (id) => patch(`/notifications/${id}/lu`),
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
export const dashboard = {
  get: () => get('/dashboard'),
};

// ─── Users (Admin) ────────────────────────────────────────────────────────────
export const users = {
  list:         ()          => get('/users'),
  get:          (id)        => get(`/users/${id}`),
  create:       (data)      => post('/users', data),
  update:       (id, data)  => put(`/users/${id}`, data),
  delete:       (id)        => del(`/users/${id}`),
  toggleActive: (id)        => patch(`/users/${id}/toggle-active`),
};
