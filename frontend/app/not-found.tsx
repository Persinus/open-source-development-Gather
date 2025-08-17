type NotFoundProps = {
    specialMessage?: string
}

export default function NotFound({ specialMessage }: NotFoundProps) {

    function getMessage() {
        if (specialMessage === 'only owner') {
            return 'This realm is private right now. Come back later! 😶'
        } else if (specialMessage) {
            return `404 - ${specialMessage}`
        } else {
            return '404 - This page is not real! ☹️'
        }
    }

    return (
        <div className='w-full h-screen grid place-items-center p-4'>
            <div className='flex flex-col items-center'>
                <h1 className='text-xl sm:text-3xl max-w-[450px] text-center'>
                    {getMessage()}
                </h1>
            </div>
        </div>
    )
}
