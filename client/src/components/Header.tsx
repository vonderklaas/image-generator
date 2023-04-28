import { Link } from 'react-router-dom';
import './Header.css';

export const Header = () => {
  return (
    <header className='Header'>
      <div>OpenAI Image Generator</div>
      <nav className='Nav'>
        <Link to='/'>Generate</Link>
        <Link to='/About'>About</Link>
        <a
          href='https://huggingface.co/spaces/Gustavosta/MagicPrompt-Stable-Diffusion'
          target='_blank'
        >
          Enhance Prompts
        </a>
      </nav>
    </header>
  );
};
