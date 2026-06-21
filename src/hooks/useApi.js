import { useState, useEffect } from 'react';

// Hook générique pour appels API avec fallback sur données mock
export function useApi(apiFn, fallback = [], deps = []) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    apiFn()
      .then(res  => { if (!cancelled) setData(res); })
      .catch(err => {
        if (!cancelled) {
          console.warn('API indisponible, utilisation des données mock :', err.message);
          setData(fallback);
          setError(err.message);
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, deps);

  return { data: data ?? fallback, loading, error, setData };
}
