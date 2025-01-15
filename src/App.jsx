import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import {
  LayoutDashboard,
  Gauge,
  ClipboardCheck,
  NotebookPen,
  Sun,
  Moon,
} from "lucide-react";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import Todo from "./pages/Todo";
import Important from "./pages/Important";
import Completed from "./pages/Completed";
import MobileHeader from "./components/MobileHeader";

const App = () => {
  const mobileMenuRef = useRef();
  const [showMobileMainDropdown, setShowMobileMainDropdown] = useState(false);
  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem("theme") === "dark" || false
  );

  // Handle theme toggle
  useEffect(() => {
    const root = document.documentElement;
    if (darkTheme) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkTheme]);

  useEffect(() => {
    const handler = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setShowMobileMainDropdown(false);
      }
    };

    if (showMobileMainDropdown) {
      document.addEventListener("mousedown", handler);
    } else {
      document.removeEventListener("mousedown", handler);
    }
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [showMobileMainDropdown]);

  return (
    <div className={`flex h-screen ${darkTheme ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Sidebar */}
      <div className={`hidden sm:block sticky top-0 h-screen w-64 shadow-lg ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
        <Sidebar>
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text={"Tasks"}
            path={"/"}
          />
          <SidebarItem
            icon={<Gauge size={20} />}
            text={"Important"}
            path={"/important"}
          />
          <SidebarItem
            icon={<ClipboardCheck size={20} />}
            text={"Completed"}
            path={"/completed"}
          />
          <SidebarItem
            icon={<NotebookPen size={20} />}
            text={"ToDo"}
            path={"/todo"}
          />
        </Sidebar>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className={`p-4 flex items-center justify-between ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-800"} shadow`}>
          <MobileHeader />
          <button
            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() => setDarkTheme(!darkTheme)}
          >
            {darkTheme ? (
              <Sun size={24} className="text-yellow-400" />
            ) : (
              <Moon size={24} className="text-gray-500" />
            )}
          </button>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/important" element={<Important />} />
            <Route path="/completed" element={<Completed />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
