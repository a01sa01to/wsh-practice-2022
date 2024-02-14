import { useCallback, useState } from "react";

import { useAuth } from "../context/AuthContext";

interface UseMutationOptions {
  method: string;
  auth?: boolean;
}

interface ReturnValues<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

export function useMutation<T>(
  apiPath: string,
  { auth, method }: UseMutationOptions,
): [body: (body: any) => Promise<void>, ReturnValues<T>] {
  const [result, setResult] = useState({
    data: null,
    error: null,
    loading: true,
  });
  const { loggedIn, userId } = useAuth();

  const mutate = useCallback(
    async (data) => {
      if (auth && !loggedIn) {
        return;
      }

      setResult(() => ({
        data: null,
        error: null,
        loading: true,
      }));

      try {
        const res = await fetch(apiPath, {
          body: JSON.stringify(data),
          headers: auth ? { "x-app-userid": userId } : {},
          method,
        }).then((res) => {
          if (!res.ok) {
            throw new Error("failed to fetch");
          }
          return res.json();
        });

        setResult((cur) => ({
          ...cur,
          data: res,
          loading: false,
        }));
      } catch (error) {
        setResult((cur) => ({
          ...cur,
          error,
          loading: false,
        }));
      }
    },
    [apiPath, auth, loggedIn, method, userId],
  );

  return [mutate, result];
}