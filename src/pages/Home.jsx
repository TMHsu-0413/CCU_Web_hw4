import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";

const Home = () => {
  return (
    <div className="h-screen w-screen" id="Home">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default Home;
