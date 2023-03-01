import { useState, useEffect } from 'react';

import Loading from '../layout/Loading'
import CardVendedores from '../project/CardVendedores';
import styles from './DashImoveis.module.css'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton';
import Message from '../layout/Message';

function DashVendedores() {

  const [vendedores, setVendedores] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('') //Mensagem de removido com 

  useEffect(() => {
    setTimeout(
        () => {
      fetch('http://localhost:5000/vendedores', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      }).then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        setVendedores(data)
        setRemoveLoading(true)
      })
      .catch((err) => console.log(err))
    }, 700)
  }, [])

  function removeProject (id) { //Metodo DELETE + msg de sucesso
    fetch(`http://localhost:5000/vendedores/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(resp => resp.json())
    .then(() => {
      setVendedores(vendedores.filter((vendedores) => vendedores.id !== id))
      setProjectMessage('Depoimento removido com sucesso!')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className={styles.project_container}>
     <div className={styles.title_container}>
     <h1>Depoimentos</h1>
     <LinkButton to="/vendedores" text="Inserir depoimento" />
     
     </div>
     {projectMessage && < Message type="success" msg={projectMessage} />}
     <Container customClass='start'>
       {vendedores.length > 0 && //Alterar as palavras imovel por vendedores e compradores
        vendedores.map((project) =>// Aqui o nome project permanece, pois ele faz o link com o project.tipo
          <CardVendedores
          id={project.id}
          nome={project.nome}
          cargo={project.tipo} 
          idade={project.idade}
          salario={project.salario}
         
          handleRemove={removeProject}
          />)}
         {!removeLoading && <Loading />}
        {removeLoading && vendedores.length === 0 && (
          <p>Não há funcionários cadastrados.</p>
        )}
      </Container>
    </div>
  )
}
 

export default DashVendedores;
