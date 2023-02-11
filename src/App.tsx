import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import './style/App.css';
import 'prismjs/components/prism-sql';
import './style/prism.css';
import prettify from './utils/prettify';

function App() {
  const [code, setCode] = useState(
    `INSERT INTO users (name, email, password) VALUES ('John', 'john@doe.com', '123456');\n` + 
    `INSERT INTO users (name, email, password) VALUES ('John', 'john@doe.com', '123456');`
  );
  return (
    <div className="App">
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages.sql, "sql")}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          border: '1px solid #ddd',
          width: '100%',
          height: '100%',
        }}
      />
      <Editor
        value={prettify(code)}
        onValueChange={_ => {}}
        highlight={code => highlight(code, languages.sql, "sql")}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          border: '1px solid #ddd',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}

export default App
