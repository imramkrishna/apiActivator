import express from 'express';

const app = express();
const port = 3000;

const APIS=['https://hexadev.onrender.com'];

const apiCaller = async (apiUrl: string) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    return;
  } catch (error) {
    console.log(`Error calling ${apiUrl}:`, error);
    return;
  }
}

// Start the interval immediately when server starts
const startKeepAlive = () => {
  setInterval(() => {
    APIS.forEach(apiUrl => {
      console.log("API invoked: ", apiUrl);
      apiCaller(apiUrl);
    });
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