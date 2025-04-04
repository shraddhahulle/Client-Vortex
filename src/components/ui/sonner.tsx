
import * as React from "react";
import { useTheme } from "next-themes";
import { toast, Toaster } from "sonner";

const SonnerToasterWrapper = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof Toaster>) => {
  const { theme = "system" } = useTheme();

  return (
    <Toaster
      theme={theme as React.ComponentPropsWithoutRef<typeof Toaster>["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

// Export the component and the toast function
export { SonnerToasterWrapper as Toaster, toast };
