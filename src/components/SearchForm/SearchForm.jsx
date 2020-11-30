import styles from './SearchForm.module.css';

import { ReactComponent as Arrow } from '../../images/icon-arrow.svg'

const SearchForm = ({ submitCallback, changeCallback, error }) => {

    return (
        <div className={styles.formContainer}>
            <form onSubmit={submitCallback}>
                <div className={styles.wrapper}>
                    <input className={styles.ipInput} type='text' aria-label='search' placeholder='Enter IP to search...' onChange={(e) => changeCallback(e.target.value)} />
                    <button className={styles.btnSubmit} type='submit' name='submit' data-testid='submit'>
                        <Arrow />
                    </button>
                </div>
                {error &&
                    <span className={styles.error} data-testid='search-error'>{error}</span>
                }
            </form>
        </div>
    )
}

export default SearchForm
