import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

const APIS=[
  'https://hexadev.onrender.com',
  'https://chessonline-4u17.onrender.com',
  'https://chat-connect-gasb.onrender.com',
  'https://warehousemanagementsystem-66wf.onrender.com',
  'https://portfoliobackend-ukd5.onrender.com'
];

// Add your own Render URL here
const SELF_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;

const apiCaller = async (apiUrl: string) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.log(`API ${apiUrl} returned status: ${response.status}`);
      return;
    }
    // Don't try to parse JSON for self-ping (returns HTML)
    if (!apiUrl.includes(SELF_URL)) {
      const data = await response.json();
    }
    return;
  } catch (error) {
    console.log(`Error calling ${apiUrl}:`, error);
    return;
  }
}

// Start the interval immediately when server starts
const startKeepAlive = () => {
  setInterval(() => {
    // Call external APIs
    APIS.forEach(apiUrl => {
      console.log("API invoked: ", apiUrl);
      apiCaller(apiUrl);
    });
    
    // Call yourself to prevent sleep
    console.log("Self-ping: ", SELF_URL);
    apiCaller(SELF_URL);
  }, 14 * 60 * 1000); // 14 minutes
  
  // Call once immediately
  APIS.forEach(apiUrl => {
    console.log("Initial API call: ", apiUrl);
    apiCaller(apiUrl);
  });
};

app.get('/', (req, res) => {
  res.send('API Activator is running. Check console for logs.');
});

app.listen(port, () => {
  console.log(`API Activator listening at http://localhost:${port}`);
  startKeepAlive(); // Start keep-alive when server starts
});