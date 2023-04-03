import React, { ChangeEvent, useState, useEffect } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import UsuarioLogin from "../../models/UsuarioLogin";
import { login } from "../../service/Service";
import { useDispatch } from "react-redux";
import { addId, addToken } from '../../store/tokens/Action';
import { toast } from 'react-toastify';

function Login() {
    let navigate = useNavigate();
    const [token, setToken] = useState('');
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)

    const [userLogin, setUserLogin] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        cpf: "",
        senha: "",
        token: "",
    });

    const [respUserLogin, setRespUserLogin] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        cpf: "",
        senha: "",
        token: "",
      })

    function updateModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value,
        });
    }
    useEffect(() => {
        if (token != "") {
            dispatch(addToken(token))
            navigate("/home");
        }
    }, [token]);

    useEffect(() => {
        if(respUserLogin.token !== '') {
        dispatch(addToken(respUserLogin.token))
        dispatch(addId(respUserLogin.id.toString()))
        navigate('/home')
        }
    }, [respUserLogin.token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true)
            await login(`/usuarios/logar`, userLogin, setRespUserLogin);
            toast.success('Usuário logado com sucesso!',{
                theme:'colored'
            })
        } catch (error) {
            setIsLoading(false)
            toast.error('Dados do usuário inconsistentes. Erro ao logar!',{
                theme:'colored'
        });
        }
    }
    return (
        <Grid className="fundo pd80 imglogin" container direction="row" justifyContent="center" alignItems="center">
            <Grid xs={7} alignItems="center" className="img2">
                <Box>
                    <form onSubmit={onSubmit} className="formlogin">
                        <Typography
                            variant="h3"
                            gutterBottom
                            color="textPrimary"
                            component="h3"
                            align="center"
                            className="entrar"
                        >
                            Entrar
                        </Typography>
                        <TextField className="borda"
                            value={userLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                            id="usuario"
                            label="usuário"
                            variant="outlined"
                            name="usuario"
                            margin="normal"
                            fullWidth
                            />
                        <TextField className="borda"
                            value={userLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                            id="senha"
                            label="senha"
                            variant="outlined"
                            name="senha"
                            margin="normal"
                            type="password"
                            fullWidth
                            />
                        <Grid  container xs={12} justifyContent="center">
                                <Button
                                    className="botao1"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    >
                                {isLoading ? 'Aguarde' : 'Logar'}
                                </Button>
                                
                        </Grid>
                    </form>
                    <Box  display="flex" justifyContent="center" marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant="subtitle1" gutterBottom align="center">
                                Ainda não é cadastrado?
                            </Typography>
                        </Box>
                            <Link to="/cadastro" className="text-decorator-none">
                        <Typography variant="subtitle1" gutterBottom align="center" className="txts"> Cadastre-se</Typography>
                            </Link>
                    </Box>
                </Box>
                </Grid>
            </Grid>
    );
}

export default Login;