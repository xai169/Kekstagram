const STARTING_COMMENTS_NUMBER = 5;

const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const commentCount = document.querySelector('.comments-count--start');
const commentLoader = document.querySelector('.comments-loader');


//Отрисовка списка комментов
const createComment = (comment) => {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
};

const renderComments = (picture) => {
  const commentsListFragment = document.createDocumentFragment();
  picture.comments
    .forEach((comment) => {
      commentsListFragment.appendChild(createComment(comment));
    });

  commentsList.appendChild(commentsListFragment);
};

//Загрузка дополнительных 5 комментариев
const getComments = () => {
  const comments = Array.from(commentsList.querySelectorAll('.social__comment'));
  if (comments.length < STARTING_COMMENTS_NUMBER) {
    commentLoader.classList.add('hidden');
    commentCount.textContent = comments.length;
  } else {
    commentCount.textContent = STARTING_COMMENTS_NUMBER;
    comments
      .slice(STARTING_COMMENTS_NUMBER)
      .forEach((comment) => {
        comment.classList.add('hidden');
        commentLoader.classList.remove('hidden');
      })
  }

  let maxCommentsToShow = 10;

  commentLoader.addEventListener('click', () => {
    commentLoader.classList.remove('hidden');
    if (maxCommentsToShow < comments.length) {
      comments
        .slice(maxCommentsToShow - 5, maxCommentsToShow)
        .forEach((comment) => {
          comment.classList.remove('hidden');
        });
      commentCount.textContent = maxCommentsToShow;
    } else {
      comments
        .slice(maxCommentsToShow - 5, maxCommentsToShow)
        .forEach((comment) => {
          comment.classList.remove('hidden');
        });
      commentCount.textContent = comments.length;
      commentLoader.classList.add('hidden');
    }
    maxCommentsToShow += 5;
  });
};

export { renderComments, getComments }
