import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Typography, Container, CssGlobal } from '@chicho-ui/material'
import { Drawer } from '@mui/material'
import { classes } from './training/components/Presentation/main'

import AppMenu from './training/components/Menu'
import Form from './training/components/Form/index'
import Counter from './training/components/Count/counter'
import UserAdd from './training/components/WithoutCustom/AddUser'
import { USERS } from './training/utils'

const PageReports = () => <Typography component='h1' variant='h3'>Reports Page</Typography>

const App = () => {
  const [ users, setUser ] = useState(USERS)

  // Trasladar a reducers...
  const _handleBtnAdd = (user) => {
    setUser((prev) => [ ...prev, user ])
  }

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssGlobal />
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant='permanent'>
          <AppMenu />
        </Drawer>
        <main className={classes.content}>
          <Container className={classes.container}>
            <Routes>
              <Route element={<Form />} path='/' />
              <Route element={<Counter />} path='/hook' />
              <Route element={<UserAdd onAddUser={_handleBtnAdd} users={users} />} path='/addUser' />
              <Route element={<PageReports />} path='/reports' />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  )
}
export default App
