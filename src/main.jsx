import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import './index.css'

import Root, {
  loader as rootLoader,
  action as rootAction
  } from "./routes/root"

import ErrorPage from './error-page'
import Contact, {
  loader as  contactLoader,
  action as contactAction
} from './routes/contact'


import EditContact, {
  action as editAction
} from './routes/edit'

import { action as destroyAction } from "./routes/destroy"

import Index from './routes/index'

const router = createBrowserRouter([

  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { Index: true, element: <Index /> },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Opps! There was an error.</div>
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)