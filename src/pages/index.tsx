import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import {
  Button,
  InputNumber,
  Table,
  notification,
} from 'antd'
import { useState, useEffect } from 'react'
import SingleColumn from '../components/inventory/singleColumn'
import { IButton, IResponse, Item, Pagination, ITable, IIResponse } from '../types'
import { setApiStorkGet, setApiStorkStorePost } from '../composables/useApi'

/** */

export const getStaticProps: GetStaticProps<IIResponse> = async (/**content */) => {

  // const _res = await fetch('https://fakestoreapi.com/products/1')
  // const _limit = 50
  // const _res = await fetch(`http://192.168.10.233:12388/api/stork?limit=${_limit}&page=1`)
  // const _data: IResponse = await _res.json()

  const {
    response,
  } = await setApiStorkGet({})

  console.log('_data: ', response);


  return {
    props: response
  }

}


const Home = ({ items, pagination }: InferGetStaticPropsType<typeof getStaticProps>) => {

  // useEffect(() => {
  //   (async () => {
  //     const _res = await fetch('http://192.168.10.233:12388/api/stork?limit=1&page=1')
  //   const _data: IResponse = await _res.json()
  //   console.log('_data_data_data_data_data: ', _data);
  //   })()

  // }, [])

  // const [api, contextHolder] = notification.useNotification()

  /** 資料 */
  const [dataList_item, setDataList_item] = useState<Item[]>(items)

  /** */
  const [data_pagination, setData_pagination] = useState<Pagination>(pagination)


  /** */
  const { Column, ColumnGroup } = Table;


  /** */
  const [table, setTable] = useState<ITable>({
    class: 'w-full',
    loading: false,
    onChange: async (pagination /**,filters, sorter, extra */) => {
      console.log('pagination: ', pagination);



      /** 設定分頁 */
      setData_pagination(data => {
        const _data = { ...data }

        _data.current_page = pagination.current!
        return _data
      })




    },
    pagination: {
      defaultCurrent: 1,
      total: pagination.total_count,
    }
  })


  /** 統一更改 */
  const [uniteChange, setUniteChange] = useState<number>(1)


  /** btn - 儲存按鈕 */
  const [btn_save, setBtn_save] = useState<IButton>({
    text: '更改數量',
    type: 'primary',
    // class: '',
    onClick: async () => {


      //關閉按鈕
      setBtn_save(btn => {
        const _btn = { ...btn }
        _btn.disabled = true
        return _btn
      })

      const { status, message } = await setApiStorkStorePost({
        quantity: `${uniteChange}`,
      })

      //開啟按鈕
      setBtn_save(btn => {
        const _btn = { ...btn }
        _btn.disabled = false
        return _btn
      })


      // 驗證失敗
      if (!status) {
        notification.error({
          message: `訊息`,
          description: message,
        });
        return
      }


      notification.success({
        message: `訊息`,
        description: message,
      })


    },
    disabled: false,
    // disabled: (uniteChange === -1 ? true : false),
  })



  /** 切換分頁  */
  useEffect(() => {

    (async () => {

      // 開啟 loading
      setTable(data => {
        const _data = { ...data }
        _data.loading = true
        return _data
      })

      // const _res = await fetch(`http://192.168.10.233:12388/api/stork?limit=${data_pagination.per_page}&page=${data_pagination.current_page}`)

      const {
        response,
      } = await setApiStorkGet({
        limit: data_pagination.per_page,
        page: data_pagination.current_page,
      })


      // const _data: IResponse = await _res.json()
      setDataList_item(response.items)

      // 關閉 loading
      setTable(data => {
        const _data = { ...data }
        _data.loading = false
        return _data
      })



    })()

  }, [
    data_pagination
  ])



  return (
    <>

      <Head>
        <title>RoShop</title>
      </Head>
      {/* bg-stone-50 */}
      <main className='px-[50px] pt-[50px]  h-screen '>

        <section className='flex justify-center items-center mb-6'>
          <h2 className='font-bold text-2xl'>更改</h2>
        </section>

        <section className='flex justify-start items-center mb-6'>
          <p className="mb-0 mr-2 font-bold">統一更改數量</p>

          <InputNumber min={0} defaultValue={uniteChange} onChange={(e) => {
            setUniteChange(e!)

          }} className="min-w-[100px] mr-2" />


          <Button {...btn_save}>{btn_save.text}</Button>

        </section>

        <section className='flex justify-start items-center'>
          <Table dataSource={dataList_item}
            {...table}
            expandable={{
              expandedRowRender: (_data) => (

                <SingleColumn {..._data} />
              ),
              rowExpandable: (data) => /**data.name !== 'Not Expandable' */true,
              defaultExpandAllRows: true,
            }}
          >
            <Column title="名稱"
              key='title_translations'
              render={(_: any, data: Item) => (
                <>
                  {data.title_translations['zh-hant']}


                  {/* <Table dataSource={data.variations}>
                    <Column title="" key="asdf"
                      render={(_: any, data2: IVariations) => (

                        <>{
                          data2.fields_translations['zh-hant']
                        }</>
                      )}
                    />
                  </Table> */}
                </>
              )}
            />
            <Column title="貨號" dataIndex="lastName" key="lastName" />
            <Column title="數量" dataIndex="age" key="age" />
            <Column
              title="操作"
              key="action"
              render={(_: any, data: Item) => (

                <>

                </>

              )

              }
            />
          </Table>
        </section>

      </main>
    </>



  )
}

export default Home