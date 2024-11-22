import cn from "classnames"
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode
  variant?: "primary" | "ghost"
  size?: "big" | "small"
  disabled?: boolean
}

export const Button = ({
  variant = "ghost",
  disabled = false,
  children,
  className,
  size = "small",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "text-text-primary flex  items-center justify-center rounded-xl py-2 font-nunito text-base font-semibold duration-300",
        className,
        {
          ["min-w-[180px] px-8"]: size == "small",
          ["min-w-[260px] px-12"]: size == "big"
        },

        !disabled && {
          ["ring-text-primary hover:ring-accent focus:ring-accent bg-transparent ring-1 ring-inset hover:shadow-button_hover hover:ring-[3px] focus:shadow-button_hover focus:ring-[3px]"]:
            variant == "ghost",
          ["border border-text-primary hover:border-background-dark_blue hover:bg-background-sidebar focus:border-background-dark_blue focus:bg-background-sidebar bg-background-blue "]:
            variant == "primary"
        },
        disabled && {
          ["bg-background-sidebar pointer-events-none ring-transparent"]:
            variant == "ghost",
          ["bg-background-sidebar border:background-sidebar pointer-events-none text-card-gray"]:
            variant == "primary"
        }
      )}
      {...props}>
      {children}
    </button>
  )
}
