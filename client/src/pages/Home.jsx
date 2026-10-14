import Banner from "../components/home/Banner";
import CalltoAction from "../components/home/CalltoAction";
import Features from "../components/home/Features";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <HowItWorks />
      <CalltoAction />
      <Footer />
    </div>
  );
};

export default Home;
