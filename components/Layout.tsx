import React from "react"

interface LayoutProps {
    children?: React.ReactNode
    preview?: boolean
}

export default function Layout({children, preview}: LayoutProps) {
    return(
        <div className="container-fluid">
            {children}
        </div>
    )
}
