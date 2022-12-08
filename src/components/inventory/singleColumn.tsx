import { Item, IVariations } from "../../types";
import {
  Table,
} from 'antd'
import SingleColumn2 from "./singleColumn2";

export default function SingleColumn(item: Item) {

  const { Column } = Table;

  return (
    <Table dataSource={item.variations}
      pagination={false}
    >

      <Column title="名稱"
        key='title_translations'
        render={(_: any, data: IVariations) => (
          <>
            {data.fields_translations['zh-hant']}


          </>
        )}
      />
      <Column title="貨號" dataIndex="sku" key="sku" />
      <Column title="數量" dataIndex="age" key="age" />
      <Column
        title="操作"
        key="action"
        render={(_: any, data: IVariations) => (

          <>
            <SingleColumn2 item={item} variations={data} />
          </>

        )

        }
      />
    </Table>
  )
}
