import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import './style/App.css';
import 'prismjs/components/prism-sql';
import './style/prism.css';
import prettify from './utils/prettify';

const code_style = {
  fontFamily: '"Fira code", "Fira Mono", monospace',
  fontSize: 12,
  border: '1px solid #ddd',
  width: '100%',
  height: '90%',
};

function App() {
  const [code, setCode] = useState(
    `INSERT INTO users.users (name, email, password) VALUES ('John', 'john@doe.com', '123456');\n` + 
    `INSERT INTO users.users (name, email, password) VALUES ('Kate', 'kate@long-email.com', 'qwerty');`
  );
  return (
    <div className="App">
      <div className="editor">
        <h1>Source</h1>
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => highlight(code, languages.sql, "sql")}
          padding={10}
          style={code_style}
        />
      </div>
      <div className="editor">
        <h1>Prettified</h1>
        <Editor
          value={prettify(code)}
          onValueChange={_ => {}}
          highlight={code => highlight(code, languages.sql, "sql")}
          padding={10}
          style={code_style}
        />
      </div>
    </div>
  )
}

export default App
