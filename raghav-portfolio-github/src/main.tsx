import { hydrateRoot } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import Home from '../app/page';
import '../app/globals.css';
const root=document.getElementById('root')!;
if(root.querySelector('main')) hydrateRoot(root,<Home/>);
else createRoot(root).render(<Home/>);
