const FollowButton = ({ color }: { color: string }) => {
    return (
        <button className={`bg-${color}/50 px-6 py-1 rounded-xl`}>Follow</button>
    )
}

export default FollowButton