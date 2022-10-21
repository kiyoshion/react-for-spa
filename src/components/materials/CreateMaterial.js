import axios from "../../lib/axios"
import { useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDropzone } from 'react-dropzone'
import { Types } from '../../Types'
import { CONSTS } from '../../Consts'
import utilStyles from '../../styles/util.module.scss'
import MaterialStyles from './Material.module.scss'

export default function CreateItem() {
  const [ title, setTitle ] = useState("")
  const [ contents, setContents ] = useState([
    { title: "1", order: 1 }
  ])
  const [ chapters, setChapters ] = useState([
    { title: "1", order: 1, parentOrder: 1 }
  ])
  const [ parentOrder, setParentOrder ] = useState(1)
  const [ poster, setPoster ] = useState(null)
  const [ types, setTypes ] = useState([])
  const getTypesURL = '/api/types'
  const navigate = useNavigate();

  const StorePost = () => {
    axios
      .get('/api/user')
      .then(res => {
        const params = new FormData()
        params.append("poster", poster)
        params.append("title", title)
        params.append("user_id", res.data.id)
        params.append("contents", JSON.stringify(contents))
        params.append("chapters", JSON.stringify(chapters))
        console.log(poster)
        axios
          .post(CONSTS.GET_MATERIALS_URL, params, { headers: {
            'Content-Type': 'multipart/form-data'
          }})
          .then((res) => {
            navigate(`/materials/${res.data.material.id}`)
          })
      })
  }

  const addContent = () => {
    setContents(() => [...contents, { title: contents.length + 1, order: contents.length + 1 }])
    setParentOrder(contents.length + 1)
  }

  const addChapter = (parentOrder) => {
    setChapters(() => [...chapters, { title: chapters.length + 1, order: chapters.length + 1, parentOrder: parentOrder }])
  }

  const updateContents = (index, newData, order) => {
    setContents(
      contents.map((content, i) =>
        (i === index ? { title: newData, order: order } : content)
      )
    )
  }

  const updateChapters = (index, newData, order, parentOrder) => {
    setChapters(
      chapters.map((chapter, i) =>
        (i === index ? { title: newData, order: order, parentOrder: parentOrder } : chapter)
      )
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
    display: 'inline-flex', borderRadius: 2, border: '1px solid #eaeaea', marginBottom: 8, marginRight: 8, width: 100, height: 100, padding: 4, boxSizing: 'border-box'
  };

  const thumbInner = {
    display: 'flex', minWidth: 0, overflow: 'hidden'
  };

  const img = {
    display: 'block', width: 'auto', height: '100%'
  };

  const thumbsContainer = {
    display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 16
  };

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
        alt=""
          src={file.preview}
          style={img}
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  const groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})
  }

  useEffect(() => {
    axios
      .get(getTypesURL)
      .then(res => {
        const result = groupBy(res.data.types, 'parent_id')
        setTypes(result)
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
      })
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
        <div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Types.ja.map((type) => {
              return (
                <div key={type.id}>
                  <span>{type.name}</span>
                  <div style={{ display: 'flex' }}>
                    {type.children.map((type) => {
                      return (
                        <p key={type.id}>{type.name}</p>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
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
          {contents.map((content, i) => {
            return (
              <div key={i}>
                <input
                  type="text"
                  id={i}
                  value={content.title}
                  onChange={(e) => updateContents(i, e.target.value, content.order)}
                  style={{marginBottom:'.5rem'}}
                />
                {chapters.map((chapter, j) => {
                  if (chapter.parentOrder === content.order) {
                    return (
                      <div key={j}
                      style={{ margin: '0 0 .5rem 1rem' }}>
                        <input
                          type="text"
                          id={j}
                          value={chapter.title}
                          onChange={(e) => updateChapters(j, e.target.value, chapter.order, chapter.parentOrder)}
                        />
                      </div>
                    )
                  }
                })}
              </div>
            )
          })}
        </div>
        <button onClick={addContent}>コンテンツを追加</button>
        <button onClick={() => addChapter(parentOrder)}>チャプターを追加</button>
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
