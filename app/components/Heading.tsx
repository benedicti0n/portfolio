import React from "react";
import { CrumbledHighlight } from "~/ui/CrumbledHighlight"

interface PropsTypes {
    heading: string;
    icon?: string;
    color: string;
}

const Heading: React.FC<PropsTypes> = ({ heading, icon, color }) => {
    return (
        <CrumbledHighlight color={color}>
            <div className="flex relative">
                {icon && <img src={icon} alt={heading} className="w-8" />}
                <h1 className="font-[Sinosans] text-black text-2xl ml-3">{heading}</h1>
            </div>
        </CrumbledHighlight>
    )
}

export default Heading