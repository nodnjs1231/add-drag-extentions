# Add Drag Extension Installation and Testing Guide

## 🔧 Installation Process

### Step 1: File Preparation

-   Ensure all files are in a single folder
-   Required files:
    -   manifest.json
    -   content.js
    -   background.js
    -   popup.html
    -   popup.css
    -   popup.js
    -   README.md

### Step 2: Add Icons (Optional)

Since manifest.json references icons, add PNG icons in these sizes:

-   icon16.png (16x16 pixels)
-   icon48.png (48x48 pixels)
-   icon128.png (128x128 pixels)

The extension will work without icons but will use default icons.

### Step 3: Load Extension in Chrome

1. Open Chrome browser and enter `chrome://extensions/` in the address bar
2. Enable "Developer mode" toggle in the top right
3. Click "Load unpacked extension"
4. Select the folder containing the files
5. When successfully loaded, "Add Drag" will appear in the list

## 🧪 Testing

### Basic Testing

1. Navigate to any website (e.g., Google, Wikipedia)
2. Select text containing numbers with your mouse
3. Click the extension icon to check the popup
4. Verify that extracted numbers are added to the total

### Advanced Testing

Copy and paste this text into a notepad or web editor for testing:

```
Test Data:
Price: 1,250
Discount: -150
Tax: 12.5%
Quantity: 3
Total: 3,350
```

Expected Results:

-   Selecting "1,250": Adds 1250
-   Selecting "-150": Adds -150
-   Selecting "12.5%": Adds 12.5
-   Selecting "3": Adds 3
-   Selecting "3,350": Adds 3350

## 🐛 Troubleshooting

### Extension Not Loading

-   Check manifest.json for JSON syntax errors
-   Verify all files are in the correct location
-   Check Chrome developer tools console for error messages

### Numbers Not Extracting

-   Test on different websites
-   Check for badge changes on the extension icon
-   Check developer tools console for error messages

### Popup Not Opening

-   Verify popup.html exists
-   Check file paths are correct
-   Refresh browser and try again

## 📊 Performance Optimization

### Memory Usage

-   Only keeps last 10 extraction records
-   Automatic data cleanup
-   Efficient event listener usage

### Battery Usage

-   Service worker for efficient background resources
-   Scripts run only when needed
-   Efficient DOM manipulation

## 🔒 Security Considerations

### Minimal Permissions

-   activeTab: Only works on current tab
-   storage: For local data storage
-   No remote code execution

### Data Protection

-   All data stored locally
-   No network communication
-   No personal data collection

## 🚀 Deployment Preparation

To publish on Chrome Web Store:

1. Add icon files
2. Prepare detailed description and screenshots
3. Register developer account ($5 fee)
4. Package and upload extension
5. Wait for review (typically 1-3 days)

## 📞 Support

If you encounter issues:

1. Review README.md
2. Check Chrome extension developer documentation
3. Seek help in developer communities
