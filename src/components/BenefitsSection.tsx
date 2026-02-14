import { motion } from "framer-motion";
import { Plane, Wallet, MapPin, Zap } from "lucide-react";

const benefits = [
  {
    icon: Plane,
    title: "Smart Trip Planning",
    description: "Get personalized travel itineraries instantly",
  },
  {
    icon: Wallet,
    title: "Budget Friendly",
    description: "Plan trips within your budget",
  },
  {
    icon: MapPin,
    title: "Discover Hidden Gems",
    description: "Find unique places and experiences",
  },
  {
    icon: Zap,
    title: "Instant AI Suggestions",
    description: "Get travel advice in seconds",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BenefitsSection = () => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
            Why TravelMate AI?
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need for the perfect trip.
          </p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((b) => (
            <motion.div
              key={b.title}
              variants={item}
              className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl gradient-primary flex items-center justify-center group-hover:glow-effect transition-shadow duration-300">
                <b.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
              <p className="text-muted-foreground text-sm">{b.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
