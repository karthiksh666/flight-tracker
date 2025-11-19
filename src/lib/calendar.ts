import { Flight } from '@/app/api/flights/route';

export function generateGoogleCalendarUrl(flight: Flight): string {
    const startTime = new Date(flight.departureTime).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endTime = new Date(flight.arrivalTime).toISOString().replace(/-|:|\.\d\d\d/g, '');

    const title = `Flight ${flight.flightNumber} to ${flight.destination.split('(')[0].trim()}`;
    const details = `Flight: ${flight.flightNumber}\nAirline: ${flight.airline}\nFrom: ${flight.origin}\nTo: ${flight.destination}\nStatus: ${flight.status}\nGate: ${flight.gate}`;
    const location = `${flight.origin} to ${flight.destination}`;

    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', title);
    url.searchParams.append('dates', `${startTime}/${endTime}`);
    url.searchParams.append('details', details);
    url.searchParams.append('location', location);

    return url.toString();
}
