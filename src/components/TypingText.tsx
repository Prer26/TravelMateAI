import { useEffect, useState } from "react";

interface Props {
  text: string;
  onDone?: () => void;
}

const TypingText = ({ text, onDone }: Props) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");

    const speed = text.length > 300 ? 5 : 15; // 🔥 dynamic speed

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;

      if (i >= text.length) {
        clearInterval(interval);
        onDone?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypingText;