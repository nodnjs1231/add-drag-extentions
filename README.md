# Add Drag - Chrome Extension

A Chrome extension that automatically extracts and sums numbers from selected text on web pages.

## 📋 Features

-   🔍 Automatically extracts numbers from selected text
-   ➕ Accumulates extracted numbers in real-time
-   📊 Displays total sum and recently extracted numbers
-   🔄 Reset button to clear all data
-   💾 Data persists after browser restart

## 🚀 Installation

1. Open `chrome://extensions/` in Chrome browser
2. Enable "Developer mode" in the top right
3. Click "Load unpacked extension"
4. Select this folder to load the extension

## 📁 File Structure

```
add-drag/
├── manifest.json       # Extension configuration
├── content.js         # Web page script (drag detection)
├── background.js      # Background service worker
├── popup.html         # Popup UI structure
├── popup.css          # Popup styles
├── popup.js          # Popup functionality
└── README.md         # This file
```

## 🎯 How to Use

1. Select text containing numbers on any webpage
2. The extension will automatically extract and add the numbers
3. Click the extension icon to check current total and recent history
4. Use the reset button to clear all data

## 🔧 Supported Number Formats

-   Integers: `123`, `456`
-   Decimals: `12.34`, `0.5`
-   Negative numbers: `-123`, `-45.67`
-   Numbers with commas: `1,234`, `12,345.67`

## ⚠️ Note

-   Icon files (icon16.png, icon48.png, icon128.png) need to be added separately
-   Built with Manifest V3 for latest Chrome compatibility

## 🛠️ Development Info

-   **Manifest Version**: 3
-   **Permissions**: activeTab, storage
-   **Compatible Browsers**: Chrome, Edge, Opera, and other Chromium-based browsers

## 📝 License

MIT License
#   a d d - d r a g - e x t e n t i o n s  
 