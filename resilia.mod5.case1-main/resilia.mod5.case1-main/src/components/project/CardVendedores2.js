
import styles from './ProjectCard.module.css'





function CardVendedores2({id, nome, salario, idade, cargo, tipo, handleRemove}){
    
    

  

    return(
       <div className={styles.project_card}>
         <h4>{nome}</h4>
         <p className={styles.category_text}> {cargo}  </p>
         <p className={styles.category_text}><strong> {idade} </strong></p>
         
         
        
       </div>
        
    )
}

export default CardVendedores2;