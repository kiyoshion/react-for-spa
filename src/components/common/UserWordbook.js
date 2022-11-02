import { Link } from "react-router-dom"
import { CONSTS } from "../../Consts"
import IconBookmark from "../icons/IconBookmark"
import Avatar from "./Avatar"
import userWordbookStyles from './UserWordbook.module.scss'

export default function UserWordbook({ material, author }) {

  const getThumbsHeader = (thumbs, thumbnail) => {
    switch (thumbs.length) {
      case 0:
        return (
          <div className={userWordbookStyles.wordbookThumbs}>
            <div className={userWordbookStyles.wordbookThumbsZero}>
              <img src={`${CONSTS.IMAGE_BASE64}${thumbnail}`} alt="wordbook noimage" />
            </div>
          </div>
        )
      case 1:
        return (
          <div className={userWordbookStyles.wordbookThumbs}>
            <div className={userWordbookStyles.wordbookThumbsOne}>
              <div className={userWordbookStyles.wordbookThumbsOneLeft}>
                <img src={`${CONSTS.IMAGE_BASE64}${thumbnail}`} alt="thumbs" />
              </div>
              <div className={userWordbookStyles.wordbookThumbsOneRight}>
                <img src={`${CONSTS.IMAGE_BASE64}${thumbs[0]}`} alt="thumbs" />
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className={userWordbookStyles.wordbookThumbs}>
            <div className={userWordbookStyles.wordbookThumbsTwo}>
              <div className={userWordbookStyles.wordbookThumbsTwoLeft}>
                <img src={`${CONSTS.IMAGE_BASE64}${thumbnail}`} alt="thumbs" />
              </div>
              <div className={userWordbookStyles.wordbookThumbsTwoRight}>
                <img src={`${CONSTS.IMAGE_BASE64}${thumbs[0]}`} alt="thumbs" />
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className={userWordbookStyles.wordbookThumbs}>
            <div className={userWordbookStyles.wordbookThumbsThree}>
              <div className={userWordbookStyles.wordbookThumbsThreeLeft}>
                <img src={`${CONSTS.IMAGE_BASE64}${thumbnail}`} alt="thumbs" />
              </div>
              <div className={userWordbookStyles.wordbookThumbsThreeRight}>
                <div className={userWordbookStyles.wordbookThumbsThreeRightTop}>
                  <img src={`${CONSTS.IMAGE_BASE64}${thumbs[0]}`} alt="thumbs" />
                </div>
                <div className={userWordbookStyles.wordbookThumbsThreeRightBottom}>
                  <img src={`${CONSTS.IMAGE_BASE64}${thumbs[1]}`} alt="thumbs" />
                </div>
              </div>
            </div>
          </div>
        )
      default:
        break
    }
  }

  return (
    <div key={material.id} className={userWordbookStyles.wordbook}>
      <Link className={userWordbookStyles.wordbookLink} to={`/users/${author.name}/words/${material.id}`} ></Link>
      {getThumbsHeader(material.thumbs, material.thumbnail)}
      <div className={userWordbookStyles.wordbookContent}>
        <div className={userWordbookStyles.wordbookContentAuthor}>
          <Avatar user={author} size="44" border='2px solid #fff' />
          <span>{author.name}</span>
        </div>
        <div className={userWordbookStyles.wordbookContentFooter}>
          <span className={userWordbookStyles.wordbookContentFooterTotal}><span>{material.total}</span>words</span>
          <div className={userWordbookStyles.wordbookContentFooterButtons}>
            <div className={userWordbookStyles.wordbookContentFooterButtonsBookmark}>
              <IconBookmark size="16" color="#333" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
