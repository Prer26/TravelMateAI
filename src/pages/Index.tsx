import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatingShapes from "@/components/FloatingShapes";
import BenefitsSection from "@/components/BenefitsSection";
import ExamplePrompts from "@/components/ExamplePrompts";
import { Button } from "@/components/ui/button";
import robot from "@/assets/robot.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
        <FloatingShapes />

        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto px-6">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Your AI Travel Companion
            </p>

            <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 leading-tight">
              <span className="gradient-text">TravelMate</span>{" "}
              <span>AI</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Plan your perfect trip in seconds with AI. Smart itineraries,
              budget-friendly tips, and hidden gems — all in one place.
            </p>

            <Button
              size="lg"
              onClick={() => navigate("/chat")}
              className="gradient-primary px-10 py-6 text-lg rounded-full glow-effect hover:scale-105 transition duration-300 border-0"
            >
              Start Planning ✈️
            </Button>
          </motion.div>

          {/* 🤖 RIGHT ROBOT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center items-center"
          >

            {/* Glow behind robot */}
            <div className="absolute w-72 h-72 bg-pink-300 opacity-30 blur-3xl rounded-full"></div>
            <div className="absolute w-72 h-72 bg-orange-300 opacity-30 blur-3xl rounded-full"></div>

            {/* Robot */}
            <img
              src={robot}
              alt="robot"
              className="w-64 md:w-72 robot-float relative z-10"
            />

            {/* Chat bubble */}
            <div className="absolute top-10 right-0 glass-card px-4 py-2 text-sm rounded-xl shadow-lg animate-bounce">
              Hi! I’m your travel buddy 🤖
            </div>
          </motion.div>

        </div>
      </section>

      {/* BENEFITS */}
      <BenefitsSection />

      {/* PROMPTS */}
      <ExamplePrompts />

      {/* CTA */}
      <section className="relative py-24 gradient-hero overflow-hidden">
        <FloatingShapes />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Ready to explore?
          </h2>

          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Let AI plan your next unforgettable adventure.
          </p>

          <Button
            size="lg"
            onClick={() => navigate("/chat")}
            className="gradient-primary px-10 py-6 text-lg rounded-full glow-effect hover:scale-105 transition duration-300 border-0"
          >
            Start Chatting 💬
          </Button>
        </motion.div>
      </section>

    </div>
  );
};

export default Index;