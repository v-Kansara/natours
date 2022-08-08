/* eslint-disable */

// Alerts
const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

// Type is either 'success' or 'error'
const showAlert = (type, msg, time = 7) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, time * 1000);
};

// Confirm Sign Up trigger
const confirmSignupForm = document.querySelector('.form--confirm-email');
if (confirmSignupForm)
  confirmSignupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.btn--confirm-email').textContent = 'Sending ...';

    const email = document.getElementById('confirm-email').value;
    confirmSignup(email);

    document.querySelector('.btn--confirm-email').textContent =
      'Send Confirmation Email';
  });

// Confirm Sign Up function
const confirmSignup = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/users/confirmSignup`,
      data: {
        email,
      },
    });

    if (res.data.status === 'success') {
      showAlert(
        'success',
        'Sign Up confirmation email sent! Please check your email.'
      );
      window.setTimeout(() => {
        location.assign('/me');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
