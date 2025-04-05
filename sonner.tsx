
// Import from sonner directly with completely different alias names
import { toast as originalToast, Toaster as OriginalToaster } from "sonner";

// Re-export with the desired names
export const toast = originalToast;
export const Toaster = OriginalToaster;
