import styles from './Input.module.css';

import { ReactComponent as Arrow } from '../../images/icon-arrow.svg'

const Input = ({ type = 'text', placeholder, onChange, value }) => {
    return (
        <div className={styles.wrapper}>
            <input className={styles.ipInput} type={type} placeholder={placeholder} onChange={onChange} value={value} />
            <button className={styles.btnSubmit} type='submit'>
                <Arrow />
            </button>
        </div>
    )
}

export default Input
