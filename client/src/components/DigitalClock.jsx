import { useState, useEffect } from 'react'

export default function DigitalClock() {
  const [time, setTime] = useState(new Date())
  const [selectedZone, setSelectedZone] = useState('UTC')

  const timeZones = [
    { name: 'UTC', offset: 0, label: 'Coordinated Universal Time' },
    { name: 'EST', offset: -5, label: 'Eastern Standard Time' },
    { name: 'CST', offset: -6, label: 'Central Standard Time' },
    { name: 'MST', offset: -7, label: 'Mountain Standard Time' },
    { name: 'PST', offset: -8, label: 'Pacific Standard Time' },
    { name: 'GMT', offset: 0, label: 'Greenwich Mean Time' },
    { name: 'IST', offset: 5.5, label: 'Indian Standard Time' },
    { name: 'JST', offset: 9, label: 'Japan Standard Time' },
    { name: 'AEST', offset: 10, label: 'Australian Eastern Standard Time' },
    { name: 'NZST', offset: 12, label: 'New Zealand Standard Time' },
    { name: 'CET', offset: 1, label: 'Central European Time' },
    { name: 'SGT', offset: 8, label: 'Singapore Standard Time' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getTimeInZone = (offset) => {
    const utc = time.getTime() + time.getTimezoneOffset() * 60000
    const zoneTime = new Date(utc + 3600000 * offset)
    return zoneTime
  }

  const displayTime = getTimeInZone(timeZones.find(z => z.name === selectedZone)?.offset || 0)
  const hours = String(displayTime.getHours()).padStart(2, '0')
  const minutes = String(displayTime.getMinutes()).padStart(2, '0')
  const seconds = String(displayTime.getSeconds()).padStart(2, '0')
  const period = displayTime.getHours() >= 12 ? 'PM' : 'AM'

  const selectedTimezone = timeZones.find(z => z.name === selectedZone)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main Clock Display */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 mb-8 border border-purple-500/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-purple-300 mb-2">{selectedTimezone?.label}</h2>
            <p className="text-purple-400 text-sm">{selectedTimezone?.name}</p>
          </div>

          {/* Digital Clock */}
          <div className="bg-black rounded-2xl p-8 mb-6 shadow-inner border border-purple-500/30">
            <div className="text-7xl font-mono font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 tracking-wider">
              {hours}:{minutes}:{seconds}
            </div>
            <div className="text-3xl font-mono font-bold text-center text-purple-300 mt-4">
              {period}
            </div>
          </div>

          {/* Date Display */}
          <div className="text-center text-purple-300">
            <p className="text-lg font-semibold">
              {displayTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Timezone Selector */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 border border-purple-500/20">
          <h3 className="text-xl font-bold text-purple-300 mb-6">Select Time Zone</h3>
          
          {/* Grid of Timezone Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {timeZones.map((zone) => (
              <button
                key={zone.name}
                onClick={() => setSelectedZone(zone.name)}
                className={`p-4 rounded-lg font-semibold transition-all duration-200 ${
                  selectedZone === zone.name
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'bg-slate-700 text-purple-300 hover:bg-slate-600 hover:text-purple-200'
                }`}
              >
                <div className="text-lg font-bold">{zone.name}</div>
                <div className="text-xs text-opacity-70">UTC{zone.offset >= 0 ? '+' : ''}{zone.offset}</div>
              </button>
            ))}
          </div>

          {/* Clock Info */}
          <div className="mt-8 p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
            <p className="text-purple-300 text-sm">
              <span className="font-semibold">Current UTC Time:</span> {time.toUTCString()}
            </p>
          </div>
        </div>

        {/* World Clocks Preview */}
        <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 border border-purple-500/20">
          <h3 className="text-xl font-bold text-purple-300 mb-6">World Clocks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {timeZones.slice(0, 6).map((zone) => {
              const zoneTime = getTimeInZone(zone.offset)
              const h = String(zoneTime.getHours()).padStart(2, '0')
              const m = String(zoneTime.getMinutes()).padStart(2, '0')
              const s = String(zoneTime.getSeconds()).padStart(2, '0')
              return (
                <div key={zone.name} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg border border-purple-500/20">
                  <div>
                    <p className="font-semibold text-purple-300">{zone.name}</p>
                    <p className="text-sm text-purple-400">{zone.label}</p>
                  </div>
                  <div className="font-mono text-xl font-bold text-cyan-400">
                    {h}:{m}:{s}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
