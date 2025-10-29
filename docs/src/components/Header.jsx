"use client"
import { Github, Menu } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-[#2d2d30] border-b border-[#3e3e42] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                            <Image src="/logo-icon.png" alt='logo' width={40} height={40} unoptimized />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">UR Cache Cleaner</h1>
                            <p className="text-xs text-gray-400">VS Code Extension</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-3">
                        <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-2">
                            Features
                        </a>
                        <a href="#installation" className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-2">
                            Installation
                        </a>
                        <a href="https://github.com/vinugawade/ur-cache-cleaner#readme" className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-2">
                            Docs
                        </a>
                        <a href="https://github.com/vinugawade/ur-cache-cleaner/issues" className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-2">
                            Report Issues
                        </a>
                        <a
                            href="https://github.com/vinugawade/ur-cache-cleaner"
                            className="flex items-center gap-2 px-4 py-2 bg-[#3e3e42] hover:bg-[#4e4e52] rounded transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            <span className="text-sm">GitHub</span>
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 hover:bg-[#3e3e42] rounded transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="md:hidden mt-4 pb-4 space-y-2 border-t border-[#3e3e42] pt-4">
                        <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-400 hover:text-white transition-colors px-3 py-2">
                            Features
                        </a>
                        <a href="#installation" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-400 hover:text-white transition-colors px-3 py-2">
                            Installation
                        </a>
                        <a href="https://github.com/vinugawade/ur-cache-cleaner#readme" className="block text-sm text-gray-400 hover:text-white transition-colors px-3 py-2">
                            Docs
                        </a>
                        <a href="https://github.com/vinugawade/ur-cache-cleaner/issues" className="block text-sm text-gray-400 hover:text-white transition-colors px-3 py-2">
                            Report Issues
                        </a>
                        <a
                            href="https://github.com/vinugawade/ur-cache-cleaner"
                            className="flex items-center gap-2 px-3 py-2 bg-[#3e3e42] hover:bg-[#4e4e52] rounded transition-colors w-full"
                        >
                            <Github className="w-4 h-4" />
                            <span className="text-sm">GitHub</span>
                        </a>
                    </nav>
                )}
            </div>
        </header>
    )
}

export default Header