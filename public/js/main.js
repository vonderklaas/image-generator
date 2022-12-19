const form = document.querySelector('#image-form');
const inputPrompt = document.querySelector('#prompt');
const selectSize = document.querySelector('#size');
const spinner = document.querySelector('#spinner');
const message = document.querySelector('#msg');
const imageElement = document.querySelector('#image');

const onSubmit = (e) => {
  e.preventDefault();

  // Clear previously generated content
  message.textContent = '';
  imageElement.src = '';

  const prompt = inputPrompt.value;
  const size = selectSize.value;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  // Making a request with entered data
  generateImageRequest(prompt, size);
};

const showSpinner = () => {
  spinner.classList.add('show');
};

const removeSpinner = () => {
  spinner.classList.remove('show');
};

const generateImageRequest = async (prompt, size) => {
  try {
    showSpinner();
    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('That image could not be generated');
    }

    const generatedImage = await response.json();
    const imageUrl = generatedImage.data;
    imageElement.src = imageUrl;
    removeSpinner();
  } catch (error) {
    message.textContent = error;
  }
};

form.addEventListener('submit', onSubmit);
