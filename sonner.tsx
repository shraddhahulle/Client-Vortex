
import { useTheme } from "next-themes"
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner"

// Use a more specific and non-circular type definition
type SonnerToasterProps = React.ComponentProps<typeof SonnerToaster>

// Rename the component to avoid circular references
const SonnerToasterComponent = ({ ...props }: SonnerToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <SonnerToaster
      theme={theme as SonnerToasterProps["theme"]}
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

// Export with clean aliases that don't create circular references
export { SonnerToasterComponent as Toaster, sonnerToast as toast }
