'use client'
import { useState, useEffect } from "react";
import {  MapPin, Phone, User, Users, Heart, Mail, ArrowRight, Check } from "lucide-react";

const SuccessModal = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl p-8 flex flex-col items-center transform transition-all duration-500 animate-success-appear">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-success-check">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Booking Successful!</h3>
        <p className="text-gray-600">We'll contact you if any modifications</p>
      </div>
    </div>
  );
};

export default function Home() {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Rest of the constants remain the same
  const doctors = [
    { id: 1, name: "Dr. Sarah Wilson", specialty: "Cardiologist", availability: "Mon, Wed, Fri" },
    { id: 2, name: "Dr. James Miller", specialty: "Neurologist", availability: "Tue, Thu, Sat" },
    { id: 3, name: "Dr. Emily Chen", specialty: "Pediatrician", availability: "Mon, Tue, Wed" },
    { id: 4, name: "Dr. Michael Davis", specialty: "Dermatologist", availability: "Wed, Thu, Fri" },
    { id: 5, name: "Dr. Lisa Thompson", specialty: "Orthopedist", availability: "Mon, Thu, Sat" },
    { id: 6, name: "Dr. Robert Johnson", specialty: "Psychiatrist", availability: "Tue, Fri, Sat" },
  ];

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  // Date generation useEffect remains the same
  useEffect(() => {
    const generateDates = () => {
      const dates = [];
      const today = new Date();
      
      for (let i = 1; i <= 10; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        dates.push({
          date: nextDate,
          formatted: nextDate.toISOString().split('T')[0],
          display: nextDate.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })
        });
      }
      setAvailableDates(dates);
    };

    generateDates();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      // Reset form
      setSelectedDoctor("");
      setSelectedDate(null);
      setSelectedTime("");
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation remains the same */}
      <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Brandname
              </h1>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2">
                <Mail size={18} />
                Contact
              </a>
              
            </div>
          </div>
        </div>
      </nav>

      <SuccessModal 
        isVisible={showSuccess} 
        onClose={() => setShowSuccess(false)} 
      />


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Book Your Appointment
          </h2>
          <p className="text-gray-600 mb-8">Schedule a consultation with our expert medical professionals</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <Users size={18} className="text-blue-600" />
                    Select Your Doctor
                  </span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        selectedDoctor === doctor.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      <p className="text-xs text-gray-500 mt-1">Available: {doctor.availability}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal Information - Updated input styles */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <User size={18} className="text-blue-600" />
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <Phone size={18} className="text-blue-600" />
                      Phone/WhatsApp
                    </span>
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                    placeholder="9999999999"
                  />
                </div>
              </div>
            </div>

            {/* Date and Time Selection - Enhanced selection states */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">Select Appointment Time</h3>
              
              {/* Date Selection - Updated with better selection state */}
              <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
                {availableDates.map((date, index) => (
                  <div
                    key={date.formatted}
                    onClick={() => setSelectedDate(date.formatted)}
                    className={`flex-shrink-0 w-32 p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                      selectedDate === date.formatted
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                        : index % 2 === 0 
                          ? 'bg-blue-100 hover:bg-blue-200' 
                          : 'bg-purple-100 hover:bg-purple-200'
                    }`}
                  >
                    <p className={`text-sm font-medium ${
                      selectedDate === date.formatted ? 'text-white' : 'text-gray-600'
                    }`}>{date.display}</p>
                  </div>
                ))}
              </div>

              {/* Time Selection - Enhanced visual feedback */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {timeSlots.map((time, index) => (
                  <div
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-xl text-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                      selectedTime === time
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                        : 'bg-white border-2 border-blue-200 text-gray-500 hover:border-blue-300'
                    }`}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Information - Updated input styles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <MapPin size={18} className="text-blue-600" />
                    Location
                  </span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="Enter your location"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Referred By</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                  placeholder="Enter referral name (optional)"
                />
              </div>
            </div>

            {/* Submit Button remains the same */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium text-lg shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent" />
                ) : (
                  <>
                    Book Appointment
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const style = `
@keyframes successAppear {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes successCheck {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.animate-success-appear {
  animation: successAppear 0.3s ease-out forwards;
}

.animate-success-check {
  animation: successCheck 0.5s ease-out forwards;
}
`;