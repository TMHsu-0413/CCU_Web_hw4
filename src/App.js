import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './route/router';

function App() {
  useEffect(() => {
    document.title = "Whether page";
  }, [])

  return (

    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
