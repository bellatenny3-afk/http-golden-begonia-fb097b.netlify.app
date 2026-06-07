# Clock Feature Documentation

## Digital Clock Component

A feature-rich digital clock display that shows the current time in multiple time zones.

### Features

- 🕐 **Real-time Display** - Updates every second
- 🌍 **Multiple Time Zones** - 12 different time zones supported
- 📅 **Date Display** - Shows current date with day name
- 🎨 **Beautiful UI** - Modern gradient design with Tailwind CSS
- ⚡ **Fast Switching** - Instant timezone switching
- 🌐 **World Clocks** - Preview of top 6 timezones simultaneously

### Supported Time Zones

| Code | Name | UTC Offset |
|------|------|-----------|
| UTC | Coordinated Universal Time | +0 |
| EST | Eastern Standard Time | -5 |
| CST | Central Standard Time | -6 |
| MST | Mountain Standard Time | -7 |
| PST | Pacific Standard Time | -8 |
| GMT | Greenwich Mean Time | +0 |
| IST | Indian Standard Time | +5:30 |
| JST | Japan Standard Time | +9 |
| AEST | Australian Eastern Standard Time | +10 |
| NZST | New Zealand Standard Time | +12 |
| CET | Central European Time | +1 |
| SGT | Singapore Standard Time | +8 |

### Usage

The clock is integrated into the main app. After logging in, you can:

1. Click the **🕐 Clock** button in the sidebar
2. See the current time in the selected timezone
3. Click any timezone button to switch displays
4. View multiple timezone clocks in the "World Clocks" section

### Component Structure

```jsx
<DigitalClock />
  ├── Main Clock Display
  │   ├── Timezone Label
  │   ├── Digital Time (HH:MM:SS)
  │   └── AM/PM Indicator
  ├── Timezone Selector
  │   ├── Grid of timezone buttons
  │   └── UTC time display
  └── World Clocks Preview
      └── Multiple timezone clocks
```

### Technical Details

- Built with React hooks (useState, useEffect)
- Uses JavaScript Date API for timezone calculations
- Real-time updates via setInterval (1 second)
- Responsive design for mobile and desktop
- Gradient background with modern styling

### How Timezone Conversion Works

The component calculates timezone offsets from UTC:

```javascript
const utc = time.getTime() + time.getTimezoneOffset() * 60000
const zoneTime = new Date(utc + 3600000 * offset)
```

This ensures accurate time display regardless of the user's local timezone.

### Performance

- Efficient re-renders with React hooks
- Single interval timer for all clock updates
- Cleaned up on component unmount
- No external API calls
