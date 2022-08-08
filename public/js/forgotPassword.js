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

// Forgot Password trigger
const forgotPasswordForm = document.querySelector('.form--forgot-password');
if (forgotPasswordForm)
  forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.button--forgot-password').textContent =
      'Sending ...';

    const email = document.getElementById('email').value;
    await forgotPassword(email);

    document.querySelector('.button--forgot-password').textContent =
      'Send Email';
    document.getElementById('email').value = '';
  });

// Forgot Password Function
const forgotPassword = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
      data: {
        email,
      },
    });

    if (res.data.status === 'success') {
      showAlert(
        'success',
        'Password reset email sent! You may now close this page.'
      );
      window.setTimeout(1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
