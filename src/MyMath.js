// src/MyMath.js
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

export default function MyMath() {
  return (
    <div>
      <h2>Math Example</h2>
      <Latex>
        {`This is inline: $E = mc^2$ and block: $$\\int_0^\\infty x^2 dx$$`}
      </Latex>
    </div>
  );
}