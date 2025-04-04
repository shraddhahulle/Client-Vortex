
// Re-exporting the toast function from the sonner library
import { toast as sonnerToast } from "sonner";

// Export with a different name to avoid circular reference
export const toast = sonnerToast;
