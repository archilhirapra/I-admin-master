// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import Send from 'mdi-material-ui/Send'
import Check from 'mdi-material-ui/Check'
import ArrowUp from 'mdi-material-ui/ArrowUp'
import ChartPie from 'mdi-material-ui/ChartPie'
import Download from 'mdi-material-ui/Download'
import ArrowDown from 'mdi-material-ui/ArrowDown'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import WindowClose from 'mdi-material-ui/WindowClose'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import ContentCopy from 'mdi-material-ui/ContentCopy'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import ContentSaveOutline from 'mdi-material-ui/ContentSaveOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

import axios from 'axios'
import authConfig from 'src/configs/auth'
import documentConfig from 'src/configs/document'
import DocumentViewDialog from '../document/DocumentViewDialog'
// import riderConfig from 'src/configs/rider'
import CustomChip from 'src/@core/components/mui/chip'

import AddDocumtnDrawer from 'src/views/apps/user/rider/document/AddDocumentDrawer'

const userStatusObj = {
  true: 'success',
  false: 'error'
}

const StyledLink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

// ** Vars
const invoiceStatusObj = {
  Sent: { color: 'secondary', icon: <Send sx={{ fontSize: '1.25rem' }} /> },
  Paid: { color: 'success', icon: <Check sx={{ fontSize: '1.25rem' }} /> },
  Draft: { color: 'primary', icon: <ContentSaveOutline sx={{ fontSize: '1.25rem' }} /> },
  'Partial Payment': { color: 'warning', icon: <ChartPie sx={{ fontSize: '1.25rem' }} /> },
  'Past Due': { color: 'error', icon: <InformationOutline sx={{ fontSize: '1.25rem' }} /> },
  Downloaded: { color: 'info', icon: <ArrowDown sx={{ fontSize: '1.25rem' }} /> }
}

const RiderDocumentTable = ({ id, rider }) => {
  // ** State
  const [pageSize, setPageSize] = useState(7)
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Var
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [reloadDocument, setReloadDocument] = useState(1)
  const [data, setData] = useState(null)
  useEffect(() => {
    const data = []

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem(authConfig.storageTokenKeyName)
    }
    axios
      .get(documentConfig.DocumentEndpoint, { params: { userId: id }, headers })
      .then(response => {
        setData(response.data.data.data)
      })
      .catch(() => {
        setData([])
      })
  }, [id, reloadDocument])

  const RowOptions = ({ id }) => {
    // ** State
    const [anchorEl, setAnchorEl] = useState(null)
    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = event => {
      setAnchorEl(event.currentTarget)
    }

    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <DotsVertical />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuItem>
            <Download fontSize='small' sx={{ mr: 2 }} />
            Download
          </MenuItem>
        </Menu>
      </>
    )
  }

  const EyeOption = ({ row }) => {
    const handleView = () => {
      setViewId(id)
      setDocument(row)
      toggleDocumentViewDialog()
    }

    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='View File'>
          <Box>
            <IconButton onClick={handleView} size='small' component='a' sx={{ textDecoration: 'none' }}>
              <EyeOutline />
            </IconButton>
          </Box>
        </Tooltip>
      </Box>
    )
  }

  const threeDotForDescription = (text, length) => {
    if (text != undefined) {
      return text.substring(0, length) + '...'
    }
  }

  const columns = [
    {
      sortable: false,
      flex: 0.2,
      field: 'id',
      minWidth: 90,
      headerName: '# ID',
      renderCell: ({ row }) => <StyledLink>{`#${threeDotForDescription(row.id, 10)}`}</StyledLink>
    },

    {
      sortable: false,
      flex: 0.2,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        let accountStatus
        if (row.status == 'true') {
          accountStatus = 'Accepted'
        } else {
          accountStatus = 'Rejected'
        }

        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.isVerified == 0 ? 'Pending' : row.isVerified == 1 ? 'Accepted' : 'Rejected'}
            color={userStatusObj[row.isVerified]}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      }
    },
    {
      sortable: false,
      flex: 0.2,
      minWidth: 90,
      field: 'docType',
      headerName: 'Doc Type',
      renderCell: ({ row }) => <Typography variant='body2'>{row.title}</Typography>
    },
    {
      sortable: false,
      flex: 0.25,
      minWidth: 225,
      field: 'uploadedAt',
      headerName: 'Uploaded At',
      renderCell: ({ row }) => <Typography variant='body2'>{row.createdAt}</Typography>
    },
    {
      sortable: false,
      flex: 0.25,
      minWidth: 225,
      field: 'updatedAt',
      headerName: 'Updated At',
      renderCell: ({ row }) => <Typography variant='body2'>{row.updatedAt}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => EyeOption({ row })
    }
  ]

  const [documentViewDialog, setDocumentViewDialogOpen] = useState(false)

  const toggleDocumentViewDialog = () => {
    // setDocument(null)
    if (documentViewDialog == true) {
      setDocument(null)
    }
    setDocumentViewDialogOpen(!documentViewDialog)
  }

  const [document, setDocument] = useState(null)
  const [viewId, setViewId] = useState(null)

  const [addDocumentOpen, setAddDocumtnOpen] = useState(false)

  const toggleAddUserDrawer = () => setAddDocumtnOpen(!addDocumentOpen)

  return (
    <>
      <Card>
        <CardHeader
          title='Document List'
          sx={{ '& .MuiCardHeader-action': { m: 0 } }}
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '32px !important', letterSpacing: '0.15px !important' }
          }}
          action={
            <>
              <Button
                variant='contained'
                onClick={toggleAddUserDrawer}
                aria-expanded={open ? 'true' : undefined}
                aria-controls={open ? 'user-view-overview-export' : undefined}
              >
                Upload
              </Button>
            </>
          }
        />
        <DataGrid
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          autoHeight
          columns={columns}
          rows={data}
          pageSize={pageSize}
          disableSelectionOnClick
          rowsPerPageOptions={[7, 10, 25, 50]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
        />
      </Card>

      <DocumentViewDialog
        open={documentViewDialog}
        toggle={toggleDocumentViewDialog}
        row={document}
        setDocument={setDocument}
        rider={rider}
        viewId={viewId}
        reloadDocument={reloadDocument}
        setReloadDocument={setReloadDocument}
      />

      <AddDocumtnDrawer
        open={addDocumentOpen}
        toggle={toggleAddUserDrawer}
        userId={id}
        reloadDocument={reloadDocument}
        setReloadDocument={setReloadDocument}
      />
    </>
  )
}

export default RiderDocumentTable
