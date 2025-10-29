"use client"
import React, { useState } from 'react';

const KeyboardShortcuts = () => {
    const [activeTab, setActiveTab] = useState('drupal');

    const shortcuts = {
        drupal: [
            { os: "macOS", keys: ["⇧", "⌘", "C", "R"] },
            { os: "Linux", keys: ["Ctrl", "Shift", "C", "R"] }
        ],
        civicrm: [
            { os: "macOS", keys: ["⇧", "⌘", "C", "C"] },
            { os: "Linux", keys: ["Ctrl", "Shift", "C", "C"] }
        ]
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="text-center mb-8 sm:mb-12">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">Keyboard Shortcuts</h3>
                <p className="text-base sm:text-lg text-gray-400">Clear cache without touching your mouse</p>
            </div>

            <div className="max-w-3xl mx-auto">
                <div className="flex gap-2 mb-6 bg-[#2d2d30] p-1 rounded-lg border border-[#3e3e42]">
                    <button
                        onClick={() => setActiveTab('drupal')}
                        className={`flex-1 px-3 sm:px-4 py-2 rounded font-medium transition-all text-sm sm:text-base ${activeTab === 'drupal'
                            ? 'bg-gradient-to-r from-[#0098ff] to-[#00b4ff] text-white shadow-lg'
                            : 'text-gray-400 hover:text-white hover:bg-[#3e3e42]'
                            }`}
                    >
                        Drupal Cache
                    </button>
                    <button
                        onClick={() => setActiveTab('civicrm')}
                        className={`flex-1 px-3 sm:px-4 py-2 rounded font-medium transition-all text-sm sm:text-base ${activeTab === 'civicrm'
                            ? 'bg-gradient-to-r from-[#4ec9b0] to-[#5dd9bf] text-white shadow-lg'
                            : 'text-gray-400 hover:text-white hover:bg-[#3e3e42]'
                            }`}
                    >
                        CiviCRM Cache
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    {shortcuts[activeTab].map((shortcut, index) => (
                        <div
                            key={index}
                            className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-4 sm:p-6 hover:border-[#0098ff]/50 hover:shadow-lg hover:shadow-[#0098ff]/10 transition-all"
                        >
                            <div className="text-sm text-[#0098ff] font-medium mb-3">{shortcut.os}</div>
                            <div className="flex items-center gap-2 flex-wrap">
                                {shortcut.keys.map((key, keyIndex) => (
                                    <React.Fragment key={keyIndex}>
                                        <kbd className="bg-gradient-to-br from-[#3e3e42] to-[#2d2d30] border border-[#0098ff]/30 px-2 sm:px-3 py-1 sm:py-2 rounded font-mono text-xs sm:text-sm shadow-md text-white">
                                            {key}
                                        </kbd>
                                        {keyIndex < shortcut.keys.length - 1 && (
                                            <span className="text-[#4ec9b0] text-base sm:text-lg font-bold">+</span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default KeyboardShortcuts