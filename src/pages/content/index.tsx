import { createRoot } from 'react-dom/client';
import ArticleReaderButton from './ArticleReaderButton';
import './style.css'

const div = document.createElement('div');
div.id = '__root';
document.body.appendChild(div);

const rootContainer = document.querySelector('#__root');
if (!rootContainer) throw new Error("Can't find Content root element");
const root = createRoot(rootContainer);

// Normal: article
// 百度news: div[data-testid="article"]
// stackoverflow: div.s-prose.js-post-body
let nodes = document.querySelectorAll('article,div[data-testid="article"],div.s-prose.js-post-body')
root.render(<ArticleReaderButton nodes={nodes as NodeListOf<HTMLElement>} />);

try {
  console.log('content script loaded');
} catch (e) {
  console.error(e);
}
