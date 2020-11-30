import styles from './CustomDetails.module.css'

const CustomDetails = ({ heading, value }) => {
    return (
        <div className={styles.wrapper} data-testid='custom-details-div'>
            <h6>{heading}</h6>
            <h3>{value}</h3>
        </div>
    )
}

export default CustomDetails
