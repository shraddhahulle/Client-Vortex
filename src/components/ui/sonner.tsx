
import { useTheme } from "next-themes"
import * as SonnerLib from "sonner"

const Toaster = ({ 
  ...props 
}: React.ComponentPropsWithoutRef<typeof SonnerLib.Toaster>) => {
  const { theme = "system" } = useTheme()

  return (
    <SonnerLib.Toaster
      theme={theme as React.ComponentPropsWithoutRef<typeof SonnerLib.Toaster>["theme"]}
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

export { Toaster }
