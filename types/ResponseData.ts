export default interface ResponseData<T=unknown> {
  data: T
  code: string
  status: string
  message?: string
}
