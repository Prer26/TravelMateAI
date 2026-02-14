import { motion } from "framer-motion";

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="floating-shape animate-float-slow"
        style={{
          width: 300,
          height: 300,
          top: "10%",
          left: "5%",
          background: "hsl(350, 100%, 88%)",
        }}
      />
      <div
        className="floating-shape animate-float"
        style={{
          width: 200,
          height: 200,
          top: "60%",
          right: "10%",
          background: "hsl(10, 100%, 77%)",
        }}
      />
      <div
        className="floating-shape animate-pulse-soft"
        style={{
          width: 250,
          height: 250,
          bottom: "10%",
          left: "30%",
          background: "hsl(30, 100%, 89%)",
        }}
      />
      <div
        className="floating-shape animate-float"
        style={{
          width: 150,
          height: 150,
          top: "20%",
          right: "30%",
          background: "hsl(350, 100%, 92%)",
        }}
      />
      {/* Heart shapes using SVG */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[15%] opacity-10"
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="hsl(350, 100%, 80%)">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </motion.div>
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[25%] left-[10%] opacity-10"
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="hsl(10, 100%, 77%)">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </motion.div>
    </div>
  );
};

export default FloatingShapes;
