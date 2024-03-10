const MAX_HASHTAGS = 5;

const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const validation = () => {
  hashtagInput.addEventListener('input', () => {
    let textInput = hashtagInput.value.toLowerCase().trim();
    let hashtags = textInput.split(' ');

    hashtagInput.setCustomValidity('');

    if (hashtags.length > MAX_HASHTAGS) {
      hashtagInput.setCustomValidity('Максимальное количество #хэштэгов - 5')
    }

    const hashNotFirstSymbol = hashtags.some((item)  => {
      return item[0] !== '#';
    });
    if (hashNotFirstSymbol) {
      hashtagInput.setCustomValidity('Хэштэг должен начинаться с символа #')
    }

    const noOtherSymbols = hashtags.every((item)  => {
      return /^[a-zа-я0-9#]+$/.test(item);
    });
    if (!noOtherSymbols) {
      hashtagInput.setCustomValidity('Хэштэг содежит запрещенные символы')
    }

    const notOnlyHash = hashtags.some((item)  => {
      return item.length < 2;
    });
    if (notOnlyHash) {
      hashtagInput.setCustomValidity('Хэштэг не может состоять только из символа #')
    }

    const hashtagDivision = hashtags.some((item)  => {
      const hashCount = [];

      for (let i = 0; i < item.length; i++) {
        if (item[i] === '#') {
          hashCount.push('#');
        }
      }
      return hashCount.length > 1;
    });
    if (hashtagDivision) {
      hashtagInput.setCustomValidity('Хэштэги должны разделяться пробелом')
    }

    const hashtagNotRepeat = hashtags.some((item, i)  => {
      return i > hashtags.indexOf(item);
    });
    if (hashtagNotRepeat) {
      hashtagInput.setCustomValidity('Хэштэг не должен повторяться')
    }

    if (!hashtagInput.checkValidity()) {
      hashtagInput.style.border = '2px solid red';
    } else {
      hashtagInput.style.border = 'none';
    }


    hashtagInput.reportValidity();
  });
};

const hashtagCommentIsFocused = () => {
  if (hashtagInput === document.activeElement || commentInput === document.activeElement) {
    return false
  }
  return true
}

const clearTextInputs = () => {
  hashtagInput.value = '';
  commentInput.value = '';
}

export { validation, hashtagCommentIsFocused, clearTextInputs };
