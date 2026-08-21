(function () {
  var cards = [];
  var currentIndex = -1;

  function cleanVideoId(raw) {
    if (!raw) return "";
    // If someone accidentally stored a full URL, try to extract v=
    try {
      if (raw.includes("youtube.com") || raw.includes("youtu.be")) {
        var u = new URL(raw);
        if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
        return u.searchParams.get("v") || "";
      }
    } catch (e) {}
    // Strip common junk like &t=, ?t=, etc.
    return String(raw).split("&")[0].split("?")[0].trim();
  }

  function setPlayerByIndex(idx) {
    if (idx < 0 || idx >= cards.length) return;
    currentIndex = idx;

    var card = cards[currentIndex];
    var rawId = card.getAttribute("data-youtube-id");
    var videoId = cleanVideoId(rawId);

    var title = card.getAttribute("data-title") || "Lecture";
    var speaker = card.getAttribute("data-speaker") || "";
    var date = card.getAttribute("data-date") || "";

    document.getElementById("lectureModalTitle").textContent = title;
    document.getElementById("lectureModalMeta").textContent =
      [speaker ? ("Speaker: " + speaker) : "", date ? ("Date: " + date) : ""].filter(Boolean).join(" • ");

    var iframe = document.getElementById("lecturePlayer");
    var ytLink = document.getElementById("lectureOpenYoutube");

    // Always set the YouTube link (works even if embedding is blocked)
    ytLink.href = videoId ? ("https://www.youtube.com/watch?v=" + videoId) : "#";

    // Embed with controls + fullscreen
    iframe.src = videoId
      ? ("https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0&modestbranding=1&controls=1&fs=1")
      : "";
  }

  function clearPlayer() {
    var iframe = document.getElementById("lecturePlayer");
    if (iframe) iframe.src = "";
  }

  function openModal() {
    if (window.$ && $("#lectureModal").length) $("#lectureModal").modal("show");
  }

  // Click a card => build list of cards in the current expanded accordion section
  document.addEventListener("click", function (e) {
    var card = e.target.closest(".lecture-card");
    if (!card) return;

    // Scope: use cards inside the currently open accordion collapse (best UX)
    var collapse = card.closest(".collapse.show") || document;
    cards = Array.prototype.slice.call(collapse.querySelectorAll(".lecture-card"));

    var idx = cards.indexOf(card);
    setPlayerByIndex(idx >= 0 ? idx : 0);
    openModal();
  });

  // Prev / Next
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "lecturePrev") {
      if (!cards.length) return;
      setPlayerByIndex((currentIndex - 1 + cards.length) % cards.length);
    }
    if (e.target && e.target.id === "lectureNext") {
      if (!cards.length) return;
      setPlayerByIndex((currentIndex + 1) % cards.length);
    }
  });

  // Stop video on close (Bootstrap 4)
  if (window.$) {
    $(function () {
      $("#lectureModal").on("hidden.bs.modal", function () {
        clearPlayer();
      });
    });
  }
})();
