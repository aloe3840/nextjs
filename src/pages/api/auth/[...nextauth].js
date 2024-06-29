import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'; //구글 소셜
import GithubProvider from 'next-auth/providers/github'; //깃허브 소셜
import CredentialsProvider from "next-auth/providers/credentials";  //내 DB이용
import bcrypt from 'bcrypt';
import { connectDB } from "@/util/db";
//구글로그인, 깃허브로그인을 연결해줌

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: '',    //구글 클라이언트 ID
            clientSecret: '',    //구글 클라이언트 보안 비밀번호
        }),
        GithubProvider({  
            clientId: '',    //깃허브 클라이언트 ID
            clientSecret: '',  //깃허브 클라이언트 비밀번호
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: '아이디', type: 'text'},
                password: {label: '비밀번호', type: 'password'}
            },
            //로그인 시도시 동작할 함수
            async authorize(credentials){
                //mongodb에 접속해서 해당 이메일과 비밀번호가 있는지 찾고
                //찾았다면 유저정보를 return
                
                const db = (await connectDB).db('mydb');  
                let user = await db.collection('user').findOne({email: credentials.email})
                //이메일이 있는지 확인함. findOne : 조건에 맞는 것을 찾아서 object형식으로 변환/못찾으면 null
                if(!user){
                    console.log('일치하는 아이디가 없습니다')
                    return null;  //못찾았으니 유저정보 안줌
                }

                //비밀번호를 bcrypt로 암호화 했기 때문에 복호화해서 비교 compare
                const checkPassword = await bcrypt.compare(credentials.password, user.password)
                console.log(checkPassword)
                if(!checkPassword){
                    console.log('비밀번호가 일치하지 않습니다.')
                    return null; //비밀번호 틀렸으니 유저정보 안줌
                }

                //이메일도 찾고 비밀번호도 찾았으면 유저정보를 줌
                return user
            }
        })
    ],
    callbacks: {
        //로그인 방식에 따라 다르게 처리 (웹 보안 로그인 인증방식 2가지)
        jwt: async({token, user})=>{
            //토큰 로그인 (JSON web token 압축정보)
            if(user){
                token.user = {};
                token.user.name = user.name;
                token.user.email = user.email;
            }
            return token
        },
        session: async({session, token})=>{
            //세션방식 로그인 (서버에서 보관하는 사용자정보 이용)
            session.user = token.user;
            return session
        },
    },
    //로그인 유지 기간
    session:{
        strategy: 'jwt',
        maxAge: 2 * 24 * 60 * 60  //2일 (맨 앞 숫자)
    },
    secret: 'anything'
}

export default NextAuth(authOptions)


//구글 로그인 (2024.06 기준)
//https://console.cloud.google.com/ -> API 및 서비스 -> OAuth 동의화면 (External 버튼 클릭)
//사용자 인증 정보 -> 사용자 인증정보 만들기 -> OAuth 2.0 클라이언트 생성 -> 웹 애플리케이션 선택 -> 이름 입력 -> 승인된 리디렉션 URI 추가
//http://localhost:3000/api/auth/callback/google
//클라이언트 아이디와 클라이언트 보안 비밀번호 메모 해놓기 (코드에서 사용됨)

//깃허브 로그인 (2024.06 기준)
// github 로그인 -> 우측 프로필 아이콘 클릭 -> settings -> Developer settings -> 
// OAuth Apps -> Register a new application
//Application name 입력 -> http://localhost:3000/ 입력 (실제 사이트도 있으면 실제사이트 URL로 추가하기)
//Generate a new client secret 버튼 클릭. 클라이언트 아이디, 비밀번호 메모


