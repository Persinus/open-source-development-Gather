import React from 'react'

type GoogleSignInButtonProps = {
    onClick: () => void
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onClick }) => {
    return (
        <button
            className="
                h-16 w-72 
                bg-white/80 backdrop-blur-md 
                border border-indigo-200 
                rounded-2xl shadow-lg 
                flex items-center justify-center gap-4 
                px-4
                transition-all duration-200
                hover:scale-105 hover:shadow-xl hover:border-indigo-400
                active:scale-100
            "
            onClick={onClick}
        >
            <img src='/google-logo.png' alt="Google logo" className="h-9 w-9" />
            <span className="text-black text-lg font-semibold tracking-wide">
                Sign in with Google
            </span>
        </button>
    )
}

export default GoogleSignInButton