'use client'
import Image from 'next/image'
import GoogleIcon from '../public/icons/google.svg'
import GithubIcon from '../public/icons/github.svg'
import { Button } from './components/Button'
import { Input } from './components/Input'
import React, { useState } from 'react'
import { z } from 'zod'
import * as SendEmailIcon from '../public/images/paper-plane.png'
import * as VerifyIcon from '../public/icons/lock.svg'
import Hint from './components/Hint'
import { signIn } from 'next-auth/react'

const emailSchema = z.string().email()
const otpSchema = z.number().min(1000).max(9999)

export default function Home() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [formStep, setFormStep] = useState(1)
  const [formError, setFormError] = useState<boolean | { message: string }>(false)
  const [loading, setLoading] = useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const resetForm = () => {
    setEmail('')
    setOtp('')
    setFormStep(1)
    setFormError(false)
    setLoading(false)
  }

  const sendOtp = async () => {
    inputRef.current!.focus()
    setFormError(false)
    if (formStep === 1) {
      if (!emailSchema.safeParse(email)?.success) {
        setFormError({ message: 'Invalid email' })
        return
      }
      try {
        const response = await fetch('/api/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          }),
        })
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        setFormStep(2)
      } catch (err: any) {
        setFormError({ message: err.message })
      }
      setFormStep(2)
    } else {
      if (!otpSchema.safeParse(parseInt(otp))?.success) {
        setFormError({ message: 'Invalid otp' })
        return
      }
      try {
        signIn('credentials', { email, otp: parseInt(otp), callbackUrl: 'http://localhost:3000/chatboard' })
      } catch (e: any) {
        console.log(e)
        setFormError({ message: e?.message || e?.error || 'Unknown error occurred' })
      }
    }
  }

  return (
    <main className='flex justify-center items-center  px-2 h-screen'>
      <div className='rounded-xl max-w-md min-w-sm  shadow-xxl bg-slate-800 px-4 py-8'>
        <h1 className='font-semibold  mx-auto flex justify-center mb-8 text-xl'>Login</h1>
        <div className='justify-center flex gap-8'>
          <Button
            className='px-8 py-2 border-solid border border-gray-50 rounded-md w-full'
            onClick={() => {
              setLoading(p => !p)
              signIn('google', { callbackUrl: 'http://localhost:3000/chatboard' })
            }}
            loading={loading}
          >
            <div className='flex justify-center gap-3'>
              <p>Google</p>
              <Image priority src={GoogleIcon} alt='Login with Google' width={18} height={18} />
            </div>
          </Button>
          <Button
            className='px-8 py-2 border-solid border-gray-50 border rounded-md w-full'
            loading={loading}
            onClick={() => {
              setLoading(p => !p)
              signIn('github', { callbackUrl: 'http://localhost:3000/chatboard' })
            }}
          >
            <div className='flex justify-center gap-3'>
              <p>Github</p>
              <Image src={GithubIcon} alt='Login with Apple' priority width={22} height={22} />
            </div>
          </Button>
        </div>

        <div className='flex justify-center items-center my-6'>
          <div className=' bg-slate-200 h-px w-full'></div>
          <span className='px-4 text-white'>Or</span>
          <div className=' bg-slate-200 h-px w-full'></div>
        </div>
        <div className='flex-col gap-2 items-start flex mb-4'>
          <label htmlFor='email' className='text-lg'>
            Enter {formStep === 1 ? 'email' : 'otp'}
          </label>
          <Input
            ref={inputRef}
            type={formStep === 1 ? 'email' : 'number'}
            id={formStep === 1 ? 'email' : 'otp'}
            name={formStep === 1 ? 'email' : 'otp'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (formError) setFormError(false)
              if (formStep === 1) setEmail(e.target.value)
              else setOtp(e.target.value)
            }}
            className={`py-2 px-2 w-full ${formError ? '' : 'mb-2'}`}
          />
          {formError && <Hint error>{(formError as { message: string })?.message}</Hint>}
          <div className='flex justify-between items-end w-full'>
            <Button type='submit' className='bg-sky-900 py-2 px-4 rounded-md shadow-lg' onClick={sendOtp}>
              <div className='flex justify-center gap-2'>
                <div>{formStep === 1 ? 'Send' : 'Verify'} Otp</div>{' '}
                <Image
                  src={formStep === 1 ? SendEmailIcon : VerifyIcon}
                  alt={formStep === 1 ? 'Send Email' : 'Verify Otp'}
                  priority
                  width={20}
                  height={20}
                ></Image>
              </div>
            </Button>

            <Button className='border-0 text-sky-400' onClick={() => resetForm}>
              {' '}
              Reset Form
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
