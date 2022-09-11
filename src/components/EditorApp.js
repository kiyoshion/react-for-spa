import { useState } from 'react'
import { convertToRaw, Editor , EditorState, RichUtils,  } from 'draft-js'
import 'draft-js/dist/Draft.css'

export default function EditorApp (props) {
  // const [ editorState, setEditorState ] = useState(
  //   () => EditorState.createEmpty(),
  // )

  const handleH2 = (props) => {
    props.setEditorState(RichUtils.toggleInlineStyle(props.editorState, "header-two"))
  }

  const handleBold = (props) => {
    props.setEditorState(RichUtils.toggleInlineStyle(props.editorState, "BOLD"))
  }

  return (
    <div>
      <div>
      <button onMouseDown={handleH2}>H2</button>
      <button onMouseDown={handleBold}>B</button>
      </div>
      <Editor
        editorState={props.editorState}
        onChange={props.setEditorState(props.editorState)}
      />
    </div>
  )
}

