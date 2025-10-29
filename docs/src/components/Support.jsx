import { Command, Server, Terminal, X } from 'lucide-react';

const Support = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="bg-gradient-to-br from-[#2d2d30] to-[#252526] border border-[#0098ff]/30 rounded-lg p-6 sm:p-8 shadow-xl">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="text-center lg:text-left">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2">Platform Support</h3>
                        <p className="text-sm sm:text-base text-gray-300 mb-2">Works with DDEV, Lando, and plain setups</p>
                        <p className="text-sm text-gray-300">Optimized for Linux and macOS environments</p>
                        <p className="text-xs sm:text-sm text-[#ff6b6b] mt-2 flex items-center justify-center lg:justify-start gap-2">
                            <X className="w-4 h-4" />
                            Note: Windows is not currently supported
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:flex sm:flex-row gap-6 sm:gap-12">
                        <div className="text-center">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#4ec9b0] to-[#5dd9bf] rounded-lg flex items-center justify-center mb-3 shadow-lg mx-auto">
                                <Terminal className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div className="font-medium text-sm sm:text-base text-[#4ec9b0]">Linux</div>
                        </div>
                        <div className="text-center">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#0098ff] to-[#00b4ff] rounded-lg flex items-center justify-center mb-3 shadow-lg mx-auto">
                                <Command className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div className="font-medium text-sm sm:text-base text-[#0098ff]">macOS</div>
                        </div>
                        <div className="text-center col-span-2 sm:col-span-1">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#c586c0] to-[#d896d0] rounded-lg flex items-center justify-center mb-3 shadow-lg mx-auto">
                                <Server className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div className="font-medium text-sm sm:text-base text-[#c586c0]">code-server</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Support