(function () {
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(hover: none)").matches
  ) {
    return;
  }

  var root = document.documentElement;
  var rafId = 0;
  var x = -999;
  var y = -999;

  function apply() {
    rafId = 0;
    root.style.setProperty("--mx", x + "px");
    root.style.setProperty("--my", y + "px");
  }

  document.addEventListener(
    "pointermove",
    function (e) {
      x = e.clientX;
      y = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(apply);
    },
    { passive: true }
  );

  document.addEventListener("pointerleave", function () {
    x = -999;
    y = -999;
    if (!rafId) rafId = requestAnimationFrame(apply);
  });
})();
