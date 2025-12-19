import React, { useState } from 'react';
import feedbackPhoto from '../../../assets/images/feedbackPhoto.png';
import ClientFeedbackForm from './ClientFeedbackForm';
import Header from './header';

const FeedbackSection = ({ user }) => {
  const [showForm, setShowForm] = useState(false);
  
  return (
    <div className="w-full">
      <Header user={user} />
            
      <div className="bg-white border-2 border-br-red rounded-2xl shadow-lg pl-8 pr-8 py-8 mt-6">
        <div className="flex flex-col md:flex-row items-center gap-8 h-[240px]">
          {/* Text Section */}
          <div className="flex-1 flex flex-col justify-center md:text-left text-center">
            <h3 className="text-2xl font-bold text-br-red mb-4 leading-tight">
              Share Your Experience
            </h3>
            <p className="text-md text-gray-700 leading-relaxed mb-6">
              We value your feedback! Tell us about your Braddex experience and help us improve our services. Your input helps us create better experiences for everyone.
            </p>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-br-red text-white rounded-lg px-6 py-3 text-base font-semibold hover:bg-red-900 transition-colors self-start md:self-start self-center"
            >
              Access the Feedback Form Here
            </button>
          </div>
          
          {/* Image Section */}
          <div className="flex-1 flex justify-center items-center">
            <img 
            src={feedbackPhoto} 
              alt="Feedback illustration" 
              className="w-[550px] h-[300px] md:w-[550px] md:h-[300px] w-[150px] h-[120px] object-cover"
            />
          </div>
        </div>
      </div>
      {showForm && (
        <ClientFeedbackForm
          onGoBack={() => setShowForm(false)}
          onFormSubmitSuccess={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default FeedbackSection;