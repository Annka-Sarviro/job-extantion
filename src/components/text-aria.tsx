import cn from "clsx"
import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { z } from "zod"

import type { RegSchema } from "./loginForm"
import { AddDataSchema } from "./submitForm"

type AddDataType = z.infer<typeof AddDataSchema>
type RegType = z.infer<typeof RegSchema>

type FormDataType = AddDataType | RegType

type RegisterType = UseFormRegister<FormDataType>

export interface TextAreaProps {
  name: keyof AddDataType | keyof RegType
  placeholder: string
  className?: string
  label?: string
  register: RegisterType
  errors: FieldErrors
  value?: string
  id?: string
  rows?: number
  resetField(name: string): void
}

export const TextArea = ({
  name,
  placeholder,
  label,
  className,
  rows = 4,
  register,
  resetField,
  errors,
  value,
  id
}: TextAreaProps) => {
  const error = errors[name]

  const handleResetField = (name: string) => {
    resetField(name)
  }

  return (
    <div className={cn("relative", [className])} id={id}>
      {label && (
        <label
          htmlFor={`textarea-${name}`}
          className="mb-2 block font-nunito text-base font-medium leading-[135%] text-text-primary">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="relative flex w-full items-center">
          <textarea
            id={`textarea-${name}`}
            rows={rows}
            className={cn(
              "peer w-full rounded-xl border px-6 py-2 font-nunito text-base font-medium text-text-primary transition placeholder:font-nunito placeholder:text-text-gray placeholder-shown:border-text-primary focus:border-accent focus:outline-none active:border-accent",
              {
                ["border-successful"]: !error,
                ["border-error placeholder-shown:border-error focus:border-error active:border-error"]:
                  error
              }
            )}
            placeholder={placeholder}
            {...(value && { value })}
            {...register(name)}
            aria-describedby={`textareaError-${name}`}
          />
        </div>
        {error && (
          <span
            id={`textareaError-${name}`}
            className="absolute left-0 top-[46px] inline-block font-nunito text-base font-medium text-error">
            {String(error?.message)}
          </span>
        )}
      </div>
    </div>
  )
}
