'use client';

import { useState } from 'react';
import FlightCard from '@/components/FlightCard';
import { Flight } from '@/app/api/flights/route';

export default function Home() {
  const [flightNumber, setFlightNumber] = useState('');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightNumber.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setFlights([]);

    try {
      const response = await fetch(`/api/flights?flightNumber=${encodeURIComponent(flightNumber)}`);
      if (response.ok) {
        const data = await response.json();
        setFlights(data);
      }
    } catch (error) {
      console.error('Failed to fetch flights:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h1>Flight Lookup</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          placeholder="Enter flight number (e.g., AA123)"
          className="search-input"
          aria-label="Flight number"
        />
        <button
          type="submit"
          className="search-button"
          disabled={loading || !flightNumber.trim()}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="results-container">
        {loading && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            Searching for flights...
          </div>
        )}

        {!loading && hasSearched && flights.length === 0 && (
          <div className="error-message">
            No flights found for "{flightNumber}". Please try another flight number.
          </div>
        )}

        {!loading && flights.map((flight) => (
          <FlightCard key={flight.flightNumber} flight={flight} />
        ))}
      </div>
    </main>
  );
}
