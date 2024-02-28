import styles from './sidebar.description.module.css'
const SiderBarDescription =(props:{title:String,description:String})=>{

    return (

        <div className={styles.container}>
            <h6 className={"h3r"}>{props.title}</h6>
            <p className={"bodyr"}>{props.description}</p>

        </div>
    )
}

export default SiderBarDescription