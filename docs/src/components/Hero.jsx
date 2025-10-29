import { CheckCircle, Download, ExternalLink, Terminal } from 'lucide-react';
import Image from 'next/image';


const Hero = () => {

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                    <div className="inline-block px-3 py-1 bg-[#007acc]/20 border border-[#007acc]/40 rounded text-sm text-[#3794ff] mb-6">
                        For PHP Developers
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 leading-tight">
                        Clear <span className="text-[#4ec9b0]">Cache</span> Without Leaving <span className="text-[#007acc]">VS Code</span>
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 lg:mb-8 leading-relaxed">
                        A simple, efficient VS Code extension that adds one-click cache clearing for your Drupal and CiviCRM projects. Works with both local VS Code and web-based code-server environments.
                    </p>

                    {/* Get Extension Buttons */}
                    <div className="mb-8">
                        <p className="text-sm text-gray-400 mb-3">Get the extension:</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="https://marketplace.visualstudio.com/items?itemName=UR-Services.ur-cache-cleaner"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0098ff] hover:bg-[#007acc] rounded font-medium transition-all hover:scale-105 shadow-lg shadow-[#0098ff]/20"
                            >
                                <Download className="w-5 h-5" />
                                VS Code Marketplace
                                <ExternalLink className="w-4 h-4" />
                            </a>
                            <a
                                href="https://open-vsx.org/extension/vinaygawade/ur-cache-cleaner"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#3e3e42] hover:bg-[#4e4e52] border border-[#0098ff]/30 rounded font-medium transition-colors"
                            >
                                <Download className="w-5 h-5" />
                                Open VSX Registry
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* VS Code Preview */}
                <div className="border border-[#3e3e42] rounded-lg overflow-hidden shadow-2xl">
                    <Image src="https://raw.githubusercontent.com/vinugawade/ur-cache-cleaner/refs/heads/master/assets/images/feature.gif" alt='vs-code extension gif' unoptimized width={300} height={300} className='w-full' />
                </div>
            </div>
        </section>
    )
}

export default Hero