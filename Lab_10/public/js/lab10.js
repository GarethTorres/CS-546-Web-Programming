// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
}

// Validate password format
function isValidPassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  return passwordRegex.test(password);
}

// Validate registration form
function validateRegistrationForm() {
  const form = document.getElementById('registration-form');
  const emailInput = form.emailAddress;
  const passwordInput = form.password;
  const confirmPasswordInput = form.confirmPassword;
  const roleDropdown = form.role;

  // Check for empty fields
  if (!emailInput.value || !passwordInput.value || !confirmPasswordInput.value || !roleDropdown.value) {
    alert('All fields are required.');
    return false;
  }

  // Validate email format
  if (!isValidEmail(emailInput.value)) {
    alert('Invalid email format.');
    return false;
  }

  // Validate password format
  if (!isValidPassword(passwordInput.value)) {
    alert('Invalid password format. Must have at least 8 characters, one uppercase, one number, and one special character.');
    return false;
  }

  // Check if passwords match
  if (passwordInput.value !== confirmPasswordInput.value) {
    alert('Passwords do not match.');
    return false;
  }

  return true;
}

// Validate login form
function validateLoginForm() {
  const form = document.getElementById('login-form');
  const emailInput = form.emailAddress;
  const passwordInput = form.password;

  // Check for empty fields
  if (!emailInput.value || !passwordInput.value) {
    alert('All fields are required.');
    return false;
  }

  // Validate email format
  if (!isValidEmail(emailInput.value)) {
    alert('Invalid email format.');
    return false;
  }

  return true;
}

// Add event listeners to forms
document.getElementById('registration-form').addEventListener('submit', (e) => {
  if (!validateRegistrationForm()) {
    e.preventDefault();
  }
});

document.getElementById('login-form').addEventListener('submit', (e) => {
  if (!validateLoginForm()) {
    e.preventDefault();
  }
});
