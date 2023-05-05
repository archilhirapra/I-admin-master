// ** React Imports
import {Fragment, useState} from 'react'

// ** MUI Imports

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TableContainer from '@mui/material/TableContainer'
import DialogContentText from '@mui/material/DialogContentText'
import EditAdminDrawer from 'src/views/apps/user/admin/list/EditUserDrawer2'

const AdminAdminInformationTab = () => {
  // ** States

  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const [editUserOpen, setEditUserOpen] = useState(false)
  const toggleEditUserDrawer = () => {
    if (editUserOpen) {
      setEditId(null);
      setEditUserOpen(false)
    } else {
      setEditUserOpen(true)
    }

  }

  return (
    <Fragment>
      <Card sx={{mb: 6}}>
        <CardHeader
          title='Admin Details'
          titleTypographyProps={{variant: 'h6'}}
          action={
            <Button variant='contained' onClick={() => toggleEditUserDrawer()}>
              Edit
            </Button>
          }
        />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} lg={6}>
              <TableContainer>
                <Table size='small' sx={{width: '95%'}}>
                  <TableBody
                    sx={{
                      '& .MuiTableCell-root': {
                        border: 0,
                        pt: 2,
                        pb: 2,
                        pl: '0 !important',
                        pr: '0 !important',
                        '&:first-of-type': {
                          width: 148
                        }
                      }
                    }}
                  >
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                          Full Name :
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>Sourav Kumar</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                          Gender :
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>Male</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                          Date of Birth :
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>15-04-1996</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                          Father Name :
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>Sourav's Father</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                          Alternative Number:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='subtitle2'>0000000000</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12} lg={6}>
              <TableContainer>
                <Table size='small'>
                  <TableBody
                    sx={{
                      '& .MuiTableCell-root': {
                        border: 0,
                        pt: 2,
                        pb: 2,
                        pl: '0 !important',
                        pr: '0 !important',
                        '&:first-of-type': {
                          width: 148
                        }
                      }
                    }}
                  >
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{whiteSpace: 'nowrap'}}>
                          Blood Group:
                        </Typography>
                      </TableCell>
                      <TableCell>O+</TableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>


        <EditAdminDrawer open={editUserOpen} toggle={toggleEditUserDrawer} editId={editId} setEditId={setEditId}
                         editRow={editRow} setEditRow={setEditRow}/>

      </Card>
    </Fragment>
  )
}

export default AdminAdminInformationTab
