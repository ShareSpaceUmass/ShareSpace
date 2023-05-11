
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