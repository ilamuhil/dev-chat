import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
export const options: NextAuthOptions = {
  pages: {
    signIn: '/',
    newUser: '/chatboard',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, 'user', account, 'account', profile, 'profile', email, 'email', credentials, 'credentials')
      return true
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    async signIn(message) {
      console.log(message)
    },
    async signOut(message) {
      console.log(message)
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Login',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        otp: {
          label: 'OTP',
          type: 'number',
        },
      },
      async authorize(credentials) {
        //Connect to the database here.
        if (!credentials || (credentials?.email !== 'ilamuhil@gmail.com' && parseInt(credentials?.otp) !== 1234))
          return null
        return { id: 'OTP-AUTH', email: 'ilamuhil@gmail.com', otp: 1234 }
      },
    }),
  ],
}
