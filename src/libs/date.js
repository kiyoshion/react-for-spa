import { formatDistance, format } from 'date-fns'
import { ja } from 'date-fns/locale'

export default function formatDate(d = '') {
  const date = format(new Date(d), 'yy/MM/dd')
  const ago = formatDistance(new Date(), Date.parse(d), { locale: ja })
  return <time datetime={date}>{ago}</time>
}
