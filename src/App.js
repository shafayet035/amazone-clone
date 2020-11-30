import './App.css';
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import Checkout from './Components/Checkout/Checkout'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Auth from './Components/Auth/Auth';
import { useEffect } from 'react';
import { auth } from './firebase'
import { useStateValue } from './Store/StateProvide';
import Payment from './Components/Payment/Payment';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './Components/Orders/Orders';


const promise = loadStripe     ("pk_test_51HiitTBGurzF7kkBFD48DrD68995qN7OnMv1vGVPmOjHo8CZuM025OoOoLcvMLpLHDGzwLdcrYvoUFyn4XDAXvid00vPOK2Xnk")

function App() {
  const [state, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/orders" exact>
            <Orders />
          </Route>
          <Route path="/payment" exact>
            <Elements stripe={promise}>
             <Payment />  
            </Elements>   
          </Route>
          <Route path="/authentication" exact component={Auth}/>
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
