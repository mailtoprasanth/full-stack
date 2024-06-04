import Link from 'next/link'
import React from 'react'

type Props = {}

const SideBar = (props: Props) => {
  return (
    <div className='flex flex-col'>
        <ul className='flex flex-col gap-1 justify-center'>
            <li className='text-slate-300 mt-2'>
                <Link  className="md:w-1/6 sm-2/4 text-center text-slate-800 rounded-md p-2 bg-slate-300" href={"/"}>🏠 Home</Link>
            </li>
            <li className='text-slate-300 mt-2'>
                <Link  className="md:w-1/6 sm-2/4 text-center text-slate-800 rounded-md p-2 bg-slate-300" href={"/blog/add"}>🚀 Add new</Link>
            </li>
        </ul>
    </div>
  )
}

export default SideBar