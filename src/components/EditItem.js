import axios from "../lib/axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import utilStyles from '../styles/util.module.scss'
import { useSelector } from "react-redux"
import { EditorState, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { convertToHTML } from "draft-convert"
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function EditItem() {
  const [ title, setTitle ] = useState("")
  // const [ body, setBody ] = useState("")
  const updateItemURL = '/api/items/'
  const navigate = useNavigate();
  const params = useParams()
  const { user } = useSelector(state => state.user)

  const [ editorState, setEditorState ] = useState(null)
  const [ convertedContent, setConvertedContent ] = useState(null)

  useEffect(() => {
    axios
      .get(updateItemURL + params.id)
      .then(res => {
        setTitle(res.data.item.title)
        // setEditorState(res.data.item.body)
        // setBody(res.data.item.body)
        const initData = convertFromRaw({
          entityMap: {},
          blocks: [
            {
              key: "xxxxxx",
              text: res.data.item.body,
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
        setEditorState(initState)
      })
  }, [])

  const handleEditorChange = (state) => {
    setEditorState(state)
    convertContentToHTML()
  }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent())
    setConvertedContent(currentContentAsHTML)
  }

  const UpdateItem = async () => {
    await axios
      .put(updateItemURL + params.id, {
        "title": title,
        "body": convertToHTML(convertedContent),
        "user_id": user.id
      })
      .then(() => {
        navigate(`/items/`)
      })
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
        <div>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            options: ["inline", "blockType", "list", "textAlign", "link"],
            inline: {
              options: ["bold", "strikethrough"],
            },
            blockType: {
              inDropdown: false,
              options: ["H2"],
            },
            list: {
              options: ["unordered"],
            },
            textAlign: {
              options: ["center"],
            },
            link: {
              options: ["link"],
            },
          }}
        />
          {/* <textarea
            id="body"
            value={body}
            rows="30"
            onChange={(e) => setBody(e.target.value)}
          ></textarea> */}
        </div>
        <div>
          <button
            className={`${utilStyles.btn} ${utilStyles.btn_black}`}
            onClick={UpdateItem}
          >Update</button>
        </div>
      </div>
    </div>
  )
}
