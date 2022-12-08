import type { TableProps } from 'antd/es/table'

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



export interface IResponse<T = any> {
  code: number;
  status: boolean;
  response: T;
  message?: any;
  file?: any;
  line?: any;
}

export interface IIResponse {
  items: Item[];
  pagination: Pagination
}

export interface Pagination {
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
}

export interface Item {
  id: string;
  title_translations: Fieldstranslations;
  variations: IVariations[];
}

export interface IVariations{

    id: string;
    fields_translations: Fieldstranslations;
    /** 貨號 */
    sku: string;

}

interface Fieldstranslations {
  'zh-hant': string[];
}


export interface IButton{
    /** */
    text: string
    // class: string
    type: "primary" | "link" | "text" | "ghost" | "default" | "dashed" | undefined
    /** 批次修改價格 */
    onClick(): void
    /** */
    disabled?: boolean
}


export interface ITable<T = any>{
  class?: string
  loading: TableProps<T>['loading']
  onChange: TableProps<T>['onChange']
  pagination: TableProps<T>['pagination']
}