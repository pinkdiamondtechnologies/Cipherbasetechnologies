document.addEventListener("DOMContentLoaded", function () {
  // Phone tracking form
  document.getElementById("tracking-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const phoneNumber = document.getElementById("phone-number").value;
      document.getElementById("result").innerText = "Tracking: " + phoneNumber + "... (Feature under development)";
  });

  // IP lookup form
  document.getElementById("ip-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const ipAddress = document.getElementById("ip-address").value;
      document.getElementById("ip-result").innerText = "Looking up IP: " + ipAddress + "... (Feature under development)";
  });

  // Support ticket form
  document.getElementById("support-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const issue = document.getElementById("issue").value;
      document.getElementById("support-result").innerText = "Support ticket submitted! We will get back to you soon.";
      console.log("Support Ticket:", { name, email, issue });
  });

  // Q&A form
  document.getElementById("qa-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const question = document.getElementById("question").value;
      document.getElementById("qa-result").innerText = "Your question has been submitted! Our team will respond shortly.";
      console.log("Q&A Submission:", { username, question });
  });
});
