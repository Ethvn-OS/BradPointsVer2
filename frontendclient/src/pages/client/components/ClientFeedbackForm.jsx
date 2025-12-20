import React, { useState } from 'react';
import axios from 'axios'; // Uncomment when ready for backend integration

const ClientFeedbackForm = ({ onGoBack, onFormSubmitSuccess }) => {
  const [date, setDate] = useState('');
  const [rating, setRating] = useState(0); // 0 to 5 for star rating
  const [message, setMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'success', 'error', 'submitting'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    // Simulate API call
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/customer/savefeedback', {
        rating: rating,
        feedback: message
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // const response = await axios.post('http://localhost:8080/client/feedback', {
      //   date,
      //   rating,
      //   message,
      //   userId: 'some_client_user_id', // Replace with actual user ID
      // });

      // For now, simulate success after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmissionStatus('success');
      // Clear form after successful submission
      // setFeedbackType('suggestion');
      // setSubject('');
      setMessage('');
      if (onFormSubmitSuccess) {
        onFormSubmitSuccess();
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="mt-8 p-6 bg-white border-2 border-br-red rounded-2xl shadow-lg pl-8 pr-8 py-8">
      <h3 className="text-2xl font-bold text-br-red mb-6 text-center">Submit Your Feedback</h3>

      {submissionStatus === 'submitting' && (
        <div className="mb-4 p-3 rounded-md text-center bg-blue-100 text-blue-700">
          Submitting feedback...
        </div>
      )}
      {submissionStatus === 'success' && (
        <div className="mb-4 p-3 rounded-md text-center bg-green-100 text-green-700">
          Thank you! Your feedback has been submitted successfully.
        </div>
      )}
      {submissionStatus === 'error' && (
        <div className="mb-4 p-3 rounded-md text-center bg-red-100 text-red-700">
          Failed to submit feedback. Please try again later.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/*<div>
          <label htmlFor="date" className="block text-gray-700 text-sm font-semibold mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-br-red focus:border-transparent font-inter text-sm"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          </div>*/}

        <div>
          <label htmlFor="rating" className="block text-gray-700 text-sm font-semibold mb-2">
            Rate your Braddex experience today!
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <React.Fragment key={starValue}>
                <svg
                  className={`w-6 h-6 cursor-pointer ${rating >= starValue ? 'text-br-red' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  onClick={() => setRating(starValue)}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    if (x < rect.width / 2) {
                      setRating(starValue - 0.5);
                    } else {
                      setRating(starValue);
                    }
                  }}
                  onMouseLeave={() => setRating(Math.round(rating))}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.565-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                </svg>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">
            Your Feedback
          </label>
          <textarea
            id="message"
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-br-red focus:border-transparent font-inter text-sm"
            placeholder="Describe your feedback or suggestion..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onGoBack}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-br-red text-white rounded-lg font-semibold hover:bg-red-900 transition-colors"
            disabled={submissionStatus === 'submitting'}
          >
            {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientFeedbackForm;

