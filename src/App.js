import React,{useState, useEffect} from 'react'
import { Imprimir } from './components/Imprimir';

/*
            obtendo os valores do local storage
*/
const getDatafromLS=()=>{
      const data = localStorage.getItem('teams');
      if(data){
          return JSON.parse(data);
      }
      else{
          return []
      }
}
var avatar = ''

export const App = () => {

  /*
            main array of objects state || teams state || teams array of objects
  */

  const [teams, setTeams]=useState(getDatafromLS());

  /*
            input field states
  */

  const [usergh, setUsergh]=useState('');
  const [email, setEmail]=useState('');
  const [linkedin, setLinkedin]=useState('');
  const [usercw, setUsercw]=useState('');
  
  
  /*
            form submit event 
  */

  const handleAddTeamSubmit=(e)=>{

    e.preventDefault();

  /*
            Access github looking for the element's avatar
  */
   
    var urlu = "https://api.github.com/users/" + usergh;
		fetch(urlu, {method: 'GET'})
    		.then(function(response) {
        	if (!response.ok) {
            	throw Error(response.statusText);
        	}
        	return response.json();
    		})
			.then(function(users) {
        avatar = users.avatar_url
        
			
    /*
            creating an object
    */
       
    let team={
              avatar,     
              usergh,
              email,
              linkedin,
              usercw  
    }
  
    setTeams([...teams,team]);
   
    setUsergh('');
    setEmail('');
    setLinkedin('');
    setUsercw('');
  })

  .catch(function(error) {
    alert(usergh +' no existe, verifique el codigo de usuario github')
   	
    });
  }


  /*
            delete team from Local storage 
  */
  const deleteTeam=(usergh)=>{
        const filteredTeams=teams.filter((element,index)=>{
              return element.usergh !== usergh
        })
        setTeams(filteredTeams);
  }

  /*
            saving data to local storage
  */

  useEffect(()=>{
      localStorage.setItem('teams',JSON.stringify(teams));
  },[teams])

  return (
    <div className='wrapper'>
        <h1>Participantes curso React JS</h1>
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <div className='main'>
            <div className='form-container'>
              <form autoComplete="off" className='form-group' onSubmit={handleAddTeamSubmit}>
           
                <input  type='text' 
                        placeholder='User Github' 
                        className='form-control' 
                        required
                        onChange={(e)=>setUsergh(e.target.value)} 
                        value={usergh}>
                </input>
                <br></br>
            
                <input  type='text' 
                        placeholder='E-mail'  
                        className='form-control' 
                        required
                        onChange={(e)=>setEmail(e.target.value)} 
                        value={email}>
                </input>
                <br></br>
            
                <input  type='text' 
                        placeholder='Linkedin'  
                        className='form-control' 
                        required
                        onChange={(e)=>setLinkedin(e.target.value)} 
                        value={linkedin}>
                </input>
                <br></br>
            
                <input  type='text' 
                        placeholder='User Codewars'  
                        className='form-control' 
                        required
                        onChange={(e)=>setUsercw(e.target.value)} 
                        value={usercw}>
                </input>
                <br></br>

                <button type='submit' className='btn btn-secondary'>
                  Adicionar Participante
                </button>
              </form>
            </div>
            <div className='view-container'>
              {teams.length>0&&
              <>
                  <div className='table-responsive'>
                    <table className='table' id='tabla'>
                      <thead>
                        <tr>
                          <th>Student</th>
                          <th>User Github</th>
                          <th>Correo electronico</th>
                          <th>URL linkedin</th>
                          <th>User Codewars</th>
                          <th>Selec</th>
                        </tr>
                      </thead>
                      <tbody>
                        <Imprimir teams={teams} deleteTeam={deleteTeam}/>
                      </tbody>
                    </table>
                  </div>
                  <button className='btn btn-danger btn-md'
                    onClick={()=>setTeams([])}>Exclua todos os itens em LOCAL STORAGE</button>
              </>
              }
              {teams.length < 1 && <div className='alerta'>Área de armazenamento vazia</div>}
            </div>
        </div>
    </div>
  )
}

export default App

