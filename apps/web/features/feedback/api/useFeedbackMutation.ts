// apps/web/features/feedback/api/useFeedbackMutation.ts
import { useMutation } from "@tanstack/react-query";
import { feedbackService, FeedbackCreate } from "./feedbackService";
import { toast } from "sonner";

export const useFeedbackMutation = () => {
  return useMutation({
    mutationFn: (data: FeedbackCreate) => feedbackService.sendFeedback(data),
    onSuccess: (response) => {
      toast.success(response.message || "Feedback enviado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao enviar feedback.");
    },
  });
};
