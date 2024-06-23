'use client'
import Link from 'next/link'
//onCLick, fetch, useState... 사용하기 위해 use client 작성

import './loginBtn.css'
import { signIn, signOut, useSession } from 'next-auth/react'


export default function LoginBtn({login}){
    console.log(login)

    return(
        <>
            {
                !login? (
                    <button onClick={()=>{signIn()}} className='login-logout'>로그인</button>
                ) : (
                    <button onClick={()=>{signOut()}} className='login-logout'>로그아웃</button>
                )
            }

            {
                !login? (
                    <Link href='/register' className='user-signup'>회원가입</Link>
                ):(
                    <span>{login?.user?.name}</span>
                )
            }
        </>
    )
}

