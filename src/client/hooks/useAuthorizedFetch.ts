import { useCallback, useEffect, useMemo, useState } from "react";

import { useAuth } from "../context/AuthContext";

interface ReturnValues<T> {
  data: T | null;
  error: Response | null;
  loading: boolean;
  revalidate: () => void;
}

export function useAuthorizedFetch<T>(
  apiPath: string,
  // eslint-disable-next-line no-unused-vars
  fetcher: (apiPath: string, userId: string) => Promise<T>,
): ReturnValues<T> {
  const { loggedIn, userId } = useAuth();

  const [result, setResult] = useState({
    data: null,
    error: null,
    loading: true,
  });

  const fetch = useCallback(() => {
    if (!loggedIn) {
      return;
    }

    setResult(() => ({
      data: null,
      error: null,
      loading: true,
    }));

    const promise = fetcher(apiPath, userId);

    promise.then((data) => {
      setResult((cur) => ({
        ...cur,
        data,
        loading: false,
      }));
    });

    promise.catch((error) => {
      setResult((cur) => ({
        ...cur,
        error,
        loading: false,
      }));
    });
  }, [apiPath, fetcher, loggedIn, userId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const res = useMemo(
    () => ({
      ...result,
      revalidate: fetch,
    }),
    [fetch, result],
  );

  return res;
}
