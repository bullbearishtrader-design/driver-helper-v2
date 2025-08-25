import { useState } from 'react';

export default function DriverAssistant() {
  const [distance, setDistance] = useState(0);
  const [consumption, setConsumption] = useState(6.5); // L/100km
  const [price, setPrice] = useState(2.2); // RM/L
  const [fuelCost, setFuelCost] = useState(null);

  const [reminderTime, setReminderTime] = useState('');
  const [reminders, setReminders] = useState([]);

  const calculateFuel = () => {
    const liters = (distance * consumption) / 100;
    const cost = liters * price;
    setFuelCost({ liters: liters.toFixed(2), cost: cost.toFixed(2) });
  };

  const addReminder = () => {
    if (!reminderTime) return;
    setReminders([...reminders, reminderTime]);
    setReminderTime('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 grid gap-6">
      <h1 className="text-2xl font-bold text-center">Driver Assistant</h1>

      {/* Fuel Calculator */}
      <div className="p-4 shadow-xl rounded-2xl bg-white">
        <h2 className="text-xl font-semibold mb-3">Fuel Calculator</h2>
        <div className="grid gap-3">
          <input
            type="number"
            placeholder="Distance (km)"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Consumption (L/100km)"
            value={consumption}
            onChange={(e) => setConsumption(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Fuel Price (RM/L)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={calculateFuel}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Calculate
          </button>

          {fuelCost && (
            <div className="mt-3 text-lg">
              <p>Liters needed: <b>{fuelCost.liters} L</b></p>
              <p>Estimated cost: <b>RM {fuelCost.cost}</b></p>
            </div>
          )}
        </div>
      </div>

      {/* KLIA Reminder */}
      <div className="p-4 shadow-xl rounded-2xl bg-white">
        <h2 className="text-xl font-semibold mb-3">KLIA Reminder</h2>
        <div className="grid gap-3">
          <input
            type="datetime-local"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={addReminder}
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Set Reminder
          </button>

          <ul className="mt-3 list-disc pl-6">
            {reminders.map((r, i) => (
              <li key={i}>{new Date(r).toLocaleString()}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}