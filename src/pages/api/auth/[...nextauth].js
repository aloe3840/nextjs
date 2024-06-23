import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'; //구글 소셜
import GithubProvider from 'next-auth/providers/github'; //깃허브 소셜
import CredentialsProvider from "next-auth/providers/credentials";  //내 DB이용
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

        })
    ],
    secret: 'anything333'
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


