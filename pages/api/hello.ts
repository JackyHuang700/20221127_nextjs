// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json([
    { name: 'John Doe' },
    { name: 'John Doe2' },
    { name: 'John Doe3' },
    { name: 'John Doe4' },
    { name: 'John Doe1' },
    { name: 'John Doe321' },
    { name: 'John Doe33' },
  ])

}