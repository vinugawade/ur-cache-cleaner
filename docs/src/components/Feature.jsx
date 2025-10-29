import { Box, Clock, Code2, Globe, Terminal, Zap } from 'lucide-react';

const Feature = () => {

    const features = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: "One-Click Cache Clearing",
            description: "Clear Drupal and CiviCRM cache instantly from the VS Code status bar."
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Save Time",
            description: "No more switching to terminal or admin panel. Stay in your editor."
        },
        {
            icon: <Terminal className="w-6 h-6" />,
            title: "Keyboard Shortcuts",
            description: "Lightning-fast cache clearing with customizable keyboard shortcuts."
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Local & Remote",
            description: "Works with VS Code desktop and web-based code-server environments."
        },
        {
            icon: <Box className="w-6 h-6" />,
            title: "Multiple Platforms",
            description: "Compatible with DDEV, Lando, and plain setup environments."
        },
        {
            icon: <Code2 className="w-6 h-6" />,
            title: "Linux & macOS",
            description: "Built specifically for Linux and macOS development environments."
        }
    ];

    return (
        <section id="features" className="bg-[#252526] py-12 sm:py-16 border-t border-[#3e3e42]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-8 sm:mb-12">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4">Features</h3>
                    <p className="text-base sm:text-lg text-gray-400">Everything you need for efficient cache clearing</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-6 hover:border-[#0098ff] hover:shadow-lg hover:shadow-[#0098ff]/10 transition-all"
                        >
                            <div className="w-12 h-12 bg-gradient-to-br from-[#0098ff] to-[#4ec9b0] rounded-lg flex items-center justify-center mb-4 text-white shadow-lg">
                                {feature.icon}
                            </div>
                            <h4 className="text-lg font-semibold mb-2 text-white">{feature.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Feature