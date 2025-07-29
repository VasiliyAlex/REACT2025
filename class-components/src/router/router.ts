import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPages';
import { NotFoundPage } from '../pages/NotFoundPage';
import { DetailsPage } from '../pages/DetailsPage';
import React from 'react';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '',
        Component: HomePage,
      },
      {
        path: ':page',
        loader: ({ params }) => {
          const page = Number(params.page);
          if (Number.isNaN(page) || page < 1) {
            throw new Response('Not Found', { status: 404 });
          }
          return null;
        },
        Component: HomePage,
        errorElement: React.createElement(NotFoundPage),
        children: [
          {
            path: ':detailsId',
            loader: ({ params }) => {
                const id = Number(params.detailsId);
              if (Number.isNaN(id) || id < 1) {
                throw new Response('Not Found', { status: 404 });
              }
              return null;
            },
            Component: DetailsPage,
          },
        ],
      },
      {
        path: 'about',
        Component: AboutPage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);
