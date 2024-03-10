import { isEscEvent } from './util.js';
import { validation, hashtagCommentIsFocused, clearTextInputs } from './validation.js';
import { formError, formSuccess } from './alert-messages.js';
import { sendData } from './api.js';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const body = document.querySelector('body');
const editingForm = document.querySelector('.img-upload__overlay');
const editingFormCloseElement = editingForm.querySelector('.img-upload__cancel');
const uploadButton = document.querySelector('#upload-file');
const editingImage = editingForm.querySelector('.img-upload__preview')
  .querySelector('img');

// Функции закрытия
const onFormClose = () => {
  body.classList.remove('modal-open');
  editingForm.classList.add('hidden');
  editingFormCloseElement.removeEventListener('click', onFormClose);
  document.removeEventListener('keydown', onEscKeydown);
  uploadButton.value = '';
  editingImage.style = '';
  clearTextInputs();
};

const onEscKeydown = (evt) => {
  if (isEscEvent(evt) && hashtagCommentIsFocused()) {
    evt.preventDefault();
    onFormClose();
  }
};

// Функция открытия
const openEditingForm = () => {
  uploadButton.addEventListener('change', () => {
    uploadUserFile();
    editingFormCloseElement.addEventListener ('click', onFormClose);
    document.addEventListener('keydown', onEscKeydown);
    scale();
    destroyExistingSlider();
    createSlider();
    getEffect();
    validation();
    body.classList.add('modal-open');
    editingForm.classList.remove('hidden');
    setUserFormSubmit(onFormClose);
  });
};

//Масштабирование
const scaleControl = document.querySelector('.img-upload__scale');
const scaleIn = scaleControl.querySelector('.scale__control--bigger');
const scaleOut = scaleControl.querySelector('.scale__control--smaller');
const scaleValue = scaleControl.querySelector('.scale__control--value');

const scale = () => {
  scaleValue.value = '100%';
  editingImage.style.transform = 'scale(1.00)';

  scaleIn.addEventListener('click', () => {
    switch(scaleValue.value) {
      case '25%':
        scaleValue.value = '50%';
        editingImage.style.transform = 'scale(0.50)';
        break;
      case '50%':
        scaleValue.value = '75%';
        editingImage.style.transform = 'scale(0.75)';
        break;
      case '75%':
        scaleValue.value = '100%';
        editingImage.style.transform = 'scale(1.00)';
        break;
    }
  });

  scaleOut.addEventListener('click', () => {
    switch(scaleValue.value) {
      case '100%':
        scaleValue.value = '75%';
        editingImage.style.transform = 'scale(0.75)';
        break;
      case '75%':
        scaleValue.value = '50%';
        editingImage.style.transform = 'scale(0.50)';
        break;
      case '50%':
        scaleValue.value = '25%';
        editingImage.style.transform = 'scale(0.25)';
        break;
    }
  });
};

//Слайдер
const slider = document.querySelector('.img-upload__effect-level');
const sliderLevel = slider.querySelector('.effect-level__value');
const sliderElement = slider.querySelector('.effect-level__slider');

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });
  sliderElement.classList.add('hidden');
};

const updateSlider = (startValue, step, filterName) => {
  editingImage.style.filter = '';

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: startValue,
    },
    start: startValue,
    step: step,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    sliderLevel.value = unencoded[handle];

    if (filterName === 'none') {
      sliderElement.classList.add('hidden');
      editingImage.style.filter = '';
    } else {
      sliderElement.classList.remove('hidden');
      if (filterName === 'invert') {
        editingImage.style.filter = filterName + '(' + sliderLevel.value + '%' + ')';
      } else if (filterName === 'blur') {
        editingImage.style.filter = filterName + '(' + sliderLevel.value + 'px' + ')';
      } else {
        editingImage.style.filter = filterName + '(' + sliderLevel.value;
      }
    }
  });
};

//Уничтожение слайдера
const destroyExistingSlider = () => {
  if(sliderElement && sliderElement.noUiSlider){
    sliderElement.noUiSlider.destroy();
  }
}

//Наложение эффектов
const effects = document.querySelectorAll('.effects__item');

const getEffect = () => {
  effects.forEach((effect) => {
    document.querySelector('#effect-none').checked = true;
    editingImage.className = 'effects__preview--none';

    effect.querySelector('.effects__radio').addEventListener('change', (evt) => {
      evt.preventDefault();
      editingImage.className = '';
      editingImage.classList.add('effects__preview--' + effect.querySelector('.effects__radio').value);
      switch(editingImage.className) {
        case 'effects__preview--none':
          updateSlider(3, 0.1, 'none');
          break;
        case 'effects__preview--chrome':
          updateSlider(1, 0.1, 'grayscale');
          break;
        case 'effects__preview--sepia':
          updateSlider(1, 0.1, 'sepia');
          break;
        case 'effects__preview--marvin':
          updateSlider(100, 1, 'invert');
          break;
        case 'effects__preview--phobos':
          updateSlider(3, 0.1, 'blur');
          break;
        case 'effects__preview--heat':
          updateSlider(3, 0.1, 'brightness');
          break;
      }
    });
  });
};

//Отправка формы
const formSubmit = document.querySelector('.img-upload__form');

const setUserFormSubmit = (onTrue) => {
  formSubmit.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        onTrue();
        formSuccess();
      },
      () => {
        onFormClose();
        formError();
      },
      new FormData(evt.target),
    )
  })
}

//Вставка пользовательского изображения
const uploadUserFile = () => {
  const file = uploadButton.files[0];
  const reader = new FileReader();
  const previews = document.querySelectorAll('.effects__preview');

  reader.addEventListener('load', () => {
    editingImage.src = reader.result;
    editingImage.width = 600;
    editingImage.height = 600;
    editingImage.style.objectFit = 'cover';
    previews.forEach((preview) => {
      preview.style.backgroundSize = 'cover';
      preview.style.backgroundImage = `url(${reader.result})`;
    })
  });

  reader.readAsDataURL(file);
};

export { openEditingForm };
