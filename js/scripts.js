// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Highlight the current page in the navigation menu
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav ul li a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
  }
});

// Redirect to payment page
function redirectToPayment() {
  window.location.href = "payment.html";
}

// Stripe Payment Integration
document.addEventListener('DOMContentLoaded', function () {
  const stripe = Stripe('your-publishable-key-here'); // Replace with your Stripe publishable key
  const elements = stripe.elements();
  const cardElement = elements.create('card');
  cardElement.mount('#card-element');

  const form = document.getElementById('payment-form');
  form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
      });

      if (error) {
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = error.message;
      } else {
          // Redirect to success page after successful payment
          window.location.href = "success.html";
      }
  });
});