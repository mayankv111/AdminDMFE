import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/system';
import { Button, Divider, IconButton, LinearProgress, Stack, Typography } from '@mui/material';
// import DownloadForOfflineRounded from '@mui/icons-material/DownloadForOfflineRounded';
import axios from  'axios';

export default function App() {
  
  const [app, setApp] = React.useState('');
  // const [objects, setObjects] = React.useState([]);
  const [action, setAction] = React.useState('');
  const [object, setObject] = React.useState('');
  const [file, setFile] = React.useState(null);
  const objects=[
    'searches',
    'tags',
    'maps',
    'leads',
    'authority',
    'flat-authority',
    'fieldPermissions',
    'properties',
    'masterManagement',
    'aparmtentsAuthority',
    'sectorMaps',
    'flat-leads',
    'users',
    'flats',
    'leads2'
  ]

  const handleChangeApp = (event) => {
    setApp(event.target.value);
  };

  const handleChangeAction = (event) => {
    if(app=="") alert('Please select an application');
    else {
      setAction(event.target.value);
    }
  };

  const handleChangeObject = (event) => {
    if(app=="" && action=="") alert('Please select application and action');
    else if(action=="") alert('Please select an action');
    else setObject(event.target.value);
  };

  const onChangeFile=(e) => {
		setFile(e.target.files[0]);

	}

  // const onDownload = async() => {
  //   const formData = new FormData();
  //   formData.append('object', object);
  //  axios.get(`${process.env.API_URL}/download-sample`, formData);
  // };

  const handleSubmit = async() => {
    const formData = new FormData();
    formData.append('file',file);
    formData.append('object', object);
    if(action === 'update'){
      let res = await axios.put(`/api/update-data` , formData );
      console.log(res);
    }
    if(action === 'add'){
      let res = await axios.post(`/api/add-data` ,formData );
      console.log(res);
    }
    if(action === 'delete'){
      let res = await axios.delete(`/api/delete-data` , formData);
      console.log(res);
    }
    if(action === 'prop'){
      let res = await axios.put(`/api/update-properties` , formData);
      console.log(res);
    }
    if(action === 'user'){
      let res = await axios.post(`/api/upload-users` ,formData );
      console.log(res);
    }
    if(action === 'apt'){
      let res = await axios.put(`/api/upload-apt` , formData);
      console.log(res);
    }
    if(action === 'map'){
      let res = await axios.put(`/api/map-info` , formData);
      console.log(res);
    }
  }

  return (
    <Box sx={{backgroundColor:'#EEF1EF !important'}}  pt = {5} pl={10} pr={10} pb = {5} >
    <Typography  variant="h5">
        Data Management
      </Typography>
    <Box sx={{display:'flex',justifyContent:'space-between'}}  mb={2} mt={2}>
      <FormControl sx={{ minWidth: 140 }}>
        <InputLabel id="demo-simple-select-readonly-label">Application</InputLabel>
        <Select
          labelId="demo-simple-select-readonly-label"
          id="demo-simple-select-readonly"
          value={app}
          onChange={handleChangeApp}
          autoWidth
          label="Application"
          placeholder='Application'
          size='medium'
        >
          <MenuItem value="p247">P247</MenuItem>
          <MenuItem value="bf">BF</MenuItem>
          <MenuItem value="rummy">Rummy</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{  minWidth: 140 }}>
        <InputLabel id="demo-simple-select-readonly-label">Action</InputLabel>
        <Select
          labelId="demo-simple-select-readonly-label-small"
          id="demo-simple-select-readonly-small"
          value={action}
          onChange={handleChangeAction}
          autoWidth
          label="Action"
          placeholder='Action'
        >
          <MenuItem value="add">Add new data</MenuItem>
          <MenuItem value="update">Update data</MenuItem>
          <MenuItem value="delete">Delete data</MenuItem>
          <MenuItem value="prop">Update properties data</MenuItem>
          <MenuItem value="user">Add User data</MenuItem>
          <MenuItem value="apt">Upload Apartment data</MenuItem>
          <MenuItem value="map">Upload Map Info</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{  minWidth: 140 }}>
        <InputLabel id="demo-simple-select-readonly-label">Object</InputLabel>
        <Select
          labelId="demo-simple-select-readonly-label"
          id="demo-simple-select-readonly"
          value={object}
          onChange={handleChangeObject}
          autoWidth
        >
        {objects.map((obj) => <MenuItem value= {obj}>{obj}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
    <Divider />
    <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}} mt={4} mb={2}>
    {/* <Button variant="outlined" endIcon={<DownloadForOfflineRounded/>} onClick={onDownload}>
      Download sample file
    </Button> */}
    <Button variant="contained" component="label" sx={{marginTop:'1.5rem'}}>
        <input accept={".csv"}  type="file" name='file'  onChange={onChangeFile}/>
      </Button>
    </Box>

    {action && <Button onClick={handleSubmit}>Perform {action}</Button>}
    {/* <LinearProgress/> */}
    </Box>

  );
}