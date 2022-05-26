import React, { useState } from 'react';
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { Typography, makeStyles } from "@material-ui/core";
import firebase from "../../../server/firebase";
import { validateEmail } from "../../../server/Validations";
import "firebase/auth";
import swal from 'sweetalert';

// Cargar estilos
import "./RegistrarUsuario.scss";

// Cargar servicios Backend
import usuariosServices from "../../../services/Usuarios";

const useStyles = makeStyles((theme) => ({
  typography: {
    fontSize: 20,
    color: "#f9fbe7"
  }
}));

function RegistrarUsuario(props) {
  const styles = useStyles();
  const { setSelectedForm } = props;
  const [formData, setFormData] = useState(defaultValueForm());
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [creaUsuario, setCreaUsuario] = useState(true);

  // Inicializar las variables de la tabla usuarios, se creara un procedimiento para la actualizacion
  const [nit, setNit] = useState('XXXXXXXXXXX');
  const [nombre, setNombre] = useState('GIM Cloud');
  const [company, setCompany] = useState('Big Connections');
  const [email, setEmail] = useState('big@gmail.com');
  const [telefono, setTelefono] = useState('999999999');
  const [pais, setPais] = useState('169');
  const [ciudad, setCiudad] = useState('05361');
  const [uid, setUid] = useState('');
  const [tipo, setTipo] = useState('GEN');
  const [foto, setFoto] = useState('');
  const [celular, setCelular] = useState('999999999');
  const [direccion, setDireccion] = useState('Por asignar');
  const [activo, setActivo] = useState(1);

  const [usuarios, setUsuarios] = useState({
    nit: '42792969',
    nombre: 'Claudia Maria Holguin',
    company: 'HM Servicios Inmobiliarios',
    email: 'cholguin@hmservicios.com',
    telefono: '454545454545',
    pais: '169',
    ciudad: '05631',
    uid: '12345678901234567890',
    tipo: 'GEN',
    foto: 'None',
    celular: '3005585844',
    direccion: 'Cra 30 sur',
    activo: 1
  })

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const haldlerCreaUsuario = () => {
    setCreaUsuario(!creaUsuario);
  }

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }
    if (formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }
    if (!formData.username) {
      errors.username = true;
      formOk = false;
    }
    setFormError(errors);

    if (formOk) {
      setIsLoading(true);
      console.log(formData.email);
      console.log(formData.password);

      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          swal({
            title: "Registro Usuarios",
            text: "Cuenta creada de forma correcta!",
            icon: "success",
            button: "Aceptar"
          });
          changeUserName();
          //console.log(firebase.auth().currentUser);
          console.log(firebase.auth().currentUser.uid);
          console.log(formData.username);
          console.log(firebase.auth().currentUser.email);
          setNombre(formData.username);
          setEmail(firebase.auth().currentUser.email);
          setUid(firebase.auth().currentUser.uid);
          //setUsuarios(usuarios);
          haldlerCreaUsuario();
          //grabarUsuario();
        })
        .catch(() => {
          swal({
            title: "Registro Usuarios",
            text: "Error al crear la cuenta!",
            icon: "error",
            button: "Aceptar"
          });

        })
        .finally(() => {
          setIsLoading(false);
          setSelectedForm(null);
        });
    }
  }

  const changeUserName = () => {
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: formData.username
      })
      .catch(() => {
        swal({
          title: "Registro Usuarios",
          text: "Error al asignar el nombre del usuario!",
          icon: "error",
          button: "Aceptar"
        });
      });
  };

  const grabarUsuario = async () => {

    /*
    setFormError({});
    let errors = {};
    let formOk = true;
 
    if (!pais.id) {
      errors.id_ = true;
      formOk = false;
    }
 
    if (!pais.nombre_pai) {
      errors.nombre_pai = true;
      formOk = false;
    }
 
    setFormError(errors);
*/
    console.log(creaUsuario);
    console.log(usuarios);


    if (creaUsuario) {
      console.log("ENTRO");
      const res = await usuariosServices.save(usuarios);

      if (res.success) {
        console.log("OK");
        swal({
          title: "Registro Usuarios",
          text: "Usuario Creado de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        //abrirCerrarModalInsertar();
        //delete pais.id;
        //delete pais.nombre_pai;
      } else {
        console.log("FALSO");
        swal({
          title: "Registro Usuarios",
          text: "Error Creando el Usuar!",
          icon: "error",
          button: "Aceptar"
        });
        console.log(res.message);
        //abrirCerrarModalInsertar();
      }
    }
    else {
      swal({
        title: "Registro Usuarios",
        text: "Debe Ingresar Todos los Datos, Error Creando el Usuario!",
        icon: "warning",
        button: "Aceptar"
      });
      console.log(res.message);
      //abrirCerrarModalInsertar();
    }
  }

  return (
    <div className="register-form" >
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
        Registrarse en GIM Cloud
      </Typography>
      <br/>
      <Form onChange={onChange} onSubmit={onSubmit} >
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electrónico"
            icon="mail outline"
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
              Por favor, ingresa un correo electronico válido.
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Ingresa tu contraseña"
            icon={showPassword ? (
              <Icon name="eye slash outline" link onClick={handlerShowPassword} />
            ) : (
                <Icon name="eye" link onClick={handlerShowPassword} />
              )
            }
            error={formError.password}
          />
          {formError.password && (
            <span className="error-text">
              Por favor, ingresa una contraseña superior a 5 caracteres.
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="Por favor ingresa tu nombre de usuario"
            icon="user circle outline"
            error={formError.username}
          />
          {formError.username && (
            <span className="error-text">Por favor, ingresa un Nombre.</span>
          )}
        </Form.Field>
        <Button type="submit" loading={isLoading} > Continuar </Button>
      </Form>
      <div className="register-form__options">
        <p onClick={() => setSelectedForm(null)}>Regresar al menu</p>
        <p>
          Ya tienes una cuenta ?{" "}
          <span onClick={() => setSelectedForm("login")}>Iniciar sesión</span>
        </p>
      </div>
    </div>

  );
};

function defaultValueForm() {
  return {
    email: "",
    username: "",
    password: ""
  };
}

export default RegistrarUsuario;