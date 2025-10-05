"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Galaxy from "./galaxy";
import { useEffect, useRef } from "react";
import Link from "next/link";


export default function HeroSection() {
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (titleRef.current) {
            setTimeout(() => {
                titleRef.current!.classList.remove('hidden');
                titleRef.current!.classList.add('animate-fade-in');
            }, 1000);

            // scale on Scroll down
            const handleScroll = () => {
                const scrollY = window.scrollY;
                const scale = Math.max(1 - scrollY / 1000, 0.5);
                titleRef.current!.style.transform = `scale(${scale})`;
                titleRef.current!.style.opacity = `${scale}`;
            }
            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            }
        }
    }, []);

    return (
        
        <div className="h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">
            {/*<DotLottieReact src="/anims/Space Areal.lottie" loop autoplay className="h-full w-full object-cover opacity-20" />*/}
            <header className="absolute w-full top-0 left-0 z-20 flex items-center justify-center py-2 animate-fade-in-down">
                <Link href="/" className="p-4 text-white text-lg font-medium hover:text-yellow-300 transition-colors">Home</Link>
                <Link href="/#app" className="p-4 text-white text-lg font-medium hover:text-yellow-300 transition-colors">App</Link>
                <Link href="/#how-to-use" className="p-4 text-white text-lg font-medium hover:text-yellow-300 transition-colors">How to use</Link>
            </header>
            <Galaxy />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                
                <h1 className="text-8xl font-bold text-white mb-4 uppercase orbitron-font hidden" ref={titleRef}>Laplace Eleptic</h1>
            </div>
        </div>
    )
}