import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const { className, ...rest } = props
  return (
    <input
      {...rest}
      ref={ref}
      className={`bg-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-gray-500 focus:border-gray-300 transition-colors duration-300 ease-in-out ${
        className ?? ''
      }`}
    />
  )
})

// Set the display name for the Input component
Input.displayName = 'Input'
