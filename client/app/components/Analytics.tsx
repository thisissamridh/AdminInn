// Analytics.tsx
import React from 'react';

// Assuming you have a type for your analytics data
interface AnalyticsData {
    totalBookings: number;
    roomsAvailable: number;
    netRevenue: number;
    totalRefunds: number;
}

// Mock data for the analytics
const analyticsData: AnalyticsData = {
    totalBookings: 24,
    roomsAvailable: 8,
    netRevenue: 15000,
    totalRefunds: 2000,
};

const Analytics: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
            <div className="flex flex-wrap justify-around items-center bg-white shadow rounded-lg p-4 mb-4">
                <div className="text-center p-4 border-r border-gray-200">
                    <p className="text-2xl text-black font-semibold">{analyticsData.totalBookings}</p>
                    <p className="text-gray-600">Total Bookings</p>
                </div>
                <div className="text-center p-4 border-r border-gray-200">
                    <p className="text-2xl  text-black font-semibold">{analyticsData.roomsAvailable}</p>
                    <p className="text-gray-600">Rooms Available</p>
                </div>
                <div className="text-center p-4 border-r border-gray-200">
                    <p className="text-2xl text-black  font-semibold">${analyticsData.netRevenue}</p>
                    <p className="text-gray-600">Net Revenue</p>
                </div>
                <div className="text-center p-4">
                    <p className="text-2xl text-black font-semibold">${analyticsData.totalRefunds}</p>
                    <p className="text-gray-600">Total Refunds</p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
