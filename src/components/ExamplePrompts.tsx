import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const prompts = [
  "Plan 3 day trip to Goa under 10k",
  "Best places to visit in Kerala",
  "Budget trip to Manali",
];

const ExamplePrompts = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
            Try asking...
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Click a prompt to start chatting instantly.
          </p>
        </motion.div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {prompts.map((p, i) => (
            <motion.button
              key={p}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              onClick={() => navigate(`/chat?prompt=${encodeURIComponent(p)}`)}
              className="glass-card rounded-2xl px-6 py-4 text-sm font-medium text-foreground hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              "{p}"
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExamplePrompts;
