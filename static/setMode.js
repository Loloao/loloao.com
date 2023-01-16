const modeValue = window.localStorage.getItem("mode");

if (modeValue === "dark") document.documentElement.classList.add("dark");
