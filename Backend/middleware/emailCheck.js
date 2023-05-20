  /*
  Check if an email address is valid for umass.edu domain.

  Args:
      email (str): The email address to be checked.

  Returns:
      bool: True if the email address is valid for umass.edu domain, False otherwise.
  */
function emailCheck(email) {
    var regExp = new RegExp("[a-z0-9\.-_]*@umass\.edu$", "i");
    match = email.match(regExp);
    if(match)
      match = true;
    else
      match = false
    return match;
}

module.exports = {
    emailCheck
}