const Ajax = function (type, uri, params, success, failure) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      success(this.responseText, this);
    }
    else if (this.readyState == 4 && this.status != 200) {
      failure(this);
    }
  };
  xhttp.open(type, uri, true);
  xhttp.send(params);
};
