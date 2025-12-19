import React, { useState } from 'react';
// import axios from 'axios'; // Uncomment when ready for backend integration

const ClientFeedbackForm = ({ onGoBack, onFormSubmitSuccess }) => {
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'success', 'error', 'submitting'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    // Simulate API call
    try {
      // const response = await axios.post('http://localhost:8080/client/feedback', {
      //   date,
      //   message,
      //   userId: 'some_client_user_id', // Replace with actual user ID
      // });

      // For now, simulate success after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmissionStatus('success');
      // Clear form after successful submission
      setFeedbackType('suggestion');
      setSubject('');
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

        <div>
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

