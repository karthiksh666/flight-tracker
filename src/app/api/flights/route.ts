import { NextResponse } from 'next/server';
import { fetchFlightStatus } from '@/lib/aviationstack';
import { AviationstackFlightData } from '@/types/aviationstack';

export interface Flight {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  status: string; // Changed to string to accommodate API values
  gate: string;
}

const MOCK_FLIGHTS: Flight[] = [
  {
    flightNumber: 'AA123',
    airline: 'American Airlines',
    origin: 'New York (JFK)',
    destination: 'London (LHR)',
    departureTime: '2023-11-20T18:00:00Z',
    arrivalTime: '2023-11-21T06:00:00Z',
    status: 'On Time',
    gate: 'B12',
  },
  // ... other mock flights can remain if needed for fallback
];

function mapApiDataToFlight(data: AviationstackFlightData): Flight {
  return {
    flightNumber: `${data.flight.iata}`,
    airline: data.airline.name,
    origin: `${data.departure.airport} (${data.departure.iata})`,
    destination: `${data.arrival.airport} (${data.arrival.iata})`,
    departureTime: data.departure.scheduled,
    arrivalTime: data.arrival.scheduled,
    status: data.flight_status,
    gate: data.departure.gate || 'N/A',
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const flightNumber = searchParams.get('flightNumber');

  if (flightNumber) {
    try {
      const apiResponse = await fetchFlightStatus(flightNumber);

      if (apiResponse.data && apiResponse.data.length > 0) {
        const flights = apiResponse.data.map(mapApiDataToFlight);
        return NextResponse.json(flights);
      }

      // If API returns no data, return empty array (or fallback to mock if you want to simulate success for testing)
      return NextResponse.json([]);
    } catch (error) {
      console.error('API call failed, falling back to mock data:', error);
      // Fallback to mock data for demonstration if API fails (e.g. invalid key)
      const filteredFlights = MOCK_FLIGHTS.filter((flight) =>
        flight.flightNumber.toLowerCase().includes(flightNumber.toLowerCase())
      );
      return NextResponse.json(filteredFlights);
    }
  }

  return NextResponse.json(MOCK_FLIGHTS);
}
