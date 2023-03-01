import styles from './Input.module.css'

function Input2({type, text, name, placeholder, handleOnChange, value}){ /* Essas props serão utilizadas na identificação dos Inputs do formulário*/
    return ( // Os campos do input abaixo estão de forma dinâmica, e serão alterados de acordo com a página que estiverem.
        <div className={styles.form_control2}> 
            <label htmlFor={name}>{text}:</label>
            <textarea 
            type={text} 
            name={name} 
            id={name} 
            placeholder={placeholder} 
            onChange={handleOnChange} 
            value={value}/>
        </div> 
    )
}

export default Input2;