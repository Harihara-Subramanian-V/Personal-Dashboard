import React, { useState } from 'react';
import { Plane, ShieldCheck, Ticket, RefreshCw } from 'lucide-react';
import { cyberAudio } from '../../utils/audio';

interface FlightOption {
  flightNo: string;
  from: string;
  to: string;
  depTime: string;
  arrTime: string;
  baseFare: number;
  availableSeats: string[];
}

const FLIGHTS_DB: FlightOption[] = [
  {
    flightNo: 'AI-840',
    from: 'MAA (Chennai)',
    to: 'DEL (Delhi)',
    depTime: '06:30 IST',
    arrTime: '09:15 IST',
    baseFare: 4850,
    availableSeats: ['1A', '1B', '2A', '2C', '3B', '3C', '4A', '4B'],
  },
  {
    flightNo: '6E-502',
    from: 'BLR (Bengaluru)',
    to: 'BOM (Mumbai)',
    depTime: '14:15 IST',
    arrTime: '15:55 IST',
    baseFare: 3600,
    availableSeats: ['1A', '2B', '2C', '3A', '4B', '4C'],
  },
  {
    flightNo: 'SG-291',
    from: 'CJB (Coimbatore)',
    to: 'HYD (Hyderabad)',
    depTime: '18:45 IST',
    arrTime: '20:10 IST',
    baseFare: 3100,
    availableSeats: ['1B', '1C', '2A', '3A', '3B'],
  },
];

export const FlightReservationSimulator: React.FC = () => {
  const [selectedFlight, setSelectedFlight] = useState<FlightOption>(FLIGHTS_DB[0]);
  const [selectedSeat, setSelectedSeat] = useState<string>('1A');
  const [passengerName, setPassengerName] = useState<string>('Harihara Subramanian');
  const [role, setRole] = useState<'USER' | 'ADMIN'>('USER');
  const [ticketConfirmed, setTicketConfirmed] = useState<boolean>(false);
  const [pnrCode, setPnrCode] = useState<string>('HS840-77X');
  const [dbLogs, setDbLogs] = useState<string[]>([
    'SQL_CONNECT: Connected to MySQL host 127.0.0.1:3306 [OK]',
    'QUERY: SELECT * FROM flights WHERE status="SCHEDULED" [3 ROWS RETURNED]',
  ]);

  const handleSelectSeat = (seat: string) => {
    cyberAudio.playClick();
    setSelectedSeat(seat);
  };

  const handleBookTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerName.trim()) return;

    cyberAudio.playAccessGranted();
    const newPnr = `HS${Math.floor(100 + Math.random() * 900)}-${selectedFlight.flightNo.slice(-2)}X`;
    setPnrCode(newPnr);
    setTicketConfirmed(true);

    setDbLogs((prev) => [
      ...prev,
      `TXN_BEGIN: START TRANSACTION`,
      `INSERT INTO bookings (pnr, flight_id, passenger, seat) VALUES ('${newPnr}', '${selectedFlight.flightNo}', '${passengerName}', '${selectedSeat}')`,
      `COMMIT: 1 row affected (0.003 sec)`,
      `AUTH_LOG: Booking confirmed by ${role} profile. PNR: ${newPnr}`,
    ]);
  };

  const handleReset = () => {
    cyberAudio.playClick();
    setTicketConfirmed(false);
    setSelectedSeat('1A');
  };

  return (
    <div className="space-y-4 text-xs font-mono">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orange-500/20 pb-3">
        <div className="flex items-center gap-2">
          <Plane className="w-5 h-5 text-orange-400" />
          <span className="font-orbitron text-sm font-bold text-orange-400">
            AIR TICKET RESERVATION ENGINE // CLI SIMULATOR
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-neutral-400">ROLE:</span>
          <button
            onClick={() => {
              cyberAudio.playClick();
              setRole(role === 'USER' ? 'ADMIN' : 'USER');
            }}
            className={`px-2 py-0.5 rounded border text-[11px] font-bold ${
              role === 'ADMIN'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                : 'bg-orange-500/20 text-orange-400 border-orange-500'
            }`}
          >
            {role} PROFILE
          </button>
        </div>
      </div>

      {!ticketConfirmed ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Flight Selection & Passenger Details */}
          <div className="bg-black/60 p-3 rounded border border-orange-500/20 space-y-3">
            <div className="text-orange-400 font-bold uppercase">1. Select Flight Schedule</div>
            <div className="space-y-2">
              {FLIGHTS_DB.map((f) => (
                <div
                  key={f.flightNo}
                  onClick={() => {
                    cyberAudio.playClick();
                    setSelectedFlight(f);
                    setSelectedSeat(f.availableSeats[0]);
                  }}
                  className={`p-2.5 rounded border cursor-pointer transition-all ${
                    selectedFlight.flightNo === f.flightNo
                      ? 'bg-orange-500/20 border-orange-500 text-white'
                      : 'bg-black/40 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-orange-400">{f.flightNo}</span>
                    <span className="text-emerald-400">₹{f.baseFare}</span>
                  </div>
                  <div className="text-[11px] text-neutral-300">
                    {f.from} ➔ {f.to}
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    DEP: {f.depTime} | ARR: {f.arrTime}
                  </div>
                </div>
              ))}
            </div>

            {/* Passenger Form */}
            <form onSubmit={handleBookTicket} className="space-y-2 pt-2 border-t border-neutral-800">
              <label className="text-neutral-400 block text-[11px]">Passenger Name:</label>
              <input
                type="text"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                className="w-full bg-black/80 border border-orange-500/40 rounded px-2.5 py-1.5 text-white font-mono focus:outline-none focus:border-orange-400"
                placeholder="Enter Passenger Name"
                required
              />

              <button
                type="submit"
                className="w-full mt-3 py-2 bg-orange-500 text-black font-bold font-orbitron uppercase rounded hover:bg-orange-400 transition-colors shadow-md shadow-orange-500/30 flex items-center justify-center gap-1.5"
              >
                <Ticket className="w-4 h-4" /> Issue Ticket (SQL Transaction)
              </button>
            </form>
          </div>

          {/* Seat Layout Matrix & MySQL CLI Terminal Output */}
          <div className="space-y-3">
            <div className="bg-black/60 p-3 rounded border border-orange-500/20 space-y-2">
              <div className="text-orange-400 font-bold uppercase flex items-center justify-between">
                <span>2. Interactive Seat Matrix</span>
                <span className="text-[11px] text-neutral-400">Selected: <strong className="text-orange-400">{selectedSeat}</strong></span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-2">
                {['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C', '4A', '4B', '4C'].map((seat) => {
                  const isAvailable = selectedFlight.availableSeats.includes(seat);
                  const isSelected = selectedSeat === seat;

                  return (
                    <button
                      key={seat}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => handleSelectSeat(seat)}
                      className={`py-2 px-1 rounded text-center font-mono text-xs transition-all border ${
                        isSelected
                          ? 'bg-orange-500 text-black font-bold border-orange-400 shadow-md shadow-orange-500/40'
                          : isAvailable
                          ? 'bg-neutral-900 border-orange-500/30 text-orange-300 hover:border-orange-500 hover:bg-neutral-800'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-600 cursor-not-allowed line-through'
                      }`}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-around text-[10px] text-neutral-400 pt-1">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-orange-500 inline-block"></span> Selected</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-neutral-800 border border-orange-500/40 inline-block"></span> Available</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-neutral-950 border border-neutral-800 inline-block"></span> Booked</span>
              </div>
            </div>

            {/* SQL Terminal Log Output */}
            <div className="bg-black/90 p-2.5 rounded border border-neutral-800 text-[10px] text-neutral-400 font-mono h-[110px] overflow-y-auto space-y-1">
              <div className="text-orange-400/80 font-bold border-b border-neutral-800 pb-1">SQL_EXEC_LOGS:</div>
              {dbLogs.slice(-4).map((log, i) => (
                <div key={i} className="leading-tight">
                  <span className="text-neutral-600">&gt;</span> {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Confirmed Ticket Boarding Pass Voucher */
        <div className="bg-gradient-to-br from-neutral-950 to-black p-5 rounded-lg border-2 border-orange-500 shadow-xl shadow-orange-500/20 space-y-4">
          <div className="flex justify-between items-start border-b border-orange-500/40 pb-3">
            <div>
              <div className="text-[10px] text-orange-400 tracking-widest uppercase font-bold">
                BOARDING PASS // VERIFIED TRANSACTION
              </div>
              <div className="text-lg font-orbitron font-black text-white">{selectedFlight.flightNo} • {selectedFlight.from.slice(0, 3)} ➔ {selectedFlight.to.slice(0, 3)}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-neutral-400 uppercase">PNR REFERENCE</div>
              <div className="text-base font-orbitron font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/30">
                {pnrCode}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <div className="text-[10px] text-neutral-500">PASSENGER</div>
              <div className="font-bold text-neutral-200">{passengerName}</div>
            </div>
            <div>
              <div className="text-[10px] text-neutral-500">SEAT NUMBER</div>
              <div className="font-bold text-orange-400">{selectedSeat} (Confirmed)</div>
            </div>
            <div>
              <div className="text-[10px] text-neutral-500">DEPARTURE TIME</div>
              <div className="font-bold text-neutral-200">{selectedFlight.depTime}</div>
            </div>
            <div>
              <div className="text-[10px] text-neutral-500">FARE CHARGED</div>
              <div className="font-bold text-emerald-400">₹{selectedFlight.baseFare} PAID</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-800 text-[11px]">
            <div className="text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> ACID Transaction Committed to MySQL Engine
            </div>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-orange-300 rounded border border-orange-500/40 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Book Another Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
