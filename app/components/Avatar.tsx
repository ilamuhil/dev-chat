import React from 'react'
import Image from 'next/image'

type PropsWithSrc = Src & React.HTMLAttributes<HTMLImageElement>
type PropsWithFallbackText = FallbackText & React.HTMLAttributes<HTMLImageElement>
type Props = PropsWithSrc | PropsWithFallbackText

type Dimension = {
  width: number
  height: number
}

type Src = {
  alt: string
  src: string
} & Dimension

type FallbackText = {
  username: string
} & Partial<Dimension>

const Avatar = (props: Props) => {
  return (
    <div
      className={`border-2 border-white rounded-full w-10 h-10 font-extrabold jic ${
        (props as FallbackText)?.username ? 'avatar-text-bg' : ''
      }`}
    >
      {(props as PropsWithSrc).src ? (
        <Image
          src={(props as PropsWithSrc).src}
          alt={(props as PropsWithSrc).alt ?? 'user profile image'}
          width={props.width}
          height={props.height}
          className='rounded-full'
          priority
        ></Image>
      ) : (
        (props as PropsWithFallbackText).username.charAt(0).toUpperCase()
      )}
    </div>
  )
}

export default Avatar
