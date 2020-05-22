import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import About from "./About/About";
import Works from "./Works/Works";
import Work from "./Work/Work";
import Contacts from "./Contacts/Contacts";
import CalendarPage from "./Calendar/CalendarPage";
import NotFound from "./NotFound/NotFound";

const App = () => {
  return (
    <Router>

      <Header/>

      <Switch>

        <Route exact path="/" component={Home}/>

        <Route path="/about" component={About}/>

        <Route exact path="/works" component={Works}/>

        <Route path="/works/:id" component={Work}/>

        <Route exact path="/contacts" component={Contacts}/>

        <Route path="/calendar" component={CalendarPage}/>

        <Route path="*" component={NotFound}/>

      </Switch>

      <Footer/>

    </Router>
  )
}

export default App;