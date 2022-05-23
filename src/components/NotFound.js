import React from 'react'
import NoResults from "../assets/no-results.jpg"
import styles from "../styles/NotFound.module.css"
import Asset from './Asset'

const NotFound = () => {
  return (
    <div className={styles.Margin}>
        <Asset src={NoResults} message="Sorry we could not find the page you are looking for!"/>
    </div>
  )
}

export default NotFound