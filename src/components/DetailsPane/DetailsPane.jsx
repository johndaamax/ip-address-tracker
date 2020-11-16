import styles from './DetailsPane.module.css';

const DetailsPane = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}

export default DetailsPane
