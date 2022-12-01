export interface IAsdeee{
  /** 文章資訊 */
  post: IPost
  /** 變更文章訊息 */
  setData_post(data: Partial<IPost>): void
}

export interface IPost{
  userId: string
  id: string
  title: string
  body: string
}
