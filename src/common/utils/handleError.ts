import { setAppErrorAC } from "@/app/app-slice"
import { isErrorWithMessage } from "./isErrorWithMessage"
import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from "@reduxjs/toolkit/query/react"
import { ResultCode } from "@/common/enums/enums.ts"

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
) => {
  let error = "Some error occurred"

  if (result.error) {
    switch (result.error.status) {
      case "FETCH_ERROR":
      case "PARSING_ERROR":
      case "CUSTOM_ERROR":
        error =
          result.error.status === "FETCH_ERROR" || result.error.status === "CUSTOM_ERROR"
            ? result.error.error
            : "Ошибка парсинга, обратитесь к менеджеру сайта"
        break
      case 403:
        error = "403 Forbidden Error. Check API-KEY"
        break
      case 400:
        if (isErrorWithMessage(result.error.data)) {
          error = result.error.data.message
        } else {
          error = JSON.stringify(result.error.data)
        }
        break
      default:
        if ((result.error as { status: number }).status >= 500 && (result.error as { status: number }).status < 600) {
          error = "Server error occurred. Please try again later."
        } else {
          error = JSON.stringify(result.error)
        }
        break
    }
    api.dispatch(setAppErrorAC({ error }))
  }

  if ((result.data as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
    const messages = (result.data as { messages: string[] }).messages
    error = messages.length ? messages[0] : error
    api.dispatch(setAppErrorAC({ error }))
  }
}
