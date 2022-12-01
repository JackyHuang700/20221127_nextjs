import { useState } from "react";
import { IAsdeee } from "../../src/types";

function PostInfo({ post, setData_post }: IAsdeee) {


  const [mypost, setMypost] = useState(post)

  return (
    <>
      <div className="flex text-sm font-semibold">
        <h5 className="text-gray-500">post.title:&nbsp;&nbsp;</h5>
        <p className="mb-0 text-gray-300">{post.title}</p>
        <input type="text" className="text-white bg-gray-600" onChange={
          e => {
            const _input = (e.target) as HTMLInputElement
            setMypost({
              ...mypost, title: _input.value
            })
          }
        } />

      </div>

      <div>


        <button
          className="px-1 py-1.5 text-white text-xs bg-blue-500 rounded"
          onClick={() => setData_post(mypost)}>變更文章資訊</button>
      </div>
    </>
  );
}

export default PostInfo;
