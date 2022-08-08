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
const receiveConfirmSignupForm = document.querySelector(
  '.form--confirm-signup'
);
if (receiveConfirmSignupForm)
  receiveConfirmSignupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.btn--back-account').textContent =
      'Returning To Account ...';

    const windowUrl = window.location.pathname.split('/');
    const token = windowUrl[2];
    receiveConfirmSignup(token);

    document.querySelector('.btn--back-account').textContent = 'Continue';
  });

// Confirm Sign Up function
const receiveConfirmSignup = async (token) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/receiveConfirmSignup/${token}`,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Email Confirmation Successful!');
      window.setTimeout(() => {
        location.assign('/advanced-auth');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const alertMessage = document.querySelector('body').dataset.alert;
if (alert) showAlert('success', alertMessage, 20);
