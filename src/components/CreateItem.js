import axios from "../lib/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import utilStyles from '../styles/util.module.scss'
import { EditorState, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { convertToHTML } from "draft-convert"

export default function CreateItem() {
  const [ title, setTitle ] = useState("")
  const updateItemURL = '/api/items'
  const navigate = useNavigate();
  const [ htmlContent, setHtmlContent ] = useState('')
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

  const StorePost = () => {
    axios
      .get('/api/user')
      .then(res => {
        axios
          .post(updateItemURL, {
            "title": title,
            "body": convertedContent,
            "user_id": res.data.id
          })
          .then(() => {
            navigate(`/items/`)
          })
      })
  }

  const handleEditorChange = (state) => {
    setEditorState(state)
    convertContentToHTML()
  }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent())
    setConvertedContent(currentContentAsHTML)
  }

  return (
    <div className={utilStyles.container}>
      <h1>記事を投稿</h1>
      <div className={utilStyles.formContainer}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
        <div>
          <button
            className={`${utilStyles.btn} ${utilStyles.btn_black}`}
            onClick={StorePost}
          >作成</button>
        </div>
      </div>
    </div>
  )
}
