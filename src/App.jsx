import React from 'react';
import eventData from './event_data.json'; // Importing your "dataset"

export default function EventDashboard() {
  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <header className="text-center my-12">
        <h1 className="text-4xl font-extrabold text-orange-600">Church Halloween Celebration</h1>
        <p className="text-gray-600 mt-2">Join the fun and find out how you can serve our community!</p>
      </header>

      {/* Grid Layout Container */}
      <div className="grid md:grid-cols-2 gap-6">
        {eventData.map((activity) => (
          <div key={activity.id} className="border rounded-xl p-6 shadow-sm bg-white flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{activity.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
              
              <ul className="mb-6 space-y-1">
                {activity.details.map((detail, index) => (
                  <li key={index} className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-1 rounded mr-2">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Link to Church Center */}
            <a 
              href={activity.church_center_url}
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Sign Up to Volunteer
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
