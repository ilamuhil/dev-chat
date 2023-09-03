'use client'

import { Button } from '@/app/components/Button'
import React from 'react'
import Image from 'next/image'
import PlusIcon from '@/public/icons/plus.svg'
import Avatar from '@/app/components/Avatar'
import BellIcon from '@/public/icons/bell.svg'

type Props = {}

const NavbarItems = (props: Props) => {
  const notifications = false
  const random = Math.floor(Math.random() * 100)
  const gender = Math.random() > 0.5 ? 'women' : 'men'

  return (
    <>
      <Button className='inline-flex jic px-2 py-1 md:px-4 md:py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-primary-600 border border-primary-700 rounded-full shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-900'>
        <Image src={PlusIcon} alt='New chat Icon' className='md:mr-2' width={14} height={14}></Image>
        <p className='text-sm hidden md:block'>New Chat</p>
      </Button>
      <Button className='rounded-full shadow-md border-0' aria-label='notifications-button'>
        <Image src={BellIcon} alt='notifications' width={28} height={28} className='mt-2'></Image>
        {notifications && (
          <span className='relative flex h-3 w-3 right-3 top-1'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-danger-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-3 w-3 bg-danger-500'></span>
          </span>
        )}
      </Button>
      <Avatar
        src={`https://randomuser.me/api/portraits/${gender}/${random}.jpg`}
        alt='ss'
        width={34}
        height={34}
      ></Avatar>
    </>
  )
}

export default NavbarItems
