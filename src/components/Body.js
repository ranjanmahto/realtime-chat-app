


import "../App.css"
import ChatPage from './ChatPage';

import LoginPage from './LoginPage';



import {  RouterProvider, createBrowserRouter } from 'react-router-dom';


function Body() {


  

  const Router= createBrowserRouter([
    {
      path:"/",
      element: <LoginPage/>
    },
    {
      path: "/chat",
      element: <ChatPage/>
    },
    
    
  ]);

  
 

  

  return (
    <div className="w-[100%] h-[100%]">

          <RouterProvider router={Router} >

          </RouterProvider>
            
    </div>
  );
}

export default Body;
