import { useEffect, useState } from "react"
import axios from '../lib/axios'
import utilStyle from '../styles/util.module.scss'
import ItemCard from './ItemCard'

export default function Items() {
  const [ items, setItems ] = useState([])
  const getItemsURL = '/api/items'

  useEffect(() => {
    axios.get(getItemsURL)
      .then((res) => {
        setItems(res.data.items)
      })
  }, [])

  return (
    <div className={utilStyle.container}>
      {items.map(item => {
        return (
          <ItemCard key={item.id} item={item} />
        )
      })}
    </div>
  )
}
