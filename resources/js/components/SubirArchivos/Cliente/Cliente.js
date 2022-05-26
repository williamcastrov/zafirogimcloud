
import React, { Fragment, useState, useEffect } from 'react';
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import swal from 'sweetalert';
import { blue, blueGrey, red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  iconos: {
    cursor: 'pointer'
  },
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  },
  button: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blue[900],
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[900],
    },
  },
}));

function Cliente() {
  const styles = useStyles();
  const [file, setFile] = useState(null)
  const [imageList, setImageList] = useState([])
  const [listUpdate, setListUpdate] = useState(false)
  const [orden, setOrden] = useState(123000)
  const [actividadrealizada, setActividadrealizada] = useState('Dormir')

  useEffect(() => {
    fetch('http://localhost:9000/images/get')
      .then(res => res.json())
      .then(res => { setImageList(res) })
      .catch(err => {
        console.error(err)
      })
      setListUpdate(false)
  }, [listUpdate])

  const selectedHandler = e => {
    setFile(e.target.files[0])
  }

  const sendHandler = (e) => {
    if (!file) {
      alert("Debe Seleccionar un archivo ...")
      return
    }

    const data = new FormData()
    data.append('image', file)
    data.append('actividad', actividadrealizada)
    data.append('nombre', 'William Castro')
    data.append('orden',  1234)

    fetch('http://127.0.0.1:9000/images/post', {
      method: 'POST',
      body: data
    })
      .then(res => res.text())
      .then(res => { 
        console.log(res)
        setListUpdate(true)
      })
        .catch(err => {
        console.error(err)
      })

    document.getElementById('fileinput').value = null;
    setFile(null)
  }

  return (
    <Fragment>
      <Typography
        align="center" className={styles.typography} variant="button" display="block"> Subir Imagenes
            </Typography>
      <div className="container " >
        <div className="card" >
          <input id="fileinput" onChange={selectedHandler} className="form-control" type="file" />
          <Grid item xs={12} md={8}>
            <TextField label="Actividad Realizada" name="descripcion"
              value={actividadrealizada}
              onChange={(e) => setActividadrealizada(e.target.value)} />
          </Grid>
          <Button onClick={sendHandler} className={styles.button} > Subir Archivos </Button>
        </div>
      </div>
      <div className="container mt-4" style={{display: "flex", flexWrap: "wrap" }} >
        { imageList && imageList.map(image => (
          <div key={image} className="card m-2" >
            <img src={'http://localhost:9000/'+image} alt="..." className="card-img-top" style={{height: "200px", width: "300px" }} />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

/*
 {imageList.map(image => (
          <div key={image} className="card" >
            <img src={'http://localhost:9000/'+image} alt="..." className="card-img-top" />
          </div>
        ))}
*/

export default Cliente;