import { useState, useEffect } from 'react'
import { supabase } from './utils/supabaseClient'


function App() {
    const [userData, setUserData] = useState([])

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    async function getUsers () {
      const { data, error } = await supabase
      .from("User_data")
      .select("*")

      if (error) {
        console.error(error.message)
      } else {
        setUserData(data)
      }
    }

    useEffect(() => {
      getUsers();
    }, []);

    async function handleAdd (e) {
      e.preventDefault();

      const { error } = await supabase
      .from("User_data")
      .insert([
        {
          firstName,
          lastName,
        }
      ]);

      if (error) {
        console.log(error)
      } else {
        setFirstName("");
        setLastName("");
      }

    }




  return (
    <>

    <form onSubmit={handleAdd}>

      <input type="text" name="firstName" placeholder='Enter First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
     
      <input type="text" name="lastName" placeholder='Enter Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
      

    </form>

    </>
  )
}

export default App
