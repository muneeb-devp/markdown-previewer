import React, { useEffect, useState } from 'react'

function Editor({onTextChange, defaultText}) {
  const [text, setText] = useState('')

  const textChanged = (e) =>  setText(e.target.value)
  
  useEffect(() => {
    onTextChange(text)
  }, [text])

  return (
    <div className="editor">
      <div className="form-group">
        <label htmlFor="editor" className="lead p-1">Editor</label>
        <textarea className="form-control" name="editor" id="editor" rows="10" onChange={(e) => textChanged(e)} value={defaultText}></textarea>
      </div>
    </div>
  )
}

export default Editor
