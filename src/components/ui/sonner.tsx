
import * as React from "react";
import { useTheme } from "next-themes";
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

const SonnerToasterWrapper = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof SonnerToaster>) => {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme as React.ComponentPropsWithoutRef<typeof SonnerToaster>["theme"]}
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
export { SonnerToasterWrapper as Toaster, sonnerToast as toast };
