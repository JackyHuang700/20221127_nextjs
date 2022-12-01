import { GetStaticProps, GetStaticPaths } from "next"
import { useState } from "react"
import PostInfo from "../../components/postInfo/postInfo"
import { IPost, IAsdeee } from "../../src/types"


interface IParams{
  postId: string
}


export const getStaticProps: GetStaticProps = async (context) => {


  const { postId } = context.params as unknown as IParams
  const _res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  const _data: IPost = await _res.json()
  console.log('_data: ', _data);

  return {
    props: {
      post: _data
    } as IAsdeee
  }
}


export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [
      { params: { postId: '3' } },
      { params: { postId: '4' } },
    ],
    fallback: "blocking"
  }
}


function Posts({ post }: IAsdeee){


  const [data_post, setData_post] = useState(post as IPost)

/** 變更文章資訊 */
  const _setData_post: IAsdeee["setData_post"] = (data) => {

    let _canSetData: boolean = false // 是否可以設定資料
    const _post = {...data_post} // 文章資訊

console.log('_setData_post', data);

    // const {
    //   title,
    //   id,
    //   userId,
    //   body,
    // } = data


if(data?.title) {
  _post.title = data.title
  _canSetData = true
}
if(data?.id) {
  _post.id = data.id
  _canSetData = true
}
if(data?.userId) {
  _post.userId = data.userId
  _canSetData = true
}
if(data?.body) {
  _post.body = data.body
  _canSetData = true
}

if(_canSetData) setData_post(_post)

  }

  return (
   <>

   <h4 className="font-bold text-gray-400">使用者資訊</h4>
    <PostInfo
    key={post.id}
    post={data_post}
    setData_post={_setData_post}
    />
    </>
  )

}


export default Posts
