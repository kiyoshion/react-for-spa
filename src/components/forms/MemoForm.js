import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CONSTS } from '../../Consts'
import { setCurrentMaterial } from '../../store/materialSlice'
import { setOpenOutputModal } from '../../store/modalSlice'
import axios from '../../lib/axios'
import memoFormStyles from './MemoForm.module.scss'

export default function MemoForm() {
  const [ memo, setMemo ] = useState("")
  const currentMaterial = useSelector(state => state.root.material.currentMaterial)
  const currentChapter = useSelector(state => state.root.chapter.currentChapter)
  const dispatch = useDispatch()

  const storeMemo = async () => {
    await axios
      .post(CONSTS.STORE_MEMO_URL, {
        body: memo,
        material_id: currentMaterial.id,
        chapter_id: currentChapter.id,
        topic_id: currentMaterial.joinsCurrentUserTopic.topic_id,
      })
      .then((res) => {
        dispatch(setCurrentMaterial(res.data.material))
        dispatch(setOpenOutputModal(false))
      })
  }

  return (
    <div className={memoFormStyles.containerMemo}>
      <textarea
        row="2"
        className={memoFormStyles.formText}
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      ></textarea>
      <button
        className={memoFormStyles.buttonSend}
        onClick={storeMemo}
      >→</button>
    </div>
  )
}
