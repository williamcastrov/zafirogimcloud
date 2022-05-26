import React, { useEffect, useState } from "react";
import firebase from "../../server/firebase";
import "firebase/auth";
import Usuarios from "./Usuarios";

function ActivarUsuario() {
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged(currentUser => {
        if (currentUser) {
            setEmail(currentUser.email);
            setUid( currentUser.uid);
        }
    }) 
  }, [])

  return (
    <div className="App">
      <Usuarios email={email} uid={uid} />
    </div>
  );
}

export default ActivarUsuario;