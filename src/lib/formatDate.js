import { formatDistance, format } from 'date-fns'
import { ja } from 'date-fns/locale'

export default function FormatDate(props) {
  console.log(props)
  const date = format(new Date(props.d), 'yy/MM/dd')
  const ago = formatDistance(new Date(), Date.parse(props.d), { locale: ja })

  return (
    <time datetime={date}>{ago}</time>
  )
}
