# Lost Wallet Finder 👛

A React Native mobile app built with Expo that helps people report lost wallets and connect with those who have found them.

## Features

- 📱 **Report Lost Wallet**: Submit details about your lost wallet with photos and GPS location
- 🔍 **Found a Wallet?**: Report found wallets to help reunite them with their owners
- 📋 **My Reports**: View, update, and manage all your lost and found wallet reports
- 📍 **GPS Location**: Automatically capture location coordinates where wallet was lost/found
- 📷 **Photo Upload**: Add photos of the wallet for easier identification
- 💾 **Local Storage**: All data stored locally on device using AsyncStorage
- 📞 **Contact Info**: Store phone and email for easy contact

## Tech Stack

- **React Native** with Expo
- **React Navigation** (Bottom Tab Navigator)
- **AsyncStorage** for local data persistence
- **Expo Location** for GPS functionality
- **Expo Image Picker** for photo selection

## Project Structure

```
lost-wallet-finder/
├── App.js                          # Main app component with navigation
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── context/
│   └── WalletContext.js           # Global state management
└── screens/
    ├── ReportLostScreen.js        # Screen to report lost wallets
    ├── FindWalletScreen.js        # Screen to report found wallets
    └── MyReportsScreen.js         # Screen to view and manage reports
```

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/lost-wallet-finder.git
cd lost-wallet-finder
```

2. Install dependencies
```bash
npm install
```

3. Install Expo CLI (if not already installed)
```bash
npm install -g expo-cli
```

## Running the App

### Start the development server
```bash
npm start
```

### Run on Android
```bash
npm run android
```

### Run on iOS
```bash
npm run ios
```

### Run on Web
```bash
npm run web
```

## How to Use

### Reporting a Lost Wallet
1. Navigate to the "Report Lost Wallet" tab
2. Fill in the wallet color (required)
3. Add contents and location information
4. Enter your contact details (phone and email are required)
5. Optionally add a photo
6. Tap "Submit Report"

### Reporting a Found Wallet
1. Navigate to the "Found a Wallet?" tab
2. Fill in the wallet color (required)
3. Add description of what's inside
4. Capture or upload a photo
5. Get current location (optional)
6. Enter your contact information
7. Tap "Submit Found Wallet Report"

### Managing Reports
1. Navigate to "My Reports" tab
2. View all your lost and found wallet reports
3. Tap on any report to expand details
4. Update status (Mark as Recovered/Claimed) when the wallet is returned
5. Delete reports if no longer needed

## Data Storage

All wallet data is stored locally on your device using AsyncStorage:
- Lost wallets are stored in `lostWallets` key
- Found wallets are stored in `foundWallets` key

Data persists between app sessions and is only accessible on the device.

## Permissions Required

- **Location**: To capture GPS coordinates of where wallet was lost/found
- **Camera Roll/Photos**: To upload wallet photos

## Future Enhancements

- [ ] Cloud backend for cross-device searching
- [ ] Push notifications when potential matches found
- [ ] Map view of lost/found locations
- [ ] User profiles and reputation system
- [ ] Chat messaging between users
- [ ] QR codes for wallet identification
- [ ] Integration with local police departments
- [ ] Reward system for returned wallets

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT
