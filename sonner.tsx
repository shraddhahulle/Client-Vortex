
import { useTheme } from "next-themes"
import * as Sonner from "sonner"

// Use a simpler approach that avoids circular references
const CustomToaster = ({ 
  ...props 
}: React.ComponentPropsWithoutRef<typeof Sonner.Toaster>) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner.Toaster
      theme={theme as React.ComponentPropsWithoutRef<typeof Sonner.Toaster>["theme"]}
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
  )
}

// Create clean exports without circular references
export { CustomToaster as Toaster }
export const toast = Sonner.toast
