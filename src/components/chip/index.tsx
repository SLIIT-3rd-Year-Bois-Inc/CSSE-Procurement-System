import React from "react";

interface ChipProps extends React.HTMLProps<HTMLDivElement> {
    active?: boolean
}

export default function Chip({ className, active, ...rest }: ChipProps) {
    return (
        <div className={`${className} cursor-pointer ${active ? "bg-[#004864]" : "hover:bg-[#004864] bg-[#0097d4]"} rounded-3xl w-fit h-fit py-2 px-4`} {...rest}></div>
    )
}
