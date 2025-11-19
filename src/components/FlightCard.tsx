import React from 'react';
import { Flight } from '@/app/api/flights/route';
import { generateGoogleCalendarUrl } from '@/lib/calendar';

interface FlightCardProps {
    flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
    const departureDate = new Date(flight.departureTime);
    const arrivalDate = new Date(flight.arrivalTime);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="flight-card">
            <div className="flight-header">
                <span className="flight-number">{flight.flightNumber}</span>
                <span className={`flight-status ${flight.status.toLowerCase().replace(' ', '-')}`}>
                    {flight.status}
                </span>
            </div>

            <div className="flight-route">
                <div className="location">
                    <div className="code">{flight.origin.split('(')[1].replace(')', '')}</div>
                    <div className="city">{flight.origin.split('(')[0].trim()}</div>
                    <div className="time">{formatTime(departureDate)}</div>
                    <div className="date">{formatDate(departureDate)}</div>
                </div>

                <div className="route-visual">
                    <div className="line"></div>
                    <div className="plane-icon">✈</div>
                </div>

                <div className="location">
                    <div className="code">{flight.destination.split('(')[1].replace(')', '')}</div>
                    <div className="city">{flight.destination.split('(')[0].trim()}</div>
                    <div className="time">{formatTime(arrivalDate)}</div>
                    <div className="date">{formatDate(arrivalDate)}</div>
                </div>
            </div>

            <div className="flight-footer">
                <div className="info-item">
                    <span className="label">Airline</span>
                    <span className="value">{flight.airline}</span>
                </div>
                <div className="info-item">
                    <span className="label">Gate</span>
                    <span className="value">{flight.gate}</span>
                </div>
                <a
                    href={generateGoogleCalendarUrl(flight)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="calendar-button"
                    aria-label="Add to Google Calendar"
                >
                    📅 Add to Calendar
                </a>
            </div>
        </div>
    );
}
