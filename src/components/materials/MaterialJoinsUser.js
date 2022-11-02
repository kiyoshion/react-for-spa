import { useDispatch, useSelector } from 'react-redux'
import { setJoinTopicModal } from '../../store/modalSlice'
import { getDateAgo } from '../../lib/dateFns'
import Avatar from '../common/Avatar'
import materialJoinsUserStyles from './MaterialJoinsUser.module.scss'

export default function MaterialJoinsUser() {
  const currentMaterial = useSelector(state => state.root.material.currentMaterial)
  const dispatch = useDispatch()

  const handleJoinTopicModal = (bool) => {
    dispatch(setJoinTopicModal(bool))
  }

  return (
    <div className={materialJoinsUserStyles.joinedUserContainer}>
      <div className={materialJoinsUserStyles.buttonCircleContainer}>
        <div className={`${materialJoinsUserStyles.buttonCircleLarge} ${materialJoinsUserStyles.anime}`}></div>
        <div className={`${materialJoinsUserStyles.buttonCircle} ${materialJoinsUserStyles.animeSmall}`} onClick={() => handleJoinTopicModal(true)}>
          <span>+</span>
        </div>
      </div>
      {currentMaterial.joins.map((join) => (
          <div key={join.user.id} className={materialJoinsUserStyles.joinedUserList}>
            <div className={materialJoinsUserStyles.joinedUserInner}>
              <Avatar user={join.user} size="48" />
              <span>{getDateAgo(join.created_at)}</span>
            </div>
          </div>
        )
      )}
    </div>
  )
}
