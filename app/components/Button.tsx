'use client'

import { ButtonHTMLAttributes } from 'react'
import SpinnerIcon from '../../public/icons/spinner.svg'
import Image from 'next/image'
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
}
export const Button = (props: Props) => {
  const { children, loading = false, color, className, ...rest } = props

  return (
    <button className={`flex justify-center ${className}`} {...rest} id=''>
      {loading ? <Image src={SpinnerIcon} priority alt='loading button' /> : children}
    </button>
  )
}
