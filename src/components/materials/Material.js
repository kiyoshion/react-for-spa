import axios from "../../lib/axios"
import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import utilStyles from '../../styles/util.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../store/userSlice'

export default function Material() {
  const [ material, setMaterial ] = useState({})
  const [ sectionGroup, setSectionGroup ] = useState({})
  const [ output, setOutput ] = useState("")
  const [ currentSection, setCurrentSection ] = useState({ title: "", id: 0 })
  const [ openOutputModal, setOpenOutputModal ] = useState(false)
  const [ outputForm, setOutputForm ] = useState({ body: "" })
  const getMaterialURL = '/api/materials/'
  const storeOutputURL = '/api/outputs/'
  const params = useParams()
  const dispatch = useDispatch()

  const groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})
  }

  useEffect(() => {
    dispatch(getUser())
    axios
        .get(getMaterialURL + params.id)
        .then((res) => {
          const date = format(new Date(res.data.material.created_at), 'yy/MM/dd HH:mm')
          setMaterial({
            ...res.data.material,
            "created_at": date
          })
          setSectionGroup(groupBy(res.data.material.sections, 'parent_id'))
        })
    }, [])

  const handleOpenOutput = (title, id) => {
    setCurrentSection({
      title: title,
      id: id
    })
    setOpenOutputModal(!openOutputModal)
  }

  const storeOutput = async () => {
    await axios
      .get('/api/user')
      .then(res => {
        axios.post(storeOutputURL, {
          body: output,
          material_id: material.id,
          section_id: currentSection.id,
          user_id: res.data.id
        })
        .then(res => {
          console.log(res.data)
        })
      })
  }

  return (
    <>
    <div className={utilStyles.container}>
      <h1>{material.title}</h1>
      {/* {Object.keys(sectionGroup).forEach((key) => {
        console.log(sectionGroup[key])
        sectionGroup[key].forEach((val) => {
          // console.log(val)
          return (<div key={val.id}>{val.title}</div>)
        })
      })} */}
      <div>
        {material.sections?.map((section) => (
            section.level === 0 ?
              (
                <div key={section.id}>{section.title}</div>
              ) : (
                <>
                  <div key={section.id}>
                  <Link to={`/sections/${section.id}`}>{section.title}</Link>
                    <span onClick={() => handleOpenOutput(section.title, section.id)}>out</span>
                  </div>
                </>
              )
          )
        )}
      </div>
      {openOutputModal ?
      (<>
        <h2>{currentSection.title}</h2>
        <div>
          <input
            type="text"
            value={output}
            onChange={(e) => setOutput(e.target.value)}
          />
        </div>
        <div>
          <button onClick={storeOutput}>送信</button>
        </div>
      </>) : (
        <div></div>
      )}
    </div>
    </>
  )
}
