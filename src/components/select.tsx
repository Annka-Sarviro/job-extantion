import cn from "clsx"
import { useState } from "react"
import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { z } from "zod"

import type { RegSchema } from "./loginForm"
import { AddDataSchema } from "./submitForm"

type AddDataType = z.infer<typeof AddDataSchema>
type RegType = z.infer<typeof RegSchema>

type FormDataType = AddDataType | RegType

type RegisterType = UseFormRegister<FormDataType>

export interface SelectProps {
  name: keyof AddDataType | keyof RegType
  placeholder: string
  className?: string
  label?: string
  register: RegisterType
  errors: FieldErrors
  options: { label: string; value: string }[]
  value?: string
  id?: string
  resetField(name: string): void
}

export const Select = ({
  name,
  label,
  className,
  options,
  register,

  errors,
  value,
  id
}: SelectProps) => {
  const error = errors[name]

  const [isOpen, setIsOpen] = useState(false)

  const handleFocus = () => setIsOpen(true)
  const handleBlur = () => setIsOpen(false)
  const handleChange = () => setIsOpen(false)

  return (
    <div className={cn("relative", [className])} id={id}>
      {label && (
        <label
          htmlFor={`select-${name}`}
          className="mb-2 block font-nunito text-base font-medium leading-[135%] text-text-primary">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="relative flex w-full items-center">
          <select
            id={`select-${name}`}
            className={cn(
              "peer appearance-none cursor-pointer w-full rounded-xl border px-4 py-1 font-nunito text-base font-medium text-text-primary transition placeholder:font-nunito placeholder:text-text-gray placeholder-shown:border-text-primary focus:border-accent focus:outline-none active:border-accent",
              {
                ["border-text-primary"]: !error,
                ["border-error placeholder-shown:border-error focus:border-error active:border-error"]:
                  error
              }
            )}
            {...(value && { value })}
            {...register(name)}
            aria-describedby={`selectError-${name}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                onClick={() => setIsOpen(false)}>
                {option.label}
              </option>
            ))}
          </select>
          <div
            className={cn(
              "absolute pointer-events-none right-2 top-[50%] mt-auto h-5 translate-y-[-50%] cursor-pointer transition-transform duration-200",
              { "rotate-180": isOpen }
            )}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.0001 14.45L19.3501 7.10005C19.6001 6.85005 19.8918 6.72905 20.2251 6.73705C20.5584 6.74505 20.8501 6.87438 21.1001 7.12505C21.3501 7.37572 21.4751 7.66738 21.4751 8.00005C21.4751 8.33272 21.3501 8.62438 21.1001 8.87505L13.4251 16.575C13.2251 16.775 13.0001 16.925 12.7501 17.025C12.5001 17.125 12.2501 17.175 12.0001 17.175C11.7501 17.175 11.5001 17.125 11.2501 17.025C11.0001 16.925 10.7751 16.775 10.5751 16.575L2.87509 8.87505C2.62509 8.62505 2.50409 8.32905 2.51209 7.98705C2.52009 7.64505 2.64942 7.34938 2.90009 7.10005C3.15076 6.85072 3.44242 6.72572 3.77509 6.72505C4.10776 6.72438 4.39942 6.84938 4.65009 7.10005L12.0001 14.45Z"
                fill="#333333"
                fillOpacity="0.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
