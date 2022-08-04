/* eslint-disable */
// Alerts
const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

// Type is either 'success' or 'error'
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

const stripe = Stripe(
  'pk_test_51GuOxbBQlQlKXql651C3zQMXbSsWD1YDFtB09t2gmj6bK5dv0D7vcelDCS14R5ovC4eGvTS0XBIj9llWZUxalVeQ009VOuuaQc'
);

const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

// Checkout session trigger
const bookBtn = document.getElementById('book-tour');

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing ...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
