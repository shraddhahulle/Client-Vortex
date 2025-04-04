
// Direct import from the sonner package
import { toast as sonnerToast } from "sonner";

// Re-export with a different name to avoid circular reference
export { sonnerToast as toast };
