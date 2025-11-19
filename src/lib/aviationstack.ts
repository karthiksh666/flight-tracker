import { AviationstackResponse } from '@/types/aviationstack';

const API_KEY = process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY;
const BASE_URL = 'http://api.aviationstack.com/v1';

export async function fetchFlightStatus(flightIata: string): Promise<AviationstackResponse> {
    if (!API_KEY) {
        throw new Error('Aviationstack API key is missing');
    }

    // Note: The free plan only supports HTTP, not HTTPS.
    const url = `${BASE_URL}/flights?access_key=${API_KEY}&flight_iata=${flightIata}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data: AviationstackResponse | any = await response.json();

        if (data.error) {
            throw new Error(`API Error: ${data.error.message}`);
        }

        return data as AviationstackResponse;
    } catch (error) {
        console.error('Error fetching flight status:', error);
        throw error;
    }
}
