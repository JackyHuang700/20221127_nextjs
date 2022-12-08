import { IIResponse, IResponse } from "../../types"

/**
 *
 * @returns
 */
 export const setApiStorkGet = ({
  limit = 50,
  page = 1
 }: {
  /** */
  limit?: number
  /** */
  page?: number
}): Promise<IResponse<IIResponse>> => {
  return new Promise(async (resolve, reject) => {
    const _res = await fetch(`http://192.168.10.233:12388/api/stork?limit=${limit}&page=${page}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const _data = await _res.json()

    resolve(_data)
  })
}



/**
 * 各別修改數量 PATCH
 * @returns
 */
export const setApiStorkUpdatePatch = (params: {
  id: string
  /** 數量 */
  quantity: string
  /** */
  variation_id: string
}): Promise<IResponse> => {
  return new Promise(async (resolve, reject) => {
    const _res = await fetch("http://192.168.10.233:12388/api/stork/update", {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params),
    })
    const _data: IResponse = await _res.json()

    resolve(_data)
  })
}

/**
 * 批次修改 POST
 * @returns
 */
 export const setApiStorkStorePost = (params: {
  /** 數量 */
  quantity: string
}): Promise<IResponse> => {

  console.log('quantity: ', params.quantity);
  return new Promise(async (resolve, reject) => {
    const _res = await fetch("http://192.168.10.233:12388/api/stork/store", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params),
    })
    const _data: IResponse = await _res.json()

    resolve(_data)
  })
}