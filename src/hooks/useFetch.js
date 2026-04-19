import { useCallback, useEffect, useState } from "react";

/**
 * Hook genérico de fetching. Maneja data/loading/error y expone refetch().
 * Cancela la petición si el componente se desmonta o la URL cambia.
 *
 * @param {string|null} url - Si es null/undefined, no dispara fetch.
 * @returns {{ data: any, loading: boolean, error: Error|null, refetch: () => void }}
 */
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);

  const refetch = useCallback(() => {
    setReloadCount((c) => c + 1);
  }, []);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} — ${res.statusText}`);
        }
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url, reloadCount]);

  return { data, loading, error, refetch };
}
