export type BaseResponse<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldErrors: FieldError[]
}

export type FieldError = {
  error: string
  field: string
}

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
