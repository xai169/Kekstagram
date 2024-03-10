import { openEditingForm } from './editing-from.js';
import { getData } from './api.js';
import { renderError } from './alert-messages.js';
import { setFilters } from './filter.js';

getData(
  (photos) => setFilters(photos),
  () => renderError(),
);

openEditingForm();
