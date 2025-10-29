import { Heart } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-[#252526] border-t border-[#3e3e42] py-6 sm:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col gap-6">
                    {/* Main Footer Content */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-xs sm:text-sm text-gray-400 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
                                © 2025 UR Cache Cleaner. Built with <Heart className="w-3 h-3 text-red-500 inline fill-red-500" /> for PHP developers.
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
                            <a href="https://github.com/vinugawade/ur-cache-cleaner" className="text-gray-400 hover:text-white transition-colors">
                                GitHub
                            </a>
                            <a href="https://github.com/vinugawade/ur-cache-cleaner/issues" className="text-gray-400 hover:text-white transition-colors">
                                Report Issues
                            </a>
                            <a href="https://github.com/vinugawade/ur-cache-cleaner#readme" className="text-gray-400 hover:text-white transition-colors">
                                Documentation
                            </a>
                        </div>
                    </div>

                    {/* Developer Credit */}
                    <div className="border-t border-[#3e3e42] pt-4">
                        <div className="text-center">
                            <p className="text-xs text-gray-500">
                                Developed by{' '}
                                <a
                                    href="https://preetiyadav.dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#0098ff] hover:text-[#00b4ff] transition-colors font-medium"
                                >
                                    Preeti Yadav
                                </a>
                                {' '}
                                and{' '}
                                <a
                                    href="https://vinay.is-a.dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#0098ff] hover:text-[#00b4ff] transition-colors font-medium"
                                >
                                    Vinay Gawade&nbsp;
                                </a>
                                with ❤️.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer