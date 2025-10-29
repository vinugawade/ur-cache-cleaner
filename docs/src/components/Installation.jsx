import { CheckCircle, Download } from 'lucide-react';

const Installation = () => {
    return (
        <section id="installation" className="bg-[#252526] py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-8 sm:mb-12">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4">Installation</h3>
                    <p className="text-base sm:text-lg text-gray-400">Get started in just a few minutes</p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
                    {/* Step 1 */}
                    <div className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-4 sm:p-6 lg:p-8 hover:border-[#0098ff]/50 transition-colors">
                        <div className="flex items-start gap-4 sm:gap-6">
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#0098ff] to-[#00b4ff] rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold shadow-lg">
                                1
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg sm:text-xl font-semibold mb-3">Install Dependencies</h4>
                                <p className="text-sm sm:text-base text-gray-400 mb-4">Install Drush and CV CLI tools in your project:</p>
                                <div className="bg-[#1e1e1e] border border-[#0098ff]/20 rounded p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
                                    <div className="text-gray-500 mb-1"># For Drupal</div>
                                    <div className="text-[#4ec9b0]">composer require drush/drush</div>
                                    <div className="text-gray-500 mt-3 mb-1"># For CiviCRM</div>
                                    <div className="text-[#c586c0]">composer require civicrm/cli-tools</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-4 sm:p-6 lg:p-8 hover:border-[#4ec9b0]/50 transition-colors">
                        <div className="flex items-start gap-4 sm:gap-6">
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#4ec9b0] to-[#5dd9bf] rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold shadow-lg">
                                2
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg sm:text-xl font-semibold mb-3">Install the Extension</h4>
                                <p className="text-sm sm:text-base text-gray-400 mb-4">Install from marketplace or via command:</p>
                                <div className="bg-[#1e1e1e] border border-[#4ec9b0]/20 rounded p-3 sm:p-4 font-mono text-xs sm:text-sm mb-4 overflow-x-auto">
                                    <div className="text-[#0098ff]">ext install UR-Services.ur-cache-cleaner</div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a
                                        href="https://marketplace.visualstudio.com/items?itemName=UR-Services.ur-cache-cleaner"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#0098ff] hover:bg-[#007acc] rounded transition-colors shadow-lg text-sm sm:text-base"
                                    >
                                        <Download className="w-4 h-4" />
                                        VS Code Marketplace
                                    </a>
                                    <a
                                        href="https://open-vsx.org/extension/vinaygawade/ur-cache-cleaner"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#3e3e42] hover:bg-[#4e4e52] border border-[#0098ff]/30 rounded transition-colors text-sm sm:text-base"
                                    >
                                        <Download className="w-4 h-4" />
                                        Open VSX
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-4 sm:p-6 lg:p-8 hover:border-[#c586c0]/50 transition-colors">
                        <div className="flex items-start gap-4 sm:gap-6">
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#c586c0] to-[#d896d0] rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold shadow-lg">
                                3
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg sm:text-xl font-semibold mb-3">Start Using It</h4>
                                <p className="text-sm sm:text-base text-gray-400 mb-4">Open your Drupal project in VS Code. You'll see the cache buttons in the status bar at the bottom-left.</p>
                                <div className="flex items-center gap-3 text-sm bg-[#4ec9b0]/10 border border-[#4ec9b0]/30 rounded-lg px-4 py-3">
                                    <CheckCircle className="w-5 h-5 text-[#4ec9b0]" />
                                    <span className="font-medium text-[#4ec9b0]">Ready to clear cache!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Installation