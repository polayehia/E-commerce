import React, { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <button
        className="text-green-700"
        onClick={toggleDarkMode}
        style={{
          // fontSize: "28px",
          fontSize: "20px",
          width:'fit'
        }}
      >
        {/* {darkMode ? "🌚" : "🌞"} */}
        {darkMode ? "MoonLight 🌚" : "SunRise 🌞"}
      </button>
    </div>
  );
}
