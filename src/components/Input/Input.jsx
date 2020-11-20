import styles from './Input.module.css';

import { ReactComponent as Arrow } from '../../images/icon-arrow.svg'

const Input = ({ type = 'text', ariaLabel = 'search', placeholder, changeCallback }) => {
    const handleChange = (e) => {
        changeCallback(e.target.value);
    }

    return (
        <div className={styles.wrapper}>
            <input className={styles.ipInput} type={type} aria-label={ariaLabel} placeholder={placeholder} onChange={(e) => handleChange(e)} />
            <button className={styles.btnSubmit} type='submit' name='submit'>
                <Arrow />
            </button>
        </div>
    )
}

export default Input
