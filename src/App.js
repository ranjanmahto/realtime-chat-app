

import { Provider } from 'react-redux';

import store from './utils/store';

import Body from './components/Body';

function App() {


  
  
  


  return (
    <div className="w-[100vw] h-[100vh]">

      

        
        <Provider store={store}>

            <Body/>

              
               
        </Provider>

           
    </div>
  );
}

export default App;
