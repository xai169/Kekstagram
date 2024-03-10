const getData = (onSuccess, onFail) => {
  fetch('https://23.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(onFail());
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail()
    });
}

//Otpravka
const sendData = (onSuccess, onFail, body) => {
  fetch(
    ' https://23.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {sendData, getData}
