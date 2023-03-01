// importação do React
import { useState, useEffect } from 'react';


// importação do Components
import Loading from '../../components/layout/Loading';

// importação do CSS
import styles from './Home.module.css';

//importação da imagem
import savings from '../../img/cantodaserra.png';

import CardVendedores2 from '../project/CardVendedores2';
import CardCompradores2 from '../project/CardCompradores2';
import Container from '../layout/Container';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  //Depoimentos
  const [vendedores, setVendedores] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [ setProjectMessage] = useState('') //Mensagem de removido com 
  //Eventos
  const [compradores, setCompradores] = useState([])
  


  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);
//Depoimentos
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
//Eventos
  useEffect(() => {
    setTimeout(
      () => {
      fetch('http://localhost:5000/compradores', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      }).then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        setCompradores(data)
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
      setProjectMessage('Funcionário removido com sucesso!')
    })
    .catch(err => console.log(err))
  }

  function removeProject (id) { //Metodo DELETE + msg de sucesso
    fetch(`http://localhost:5000/compradores/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(resp => resp.json())
    .then(() => {
      setCompradores(compradores.filter((compradores) => compradores.id !== id))
      setProjectMessage('Evento removido com sucesso!')
    })
    .catch(err => console.log(err))
  }

  return (
    <section className={styles.home_container}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          
         
          
          <img src={savings} alt="Logo pousada" className={styles.foto}/>

          
        </>
        
      )}
   

      <div className={styles.project_container}>
     <div className={styles.title_container}>
     <h1>Depoimentos</h1>
     </div>
     
     <Container customClass='start'>
       {vendedores.length > 0 && //Alterar as palavras imovel por vendedores e compradores
        vendedores.map((project) =>// Aqui o nome project permanece, pois ele faz o link com o project.tipo
          <CardVendedores2
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
      <br></br>
      <hr></hr>
    </div>
        
   
          
      <div className={styles.project_container}>
     <div className={styles.title_container}>
     <h1>Eventos</h1>
     
     
     </div>
     
     <Container customClass='start'>
       {compradores.length > 0 && //Alterar as palavras imovel por vendedores e compradores
        compradores.map((project) =>// Aqui o nome project permanece, pois ele faz o link com o project.tipo
          <CardCompradores2
          id={project.id}
          nome={project.nome}
          idade={project.idade}
          interesse={project.tipo}
          evento={project.evento}
          handleRemove={removeProject}
          />)}
          {!removeLoading && <Loading />}
          {removeLoading && compradores.length === 0 && (
            <p>Não há imóveis cadastrados.</p>
          )}
      </Container>
    </div>
        
    </section>
  );
}

export default Home;