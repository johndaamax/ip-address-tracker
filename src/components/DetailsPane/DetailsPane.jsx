import styles from './DetailsPane.module.css';

const DetailsPane = ({ children }) => {
    return (
        <div className={styles.wrapper} data-testid='details-pane-div'>
            {children}
        </div>
    )
}

export default DetailsPane
