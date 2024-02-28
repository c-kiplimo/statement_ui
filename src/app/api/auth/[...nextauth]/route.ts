// imports
import NextAuth from "next-auth"

// importing providers
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import { NextRequest } from "next/server";

const handler = NextAuth({
    providers: [
        /*CredentialsProvider({
            credentials:{
              email:{},
              password:{},
              type:{}
            },
            async authorize(credentials: any,req:NextRequest){

                return null;
             }
        })*/
        
    ],
    

    callbacks: {
        async jwt({ token, user, session }) {
          // the processing of JWT occurs before handling sessions. 
          console.log("jwt callback ", { token, user, session });
    
          if (user) {
            //token.accessToken = user.accessToken;
            //token.refreshToken = user.refreshToken;
           // token.accessTokenExpires = user.accessTokenExpires;
            //token.role = user.role;
            token.id = user.id;
          }
    
          return token;
        },
    
        //  The session receives the token from JWT
        async session({ session, token, user }) {
          console.log("session callback ", { token, user, session });
    
          return {
            ...session,
            user: {
              ...session.user,
              accessToken: token.accessToken as string,
              refreshToken: token.refreshToken as string,
              role: token.role,
              id: token.id,
            },
            error: token.error,
          };
        },
      },
})

export { handler as GET, handler as POST }


