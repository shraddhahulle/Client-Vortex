
// Direct import from the sonner package with different name
import { toast as originalToast } from "sonner";

// Re-export with original name
export { originalToast as toast };
