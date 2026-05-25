import React from 'react'

const Footer = () => {

    const socials = [
        { label: "GitHub", href: "https://github.com/sammajayi" },
        { label: "LinkedIn", href: "https://linkedin.com/in/sammajayi" },
        { label: "Twitter", href: "https://twitter.com/sammajayi" },
        { label: "Email", href: "mailto:samuelajayi554@gmail.com" },
    ];
    return (



        <footer className="max-w-5xl mx-auto px-8 md:px-10 py-10 flex flex-wrap items-center justify-between gap-6"
            style={{ borderTop: "1px solid rgba(191,219,254,0.07)" }}>
            <div className="flex flex-col gap-1">
                <span className="text-[14px] font-medium text-blue-200/45">Your Name</span>
                <span className="text-[11px] font-mono text-blue-200/25">© 2026 — built with Next.js & Sanity</span>
            </div>
            <div className="flex gap-6">
                {socials.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                        className="text-[13px] text-blue-200/30 no-underline hover:text-blue-300 transition-colors duration-200">
                        {s.label}
                    </a>
                ))}
            </div>
        </footer>
    );
}


export default Footer