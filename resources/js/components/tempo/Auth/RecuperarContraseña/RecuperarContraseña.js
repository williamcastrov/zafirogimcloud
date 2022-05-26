import React, { useState } from "react";
import { Button, Icon, Form, Input  } from "semantic-ui-react";
import {Typography, makeStyles } from "@material-ui/core";
import { validateEmail } from "../../../server/Validations";
import firebase from "../../../server/firebase";
import "firebase/auth";
//import { useDispatch } from "react-redux";
//import { BigContext } from "../../../context/BigProvider";
import swal from 'sweetalert';

import "./RecuperarContraseña.scss";

const useStyles = makeStyles((theme) => ({
  typography: {
    fontSize: 20,
    color   : "#f9fbe7"
  }
}));

export default function RecuperarContraseña(props) {
  //const { firebase } = React.useContext(BigContext);
  //const dispatch = useDispatch();
  const styles = useStyles();

  const { setSelectedForm } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValueForm());
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [user, setUser] = useState(null);

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }
    
    setFormError(errors);

    if (formOk) {
      setIsLoading(true);

      firebase
      .auth()
      .sendPasswordResetEmail(formData.email)
      .then((response) => {
        swal({
          title: "Recuperar Contraseña",
          text: "Información para recuperar contraseña enviada al email registrado!",
          icon: "success",
          button: "Aceptar"
        });
      })
      .catch((err) => {
        handlerErrors(err.code);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-form">
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
        Recuperar Contraseña en GIM Cloud
      </Typography>
      <br/>
      <Form onSubmit={onSubmit} onChange={onChange}>
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
            placeholder="Contraseña"
            error={formError.password}
            icon={showPassword ? (
                <Icon name="eye slash outline" link onClick={handlerShowPassword} />
              ) : (
                <Icon name="eye" link onClick={handlerShowPassword} />
              )
            }
          />
          {formError.password && (
            <span className="error-text">
              Por favor, ingresa una contraseña superior a 5 caracteres.
            </span>
          )}
        </Form.Field>
        <Button type="submit" isLoading={isLoading} >Recuperar contraseña</Button>
      </Form>

      <div className="login-form__options">
        <p onClick={() => setSelectedForm(null)}>Regresar</p>
        <p>
          ¿No tienes cuenta?{" "}
          <span onClick={() => setSelectedForm("register")}>Regístrate</span>
        </p>
      </div>
    </div>
  );
}

function handlerErrors(code) {
  switch (code) {
    case "auth/wrong-password":
      swal({
        title : "Registro Usuarios",
        text  : "El usuario o la contraseña son incorrecto!",
        icon  : "warning",
        button: "Aceptar"
      });
      break;
    case "auth/too-many-requests":
      swal({
        title : "Registro Usuarios",
        text  : "Has enviado demasiadas solicitudes de reenvio de email de confirmacion en muy poco tiempo!",
        icon  : "warning",
        button: "Aceptar"
      });
      break;
    case "auth/user-not-found":
      swal({
        title : "Registro Usuarios",
        text  : "El usuario o la contraseña son incorrecto",
        icon  : "warning",
        button: "Aceptar"
      });
      break;
    default:
      break;
  }
}

function defaultValueForm() {
  return {
    email: "",
    password: "",
  };
}
