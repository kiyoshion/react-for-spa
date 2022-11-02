import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDropzone } from 'react-dropzone'
import { CONSTS } from '../../Consts'
import axios from "../../lib/axios"
import utilStyles from '../../styles/util.module.scss'
import materialStyles from './Material.module.scss'

export default function MaterialCreate() {
  const [ title, setTitle ] = useState("")
  const [ contents, setContents ] = useState([{ title: "1", order: 1 }])
  const [ chapters, setChapters ] = useState([{ title: "1", order: 1, parentOrder: 1 }])
  const [ parentOrder, setParentOrder ] = useState(1)
  const [ poster, setPoster ] = useState(null)
  const [ types, setTypes ] = useState([])
  const [ selectedType, setSelectedType ] = useState({id: 0, name: "", parent: 0})
  const [ contentsPattern, setContentsPattern ] = useState([])
  const navigate = useNavigate();

  const StoreMaterial = () => {
    const params = new FormData()
    params.append("poster", poster)
    params.append("title", title)
    params.append("type_id", selectedType.id)
    params.append("contents", JSON.stringify(contents))
    params.append("chapters", JSON.stringify(chapters))

    axios
      .post(CONSTS.GET_MATERIALS_URL, params, { headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then((res) => {
        console.log(res.data.material)
        navigate(`/materials/${res.data.material.id}`)
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

  const img = {
    display: 'block', width: '90px', height: '120px', objectFit: 'cover'
  };

  const thumbs = files.map(file => (
    <div key={file.name}>
      <div>
        <img
        alt=""
          src={file.preview}
          style={img}
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  const getTypesArr = (types) => {
    let arr = [[], [], [], []]
    types.map((type) => {
      switch (Math.floor(type.id / 10)) {
        case 1:
          arr[0].push({ id: type.id, name: type.name, parent: 10 })
          break
        case 2:
          arr[1].push({ id: type.id, name: type.name, parent: 20 })
          break
        case 3:
          arr[2].push({ id: type.id, name: type.name, parent: 30 })
          break
        case 4:
          arr[3].push({ id: type.id, name: type.name, parent: 40 })
          break
        default:
          break
      }
    })
    return arr
  }

  const handleSelectType = (type) => {
    setSelectedType(type)
    getContentsPattern(type)
  }

  const getContentsPattern = (type) => {
    let result = []
    console.log('type.name: ',type.name)
    switch (type.name) {
      case 'マンガ':
        result = ['チャプターのみ', '巻数とチャプター']
        break
      default:
        return result
    }
    setContentsPattern(result)
  }

  useEffect(() => {
    axios
      .get(CONSTS.GET_TYPES_URL)
      .then(res => {
        const result = getTypesArr(res.data.types)
        setTypes(result)
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
      })
  }, []);

  const thumbStyle = thumbs.length === 0 ? {
    position:'absolute',top:0,left:0,width:'90px',height:'120px',display:'none'
  } : {
    width:'90px',height:'120px',objectFit:'cover'
  }

  return (
    <>
    <div className={utilStyles.container}>
      <h1>教材を登録</h1>
        <div>
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            key="title"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <h3>種類</h3>
        <div className={materialStyles.typeContainer}>
          {types.map((childrenTypes, i) => (
            <div key={i} className={materialStyles.typeList}>
            {childrenTypes.map((type, i) => (<>
              {i !== 0 &&
                <span
                  key={type.id}
                  onClick={() => handleSelectType(type)}
                  className={`${materialStyles.typeItem} ${type.parent === type.id && materialStyles.typeItemIsParent} ${( selectedType.id && selectedType.id === type.id) && materialStyles.typeItemIsSelected}`}
                >
                  {type.name}
                </span>
              }
            </>))}
          </div>
          )
          )}
        </div>
        <h3>サムネイル画像</h3>
        <div className={materialStyles.posterContainer}>
          <div className={materialStyles.inputFileContainer}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>image</p>
            </div>
          </div>
          <aside style={thumbStyle}>
            {thumbs}
          </aside>
        </div>
        <div style={{display:'flex', margin:'1rem 0'}}>
          {contentsPattern.map(pattern => (
            <div
              key={pattern}
              className={`${utilStyles.tagButton} ${utilStyles.tagButtonWhite}`}
            >{pattern}</div>
          ))}
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
            onClick={StoreMaterial}
          >作成</button>
        </div>
      </div>
    </>
  )
}
