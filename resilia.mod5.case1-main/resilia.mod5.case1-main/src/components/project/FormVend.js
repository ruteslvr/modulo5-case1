import{useState, useEffect} from 'react'

import Input from '../form/Input'
import Input2 from '../form/Input2';

import SubmitButton from '../form/SubmitButton';

import styles from './ProjectForm.module.css';

function FormVend({handleSubmit, btnText, vendedoresData}) {
  const [categories, setCategories] = useState([])
  const [vendedores, setVendedores] = useState(vendedoresData || {})

  const optionsForm = [
    {
      id: 1,
      value: 'vendedor',
      label: 'Vendedor'
    },
    {
      id: 2,
      value: 'gr',
      label: 'Gerente'
    },
    {
      id: 3,
      value: 'asg',
      label: 'Auxiliar de Serviçoes Gerais'
    },
    {
      id: 4,
      value: 'dp',
      label: 'Departamento Pessoal'
    },
  ]

  useEffect(() => {
    fetch('http://localhost:5000/vendedores', {
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
    handleSubmit(vendedores)  // Quando duplicar alterar aqui p/ vendedores ou compradores
  }

  function handleChange(e) {
    setVendedores({...vendedores, [e.target.name]: e.target.value}) // Quando duplicar alterar imovel p/ vendedores ou compradores
   
  }

  function handleCategory(e) {
    setVendedores({
      ...vendedores, // Quando duplicar alterar imovel p/ vendedores ou compradores
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
        text='Nome do hóspede'
        name='nome'
        placeholder='Insira o nome aqui'
        handleOnChange={handleChange}
        value={vendedores.nome ? vendedores.nome : ''}
      />
      <Input2 
        type='text'
        text='Depoimento'
        name='tipo' 
        placeholder='Insira o relato aqui'
        handleOnChange={handleChange}
        value={vendedores.tipo ? vendedores.tipo : ''}
      /> {/*Tentar mudar idade para data de nascimento, utilizando máscara(dd/mm/aaaa) */}
      <Input 
        type='text'
        text='Cidade, UF'
        name='idade'
        placeholder='Insira o estado e sua UF'
        handleOnChange={handleChange}
        value={vendedores.idade ? vendedores.idade : ''}
      />
      
      <SubmitButton text={btnText} />
    </form>
  );
}

export default FormVend;
