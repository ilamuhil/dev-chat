import { HTMLProps } from 'react'

type Props = {
  error?: boolean
} & HTMLProps<HTMLDivElement>

const Hint = (props: Props) => {
  const { children, error, ...rest } = props
  return (
    <small className={error ? `text-red-500` : `text-slate-100`} {...rest}>
      {children}
    </small>
  )
}

export default Hint
