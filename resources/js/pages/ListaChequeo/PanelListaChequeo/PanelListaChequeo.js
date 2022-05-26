import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Tabs, Tab, Typography, Box  } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import PeopleIcon from '@material-ui/icons/People';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

// Paginas 
import CrearListaChequeo from "../CrearListaChequeo";
import CumplirListaChequeo from "../CumplirOrdenChequeo";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function selectTab(index) {
    return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      
      backgroundColor: theme.palette.background.paper,
    },
    tabs: {
      backgroundColor: '#9e9e9e',
      borderBottom: '5px solid #212121',
      padding: theme.spacing(0),
      color: 'white',  
      width: '100%',
    }
}));

function PanelListaChequeo() {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <div className={classes.tabs} >
          <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="wrapped label tabs example">
            <Tab value="1" label="Crear Lista de Chequeo" {...selectTab('1')} icon={<AddBoxOutlinedIcon />} />
            <Tab value="2" label="Cumplimiento" {...selectTab('2')} icon={<ExitToAppIcon />} />
          </Tabs>
          </div>
            <TabPanel value={value} index="1">  
              <CrearListaChequeo />
            </TabPanel>
            <TabPanel value={value} index="2">
              <CumplirListaChequeo />
            </TabPanel>
          </div>
    );
}
  
export default PanelListaChequeo;
  


