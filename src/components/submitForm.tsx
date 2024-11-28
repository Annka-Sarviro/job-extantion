import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"

import { Button } from "./button"
import { Input } from "./input"
import { RadioButton } from "./radio-button"
import { Select } from "./select"
import { TextArea } from "./text-aria"

interface SubmitFormProps {
  data: z.infer<typeof AddDataSchema>
}

const titleRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9.,'’\-!|/()?:;+= ]+$/
const urlRegex =
  /^(https?:\/\/(?:www\.)?|www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+\/?[^\s]*$/

export const AddDataSchema = z.object({
  companyName: z
    .string()
    .min(1, "Required")
    .regex(titleRegex, `Regex error`)
    .max(50, `Max 50`)
    .min(2, `Min 2`),
  position: z
    .string()
    .min(1, "Required")
    .regex(titleRegex, `Regex error`)
    .max(50, `Max 50`)
    .min(2, `Min 2`),
  link: z
    .string()
    .min(1, "Required")
    .regex(urlRegex, `Regex error`)
    .max(500, `Max 500`)
    .min(2, `Min 2`),
  relation: z.string().max(50, `Max 50`).optional(),
  location: z
    .string()
    .min(1, "Required")
    .regex(titleRegex, `Regex error`)
    .max(50, `Max 50`)
    .min(2, `Min 2`),
  workType: z.enum(["remote", "office", "hybrid"]),
  status: z.enum(["saved", "new", "hr", "test", "tech", "reject"]),
  notes: z.string().max(500, `Max 500`).optional()
})

export const SubmitForm = ({ data }: SubmitFormProps) => {
  const [isSending, setIsSending] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<z.infer<typeof AddDataSchema>>({
    defaultValues: {
      companyName: "",
      position: "",
      link: "",
      relation: "",
      location: "",
      workType: null,
      status: "saved",
      notes: ""
    },

    resolver: zodResolver(AddDataSchema),
    mode: "onChange"
  })

  useEffect(() => {
    if (data?.link) {
      reset({
        position: data.position,
        companyName: data.companyName,
        link: data.link,
        relation: data.relation,
        location: data.location,
        workType: data.workType,
        status: data.status,
        notes: data.notes
      })
    }
  }, [data, reset])
  const workType = watch("workType")
  const onSubmit: SubmitHandler<z.infer<typeof AddDataSchema>> = async (
    data
  ) => {
    try {
      setIsSending(true)
      console.log("data", data)
      setIsSending(false)
    } catch (error) {
      console.log("error", error)
      setIsSending(false)
    } finally {
      setIsSending(false)
      reset()
    }
  }

  return (
    <form
      className="bg-page shadow-form_shadow space-y-[30px] rounded-[20px] px-2 py-4"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Input
          register={register}
          resetField={resetField}
          key="companyName"
          name="companyName"
          placeholder="Введіть назву"
          type="text"
          label="Компанія"
          errors={errors}
        />
        <Input
          register={register}
          resetField={resetField}
          key="position"
          name="position"
          placeholder="Введість позицію"
          type="text"
          label="Позиція"
          errors={errors}
        />
        <Input
          register={register}
          resetField={resetField}
          key="link"
          name="link"
          placeholder="Введість посилання"
          type="text"
          label="Посилання на вакансію"
          errors={errors}
        />
        <Input
          register={register}
          resetField={resetField}
          key="relation"
          name="relation"
          placeholder="Канал зв'язку"
          type="text"
          label="Спосіб подачі"
          errors={errors}
        />
        <Input
          register={register}
          resetField={resetField}
          key="location"
          name="location"
          placeholder="Введіть місто"
          type="text"
          label="Локація"
          errors={errors}
        />

        <RadioButton
          name="workType"
          register={register}
          errors={errors}
          setValue={setValue}
          value={workType}
          className="pt-2"
          options={[
            { label: "Віддалена", value: "remote" },
            { label: "Офіс", value: "office" },
            { label: "Гібрідна", value: "hybrid" }
          ]}
        />
        <Select
          register={register}
          resetField={resetField}
          key="status"
          name="status"
          placeholder="Оберіть статус"
          label="Статус"
          errors={errors}
          options={[
            { label: "Збережено", value: "saved" },
            { label: "Нова", value: "new" },
            { label: "HR співбесіда", value: "hr" },
            { label: "Тестове завдання", value: "test" },
            { label: "Технічна співбесіда", value: "tech" },
            { label: "Відмова", value: "reject" }
          ]}
        />

        <TextArea
          register={register}
          resetField={resetField}
          key="notes"
          name="notes"
          placeholder="Додай замітки"
          label="Нотатки"
          errors={errors}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSending}
        variant="primary">
        Додати
      </Button>
    </form>
  )
}
