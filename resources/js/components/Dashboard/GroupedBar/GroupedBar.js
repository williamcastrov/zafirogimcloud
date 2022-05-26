import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 315,
    },
    typography: {
        fontSize: 16,
        color: "#ff3d00"
    }
}));

const data = {
    labels: ['MT101', 'MT102', 'MT178', 'MT193', 'MT206', 'MT167'],
    datasets: [
        {
            label: 'Facturación',
            data: [3145612, 2890121, 2146789, 3078024, 2734567, 3089453],
            backgroundColor: 'rgb(75, 192, 192)',
        },
        {
            label: 'Gastos',
            data: [1789121, 978872, 112401, 1812011, 1019212, 1901121],
            backgroundColor: 'rgb(255, 99, 132)',
        }
    ],
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};


function GroupedBar(props) {
    const styles = useStyles();

    return (
        <div className="containerGrafica">
            <Typography align="center" className={styles.typography} variant="button" display="block" >
                Comparativa Facturación vs Gastos MT
            </Typography>

            <Bar data={data} options={options} />
        </div>
    );

}

export default GroupedBar;