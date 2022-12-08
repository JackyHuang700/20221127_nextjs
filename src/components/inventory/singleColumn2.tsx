import {
  Button,
  InputNumber,
  notification,

} from 'antd'

import { IButton, Item, IVariations } from '../../types';
import { setApiStorkUpdatePatch } from '../../composables/useApi'
import { useState } from 'react';

/** */
export default function SingleColumn2({
  item,
  variations,
}: {
  item: Item
  variations: IVariations
}) {


  // console.log('SingleColumn: ', item);
  // console.log('variations: ', variations);

  /** 統一更改 */
  const [uniteChange, setUniteChange] = useState<number>(1)


  /** btn - 儲存按鈕 */
  const [btn_save, setBtn_save] = useState<IButton>({
    text: '更改',
    type: 'primary',
    // class: '',
    onClick: async () => {

      //關閉按鈕
      setBtn_save(btn => {
        const _btn = { ...btn }
        _btn.disabled = true
        return _btn
      })

      const { status, message } = await setApiStorkUpdatePatch({
        id: item.id,
        quantity: `${uniteChange}`,
        variation_id: variations.id,
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
      });

    },
    disabled: false,
    // disabled: (uniteChange === -1 ? true : false),
  })
  return (
    <>
      <div className='flex justify-center items-center'>
        <p className="mb-0 mr-2">設定數量</p>
        <InputNumber min={0} defaultValue={1} className="min-w-[30px] mr-2" />
        <Button {...btn_save}>{btn_save.text}</Button>
      </div>

      {
        false ? <a className=''>Invite {item.id}</a> : <p className="mb-0"></p>
      }
    </>
  )

}