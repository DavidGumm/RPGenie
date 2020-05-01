const Ajax = function (type, uri, success, params) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      success(this.responseText, this);
    }
  };
  xhttp.open(type, uri, true);
  xhttp.send(params);
};
