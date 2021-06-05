(() => {
  const toggleButton = document.querySelector("#toggle");
  const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

  const THEMES = {
    DARK: "dark",
    LIGHT: "light",
  };

  const THEME_CLASSES = {
    DARK_CLASS: "dark-mode",
    LIGHT_CLASS: "light-mode",
  };

  const { DARK, LIGHT } = THEMES;
  const { DARK_CLASS, LIGHT_CLASS } = THEME_CLASSES;

  const handleThemeInit = () => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === DARK) {
      document.body.classList.toggle(DARK_CLASS);
      toggleButton.checked = true;
    } else {
      document.body.classList.toggle(LIGHT_CLASS);
      toggleButton.checked = false;
    }
  };

  const handleThemeSwitch = () => {
    toggleButton.addEventListener("click", () => {
      let currentTheme;
      if (prefersDarkTheme.matches) {
        document.body.classList.toggle(LIGHT_CLASS);
        currentTheme = document.body.classList.contains(DARK_CLASS)
          ? DARK
          : LIGHT;
      } else {
        document.body.classList.toggle(DARK_CLASS);
        currentTheme = document.body.classList.contains(DARK_CLASS)
          ? DARK
          : LIGHT;
      }
      localStorage.setItem("theme", currentTheme);
    });
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const prefersDarkTheme = e.matches ? true : false;
      prefersDarkTheme
        ? (toggleButton.checked = true)
        : (toggleButton.checked = false);
      prefersDarkTheme
        ? localStorage.setItem("theme", DARK)
        : localStorage.setItem("theme", LIGHT);
      document.body.className = "";
    });

  handleThemeInit();
  handleThemeSwitch();
})();
