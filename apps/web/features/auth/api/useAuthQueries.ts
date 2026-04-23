// apps/web/features/auth/api/useAuthQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "./authService";

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

export const useUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => authService.getMe(),
    retry: false,
    staleTime: 1000 * 60 * 30, // 30 minutos
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (token: string) => authService.loginWithGoogle(token),
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.user(), data.user);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(authKeys.user(), null);
      queryClient.clear();
    },
  });
};
