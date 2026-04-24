// apps/web/services/feedbackService.ts
import { apiFetch } from "@/lib/api-client";

export interface FeedbackCreate {
  user_name: string;
  user_email?: string | null;
  page_url: string;
  message: string;
  type: "feedback" | "bug" | "suggestion";
  metadata?: Record<string, any>;
}

export interface FeedbackResponse {
  status: string;
  message: string;
}

export const feedbackService = {
  sendFeedback: async (data: FeedbackCreate): Promise<FeedbackResponse> => {
    return apiFetch<FeedbackResponse>("/feedback/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
