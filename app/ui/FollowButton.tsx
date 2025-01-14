interface IFollowButtonProps {
    color: string;
    text: string;
    textColor: string;
    children: React.ReactNode;
    iconColor: string;
}
const FollowButton = ({ color, text, textColor, children, iconColor }: IFollowButtonProps) => {
    return (
        <div className='mt-6 w-24 flex text-center relative font-[Sinosans]'>
            <button className={`w-full px-4 py-2 rounded-lg border-[1px] border-black top-0 left-0 hover:top-[1px] hover:left-[1px] transition-all duration-300 relative flex justify-center items-center`} style={{ backgroundColor: `${color}`, color: `${textColor}` }}>{text}<span className={`ml-2 ${iconColor}`}>{children}</span>
            </button>
            <span className='w-full h-full absolute top-1 left-1 -z-10 bg-black rounded-lg'></span>
        </div>
    )
}

export default FollowButton