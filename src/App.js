import React, { useState, useEffect } from 'react';

const App = () => {
  const [joke, setJoke] = useState("Loading a joke...");
  const [lastFetchTime, setLastFetchTime] = useState(Date.now());

  const fetchJoke = async () => {
    try {
      const response = await fetch('http://localhost:3001/joke');
      const data = await response.json();
      setJoke(data.joke);
      setLastFetchTime(Date.now());
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

  const handleChangeJoke = () => {
    fetchJoke();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastFetchTime > 10 * 1000) {
        fetchJoke();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastFetchTime]);

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Random Joke App</h1>
      <p>{joke}</p>
      <button onClick={handleChangeJoke} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Change Joke
      </button>
    </div>
  );
};

export default App;
