// Fetch order info from Snipcart API
const fetchPaymentSession = async () => {
  const publicToken = new URLSearchParams(window.location.search).get('publicToken');
  try {
      const response = await axios.get(`https://payment.snipcart.com/api/public/custom-payment-gateway/payment-session?publicToken=${publicToken}`);
      window.paymentSession = response.data;
      window.currency = paymentSession.invoice.currency;
  } catch (error) {
      console.error("Error fetching payment session:", error);
  }
};

// Google Pay request data
const createGooglePayRequestData = () => ({
  environment: 'TEST',
  apiVersion: 2,
  apiVersionMinor: 0,
  merchantInfo: {
      merchantName: 'Example Merchant'
  },
  allowedPaymentMethods: [{
      type: 'CARD',
      parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"]
      },
      tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
              'gateway': 'example',
              'gatewayMerchantId': 'exampleGatewayMerchantId'
          }
      }
  }]
});

// Create payment details
const createPaymentDetails = () => ({
  total: {
      label: 'TOTAL',
      amount: {
          currency: window.currency,
          value: window.paymentSession.invoice.amount
      }
  },
  displayItems: window.paymentSession.invoice.items.map(i => ({
      label: i.type !== 'Discount' && i.type !== 'Tax' && i.type !== 'Shipping' ? `${i.name} x ${i.quantity}` : i.name,
      amount: {
          value: i.amount,
          currency: window.currency
      }
  }))
});

// Create the payment request
const createPaymentRequest = () => {
  window.paymentRequest = new PaymentRequest(
      [{ supportedMethods: 'https://google.com/pay', data: createGooglePayRequestData() }],
      createPaymentDetails(),
      { requestPayerEmail: true, requestPayerName: true }
  );
};

// Handle payment when clicking "Pay"
const onBuyClicked = async () => {
  try {
      const paymentRes = await window.paymentRequest.show();
      await handlePayment(paymentRes);
  } catch (e) {
      console.error("Payment failed:", e);
  }
};

// Confirm payment with the backend
const handlePayment = async (paymentRes) => {
  try {
      const res = await axios.post(`/api/confirm-payment?sessionId=${window.paymentSession.id}`, paymentRes);
      paymentRes.complete('success');
      window.location.href = res.data.returnUrl;
  } catch (e) {
      console.error("Error processing payment:", e);
  }
};

// Bind buy button to payment request
const bindBuyButton = () => {
  window.paymentRequest.canMakePayment()
      .then(result => {
          if (result) {
              document.getElementById('pay').addEventListener('click', onBuyClicked);
          }
      })
      .catch(err => console.error(err));
};

// Initialize checkout page
window.onload = async () => {
  await fetchPaymentSession();
  createPaymentRequest();
  bindBuyButton();
};
