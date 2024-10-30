import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './Routes/Routes';

createRoot(document.getElementById('root')).render(
 <div className=''>
   <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
 </div>
)

{/*className='max-w-7xl mx-auto'
  cd ../../web/thesis-project portal client
    cd ../../web/thesis-project-portal-server
  */}