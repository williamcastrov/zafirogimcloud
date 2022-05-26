import React from 'react';
import { Modal, TextField, Button, Grid, Typography } from "@material-ui/core";

function VerPdf(props) {
 
    const pruebaPdf = () => {
      window.open("http://localhost:9000/487f7b22f-gimcloud.pdf", "PDF")
    }
    
    return (
    <div>
      <Button onClick={pruebaPdf} >
        Ver Pdf
      </Button>
    </div>
  );
}

export default VerPdf;