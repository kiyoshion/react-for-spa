import axios from "../../lib/axios"
import { useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import utilStyles from '../../styles/util.module.scss'
import { useDropzone } from 'react-dropzone'
import MaterialStyles from './Material.module.scss'

export default function CreateItem() {
  const [ title, setTitle ] = useState("")
  const [ sections, setSections ] = useState([
    { title: "シーズン", level: 0 },
    { title: "エピソード", level: 1 },
  ])
  const [ poster, setPoster ] = useState(null)
  const updateMaterialURL = '/api/materials'
  const navigate = useNavigate();

  const StorePost = () => {
    axios
      .get('/api/user')
      .then(res => {
        const params = new FormData()
        params.append("poster", poster)
        params.append("title", title)
        params.append("user_id", res.data.id)
        params.append("sections", JSON.stringify(sections))
        console.log(poster)
        axios
          .post(updateMaterialURL, params, { headers: {
            'Content-Type': 'multipart/form-data'
          }})
          .then((res) => {
            console.log(res.data)
            navigate(`/materials/`)
          })
      })
  }

  const addSection = () => {
    setSections(() => [...sections, { title: "", level: 0 }])
  }

  const addSectionChildren = () => {
    setSections(() => [...sections, { title: "", level: 1 }])
  }

  const updateSections = (index, newData) => {
    setSections(
      sections.map((section, i) => (i === index ? { title: newData, level: section.level }: section))
    )
  }

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0])
    setPoster(acceptedFiles[0].name)
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })

  }, [])

  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setPoster(acceptedFiles[0])
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
        alt=""
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div className={utilStyles.container}>
      <h1>教材を登録</h1>
      <div className={utilStyles.formContainer}>
        <div>
          <input
            type="text"
            id="title"
            key="title"
            className={utilStyles.bigInput}
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={MaterialStyles.posterContainer}>
          <div className={MaterialStyles.inputFileContainer}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </div>
          <aside style={thumbsContainer}>
            {thumbs}
          </aside>
        </div>
        <div>
          {sections.map((section, index) =>
            ( <input
                type="text"
                id={index}
                key={index}
                value={section.title}
                onChange={(e) => updateSections(index, e.target.value )}
              />)
          )}
        </div>
        <button onClick={addSection}>シーズンを追加</button>
        <button onClick={addSectionChildren}>エピソードを追加</button>
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
