import classNames from "clsx"
import type {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue
} from "react-hook-form"

export interface CheckboxProps {
  name: string
  className?: string
  label?: React.ReactNode | string
  register: UseFormRegister<any>
  errors: FieldErrors
  type?: "default" | "signUp"
  id?: string
  disabled?: boolean
  required?: boolean
  checked?: boolean
  date?: string
  onClick?: () => void
  getValues?: UseFormGetValues<any>
  setValue?: UseFormSetValue<any>
}

export const Checkbox = ({
  name,
  label,
  id,
  errors,
  type = "default",
  register,
  checked,
  disabled = false,
  required = false,
  ...props
}: CheckboxProps) => {
  const error = errors[name]

  return (
    <div
      className={classNames(
        type === "signUp" && "relative flex items-center px-[9.5px]"
      )}
      id={id}>
      <div className="relative flex items-center justify-center">
        <input
          required={required}
          type="checkbox"
          id={`checkbox-${name}`}
          disabled={disabled}
          checked={checked}
          {...register(name)}
          aria-describedby={`checkBoxError-${name}`}
          {...props}
          className={classNames(
            type === "signUp" &&
              "peer relative h-5 w-5 shrink-0 appearance-none rounded-[4px] border-[1px] border-solid border-textBlack",
            "md:h-6 md:w-6 md:border-2"
          )}
        />
        {type === "signUp" && checked && (
          <svg
            className="pointer-events-none absolute h-4 w-4 fill-none stroke-background-dark_blue peer-checked:!stroke-text-accent"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </div>

      <label
        htmlFor={`checkbox-${name}`}
        className={classNames(
          type === "signUp" &&
            "ml-3 font-nunito font-medium leading-[135%] text-textBlackLight sm:text-[10px] md:text-[14px] 2xl:text-[16px]"
        )}>
        {label}
      </label>
      {error && (
        <span
          id={`inputError-${name}`}
          className="absolute left-0 top-[46px] inline-block font-nunito text-base font-medium text-color2">
          {String(error?.message)}
        </span>
      )}
    </div>
  )
}
