import React, { useState, useEffect } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Editor from './components/editor/editor.component'
import { marked } from 'marked'
import defaultMarkdown from './defaultMarkdown.md'

function App() {
  const [text, setText] = useState('')

  const textChanged = (text) => setText(text)

  useEffect(() => {
    fetch(defaultMarkdown).then(resp => resp.text()).then(text => setText(text))
  }, [])

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      const hljs = require('highlight.js');
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  });

  function createMarkup(text) { return { __html: marked.parse(text) }; };

  return (
    <Container fluid className="my-2">
      <Card className="w-100 ">
        <Card.Header className="p-0 bg-secondary text-white">
          <h1 className="display-6 m-2"> Markdown Previewer </h1>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col >
              <Editor onTextChange={textChanged} defaultText={text} />
            </Col>
            <Col md='8' >
              <div id="preview" dangerouslySetInnerHTML={createMarkup(text)} className='p-4'>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default App
