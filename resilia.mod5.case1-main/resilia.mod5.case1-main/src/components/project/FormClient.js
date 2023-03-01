import{useState, useEffect} from 'react'

import Input from '../form/Input'
import Input2 from '../form/Input2';

import SubmitButton from '../form/SubmitButton';

import styles from './ProjectForm.module.css'

function FormClient({handleSubmit, btnText, compradoresData}) {
  const [categories, setCategories] = useState([])
  const [compradores, setCompradores] = useState(compradoresData || {})



  useEffect(() => {
    fetch('http://localhost:5000/compradores', {
    method:"GET",
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then((resp) => resp.json())
  .then((data)=>{
    setCategories(data)
  })
  .catch((err)=> console.log(err))
  }, [])  

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(compradores)  // Quando duplicar alterar aqui p/ vendedores ou compradores
  }

  function handleChange(e) {
    setCompradores({...compradores, [e.target.name]: e.target.value}) // Quando duplicar alterar imovel p/ vendedores ou compradores
   
  }

  function handleCategory(e) {
    setCompradores({
      ...compradores, // Quando duplicar alterar imovel p/ vendedores ou compradores
      category: {
        id: e.target.value,
        tipo:e.target.options[e.target.selectedIndex].text,
      },
    })
    
  }

  return (
    <form onSubmit={submit} className={styles.form}> 
      <Input 
        type='text'
        text='Nome do evento'
        name='nome'
        placeholder='Insira o nome do evento aqui'
        handleOnChange={handleChange}
        value={compradores.nome ? compradores.nome : ''}
      />
        <Input2 
        type='text'
        text='Descrição do evento'
        name='evento'
        placeholder='Insira a descrição do evento aqui'
        handleOnChange={handleChange}
        value={compradores.evento ? compradores.evento : ''}
      />
      <Input 
        type='number'
        text='Data'
        name='idade' 
        placeholder='dd/mm/aaaa'
        handleOnChange={handleChange}
        value={compradores.idade ? compradores.idade : ''}
      /> {/*Tentar mudar idade para data de nascimento, utilizando máscara(dd/mm/aaaa) */}
      
    
      <SubmitButton text={btnText} />
    </form>
  );
}

export default FormClient;
