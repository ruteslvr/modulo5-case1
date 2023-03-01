import {Link} from "react-router-dom"
import styles from './ProjectCard.module.css'
import {BsPencil, BsFillTrashFill} from 'react-icons/bs' //Assim se puxam os ícones

function ProjectCard({id, nome, idade, interesse, evento, handleRemove}){

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return(
       <div className={styles.project_card}>
         <h4>{nome}</h4>
         <p className={styles.category_text}><strong>Descrição:</strong></p>
         <p>{evento}</p>
         <p className={styles.category_text}><strong>Data:</strong> {idade}</p>
        
         
       </div>
        
    )
}

export default ProjectCard;