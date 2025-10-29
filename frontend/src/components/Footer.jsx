import React from 'react'

export default function Footer() {
    return (
        <footer className="text-center py-6 bg-green-700 text-white mt-4">
            © {new Date().getFullYear()} GreenLeaf Nursery. All rights reserved.
        </footer>
    )
}
