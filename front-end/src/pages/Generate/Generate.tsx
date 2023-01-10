import { FormEvent, useState } from 'react';

import './Generate.css';

export const Generate = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<any>('');
  const [promptValue, setPromptValue] = useState<string>('');
  const [imageSize, setImageSize] = useState<string>('small');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generatedImage(promptValue, imageSize);
  };

  const generatedImage = async (
    prompt: string,
    size: string
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/openai/generate', {
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
        setIsLoading(false);
        throw new Error('That image could not be generated');
      }
      const generatedImage = await response.json();
      setImageUrl(generatedImage.data);
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <main>
      <section>
        <form onSubmit={handleSubmit}>
          <h1>Generate</h1>
          <div className='Inputs'>
            <div className='Input-Group'>
              <label>Enter your Prompt</label>
              <input
                value={promptValue}
                onChange={(e) => setPromptValue(e.target.value)}
                type='text'
                id='prompt'
                required
                autoComplete='off'
                placeholder='Boy on the moon...'
              />
            </div>
            <div className='Input-Group'>
              <label>Select Size</label>
              <select
                value={imageSize}
                onChange={(e) => setImageSize(e.target.value)}
                name='size'
                id='size'
              >
                <option value='small'>Small</option>
                <option value='medium'>Medium</option>
                <option value='large'>Large</option>
              </select>
            </div>
          </div>
          <br />
          <button disabled={promptValue === ''} type='submit'>
            Generate
          </button>
        </form>
      </section>
      {isLoading ? (
        <p>Pixel by pixel...</p>
      ) : (
        <section className='Image'>
          <div>
            <p>{error}</p>
            {imageUrl.length > 1 && (
              <img src={imageUrl} alt='OpenAI Image' id='image' />
            )}
          </div>
        </section>
      )}
    </main>
  );
};
