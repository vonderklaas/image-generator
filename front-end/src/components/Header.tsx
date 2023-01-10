import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <Link to='/'>Generate</Link>
      <Link to='/About'>About</Link>
      <a
        href='https://huggingface.co/spaces/Gustavosta/MagicPrompt-Stable-Diffusion'
        target='_blank'
      >
        Enhance Your Prompts
      </a>
      <a href='https://beta.openai.com/docs' target='_blank'>
        OpenAI Docs
      </a>
    </header>
  );
};
