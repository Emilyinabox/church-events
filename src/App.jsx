import React, { useState } from 'react';
import eventData from './event_data.json'; // Importing your "dataset"

// Paste your Google Web App URL here
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw8PjioWLuw3JE-hhm0TP9IKtJLdI76J7-TI7Ug9XbXZETU3qKM3a8lk4XzMnJD7Hsq/exec";

export default function EventDashboard() {
  // Store form input data for each specific activity ID
  const [formStates, setFormStates] = useState({});
  // Store submission status messages for each specific activity ID
  const [statusMessages, setStatusMessages] = useState({});

  // Handle changing text inputs dynamically
  const handleInputChange = (activityId, field, value) => {
    setFormStates(prev => ({
      ...prev,
      [activityId]: {
        ...prev[activityId],
        [field]: value
      }
    }));
  };

  // Handle form submission in React
  const handleSubmit = async (e, activityId, activityTitle) => {
    e.preventDefault();
    
    setStatusMessages(prev => ({ ...prev, [activityId]: "Submitting..." }));

    const currentForm = formStates[activityId] || {};
    
    const formData = {
      event: activityTitle, // Automatically logs which item they signed up for
      name: currentForm.name || '',
      email: currentForm.email || '',
      message: currentForm.message || ''
    };

    try {
      await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors', // Essential for cross-origin requests to Apps Script
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      setStatusMessages(prev => ({ ...prev, [activityId]: "Successfully registered!" }));
      
      // Clear the form fields for this specific card
      setFormStates(prev => ({
        ...prev,
        [activityId]: { name: '', email: '', message: '' }
      }));
    } catch (error) {
      console.error("Submission failed", error);
      setStatusMessages(prev => ({ ...prev, [activityId]: "Error submitting data. Try again." }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <header className="text-center my-12">
        <h1 className="text-4xl font-extrabold text-orange-600">Church Halloween Celebration</h1>
        <p className="text-gray-600 mt-2">Join the fun and find out how you can serve our community!</p>
      </header>

      {/* Grid Layout Container */}
      <div className="grid md:grid-cols-2 gap-6">
        {eventData.map((activity) => {
          const currentForm = formStates[activity.id] || { name: '', email: '', message: '' };
          
          return (
            <div key={activity.id} className="border rounded-xl p-6 shadow-sm bg-white flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{activity.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                
                <div className="mb-6 flex flex-wrap gap-2">
                  {activity.details.map((detail, index) => (
                  <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {detail}
                  </span>
                  ))}
                </div>

                {/* Inline Volunteer Form */}
                <form 
                  onSubmit={(e) => handleSubmit(e, activity.id, activity.title)} 
                  className="space-y-3 my-6 p-4 bg-orange-50/50 rounded-lg border border-orange-100"
                >
                  <h3 className="font-semibold text-gray-700 text-sm">Quick RSVP / Ask a Question:</h3>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor={`name-${activity.id}`}>Name</label>
                    <input 
                      type="text" 
                      id={`name-${activity.id}`}
                      className="w-full text-sm p-2 border rounded-md focus:ring-1 focus:ring-orange-500 focus:outline-none"
                      value={currentForm.name}
                      onChange={(e) => handleInputChange(activity.id, 'name', e.target.value)}
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor={`email-${activity.id}`}>Email</label>
                    <input 
                      type="email" 
                      id={`email-${activity.id}`}
                      className="w-full text-sm p-2 border rounded-md focus:ring-1 focus:ring-orange-500 focus:outline-none"
                      value={currentForm.email}
                      onChange={(e) => handleInputChange(activity.id, 'email', e.target.value)}
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor={`msg-${activity.id}`}>Message / Note</label>
                    <textarea 
                      id={`msg-${activity.id}`}
                      className="w-full text-sm p-2 border rounded-md focus:ring-1 focus:ring-orange-500 focus:outline-none h-16 resize-none"
                      value={currentForm.message}
                      onChange={(e) => handleInputChange(activity.id, 'message', e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-gray-800 text-white hover:bg-gray-900 transition text-xs font-bold py-2 rounded-md"
                  >
                    Submit Details
                  </button>
                  
                  {statusMessages[activity.id] && (
                    <p className="text-xs font-medium text-center text-orange-700 mt-2">
                      {statusMessages[activity.id]}
                    </p>
                  )}
                </form>
              </div>

              {/* Link to Church Center */}
              {/* <a 
                href={activity.church_center_url}
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition mt-4"
              >
                Sign Up to Volunteer
              </a> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
