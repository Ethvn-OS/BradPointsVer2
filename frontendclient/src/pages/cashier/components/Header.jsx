import { useState, useEffect } from 'react';

function Header() {
    const [currentDateTime, setCurrentDateTime] = useState('');

    const handleExit = () => {

      try {
        window.close();
        window.open('', '_self')?.close();
        setTimeout(() => {
          window.location.replace('about:blank');
        }, 200);
      } catch (e) {
        window.location.replace('about:blank');
      }
    };

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentDateTime(new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }));
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <div className="relative z-20 bg-bp-red text-white px-6 py-3 flex justify-between items-center">
        <span className="text-sm">{currentDateTime}</span>
        <div className="flex items-center gap-2">
          <button onClick={handleExit} title="Exit" className="hover:bg-bp-red p-1 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
  
  export default Header;