document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  var output = document.getElementById("hero-terminal-output");
  if (!output) return;

  var lines = JSON.parse(output.getAttribute("data-lines"));
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    output.textContent = lines.join("\n");
    return;
  }

  var lineIndex = 0;
  var charIndex = 0;

  function typeStep() {
    if (lineIndex >= lines.length) return;
    var line = lines[lineIndex];
    var done = lines.slice(0, lineIndex).join("\n");
    output.textContent = (done ? done + "\n" : "") + line.slice(0, charIndex);

    if (charIndex <= line.length) {
      charIndex++;
      setTimeout(typeStep, 22);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeStep, 300);
    }
  }

  typeStep();
});
