'use client'
//onCLick, fetch, useState... 사용하기 위해 use client 작성

import './loginBtn.css'
import { signIn, signOut, useSession } from 'next-auth/react'


export default function LoginBtn({login}){
    console.log(login)

    return(
        <>
            {
                login? (
                    <>
                    <button onClick={()=>{signIn()}}>로그아웃</button>
                    <span>{login.user.name}</span>
                    </>
                ) : (
                    <button onClick={()=>{signOut()}}>로그인</button>
                )
            }
        </>
    )
}

