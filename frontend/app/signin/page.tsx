'use client'
import { createClient } from '@/utils/supabase/client'
import GoogleSignInButton from './GoogleSignInButton'

export default function Login() {

    const signInWithGoogle = async () => {
        const supabase = createClient()
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: process.env.NEXT_PUBLIC_BASE_URL + '/auth/callback'
            }
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl px-10 py-12 flex flex-col items-center gap-8">
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-400 drop-shadow mb-2">
                    Sign in to Gather Clone
                </h1>
                <GoogleSignInButton onClick={signInWithGoogle} />
            </div>
        </div>
    );
}
