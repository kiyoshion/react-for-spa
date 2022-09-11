import { useState, createContext } from 'react'
import { ContentState, convertToRaw, EditorState, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { convertToHTML } from 'draft-convert'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export const RichTextContent = createContext()

export default function RichText () {

  // let _contentState = ContentState.createFromText('sample')
  // const raw = convertToRaw(_contentState)
  const initData = convertFromRaw({
    entityMap: {},
    blocks: [
      {
        key: "xxxxxx",
        text: "ここに初期テキストがはいります。",
        type: "unstyled",
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [],
        data: {},
      },
    ],
  })
  const initState = EditorState.createWithContent(
    initData,
  )
  const [ editorState, setEditorState ] = useState(initState)
  const [ convertedContent, setConvertedContent ] = useState(null)

  const handleEditorChange = (state) => {
    setEditorState(state)
  }

  return (
    <RichTextContent.Provider value={editorState}>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </RichTextContent.Provider>
  )
}

