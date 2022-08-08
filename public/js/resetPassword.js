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

// Reset Password trigger
const passwordResetForm = document.querySelector('.form-reset-user-password');
if (passwordResetForm)
  passwordResetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-reset-password').textContent =
      'Resetting ...';

    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await resetPassword({ password, passwordConfirm });

    document.querySelector('.btn--save-reset-password').textContent =
      'Reset Password';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

// Reset Password Function
const resetPassword = async (data) => {
  try {
    const windowUrl = window.location.pathname.split('/');
    const token = windowUrl[2];
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/resetPassword/${token}`,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Password updated successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
