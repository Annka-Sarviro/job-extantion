import cn from "clsx"
import { useState } from "react"
import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type { z } from "zod"

import type { RegSchema } from "./loginForm"

export interface InputPasswordProps {
  name: keyof z.infer<typeof RegSchema>
  placeholder: string
  className: string
  label?: string
  register: UseFormRegister<z.infer<typeof RegSchema>>
  errors: FieldErrors
  type: string
  value?: string
  id?: string
  resetField(name: string): void
}

const EyeClosed_icon = ({ className, ...props }: { className?: string }) => {
  return (
    <svg
      {...props}
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.46967 4.46967C4.76256 4.17678 5.23744 4.17678 5.53033 4.46967L19.5303 18.4697C19.8232 18.7626 19.8232 19.2374 19.5303 19.5303C19.2374 19.8232 18.7626 19.8232 18.4697 19.5303L4.46967 5.53033C4.17678 5.23744 4.17678 4.76256 4.46967 4.46967Z"
        fill="#6E6D6C"
      />
      <path
        d="M3.79688 3.76367L20.1957 20.1625"
        stroke="#6E6D6C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="12.0025"
        cy="11.9986"
        r="3.23684"
        stroke="#6E6D6C"
        strokeWidth="1.5"
      />
      <path
        d="M20.5953 10.3664C21.494 11.2967 21.494 12.7026 20.5953 13.6329C18.6471 15.6497 15.4811 18.1829 12.0006 18.1829C8.52018 18.1829 5.35422 15.6497 3.40594 13.6329C2.50729 12.7026 2.50729 11.2967 3.40594 10.3664C5.35422 8.34951 8.52018 5.81641 12.0006 5.81641C15.4811 5.81641 18.6471 8.34951 20.5953 10.3664Z"
        stroke="#6E6D6C"
        strokeWidth="1.5"
      />
    </svg>
  )
}

const EyeOpen_icon = ({ className, ...props }: { className?: string }) => {
  return (
    <svg
      {...props}
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="12.0025"
        cy="11.9986"
        r="3.23684"
        stroke="#6E6D6C"
        strokeWidth="1.5"
      />
      <path
        d="M20.5953 10.3664C21.494 11.2967 21.494 12.7026 20.5953 13.6329C18.6471 15.6497 15.4811 18.1829 12.0006 18.1829C8.52018 18.1829 5.35422 15.6497 3.40594 13.6329C2.50729 12.7026 2.50729 11.2967 3.40594 10.3664C5.35422 8.34951 8.52018 5.81641 12.0006 5.81641C15.4811 5.81641 18.6471 8.34951 20.5953 10.3664Z"
        stroke="#6E6D6C"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export const InputPassword: React.FC<InputPasswordProps> = ({
  name,
  placeholder,
  className,
  type,
  register,
  resetField,
  errors,
  label,
  value,
  id
}) => {
  const error = errors[name]

  const handleResetField = (name: string) => {
    resetField(name)
  }

  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className={cn("relative", [className])} id={id}>
      {label && (
        <label
          htmlFor={`input-${name}`}
          className="mb-2 block font-nunito text-base font-medium leading-[135%] text-text-primary">
          {label}
        </label>
      )}
      <div className="relative">
        <div className={"relative flex w-full items-center"}>
          <input
            id={`input-${name}`}
            className={cn(
              "peer h-8 w-full rounded-xl border py-1 px-4 font-nunito text-base transition font-medium text-text-primary  placeholder:font-nunito placeholder:text-text-gray placeholder-shown:border-text-primary focus:border-accent focus:outline-none active:border-accent",
              {
                ["border-successful"]: !error,
                ["border-error placeholder-shown:border-error focus:border-error active:border-error"]:
                  error
              }
            )}
            placeholder={placeholder}
            type={showPassword ? type : "password"}
            {...(value && { value })}
            {...register(name)}
            aria-describedby={`inputError-${name}`}
          />

          <button
            type="button"
            onClick={toggleShowPassword}
            className={
              "absolute right-4 top-[50%] mt-auto h-6 translate-y-[-50%] cursor-pointer"
            }>
            {showPassword ? <EyeClosed_icon /> : <EyeOpen_icon />}
          </button>
        </div>
        {errors[name] && (
          <span
            id={`inputError-${name}`}
            className="absolute left-0 top-[46px] inline-block font-nunito text-base font-medium text-color2">
            {String(errors[name]?.message)}
          </span>
        )}
      </div>
    </div>
  )
}
