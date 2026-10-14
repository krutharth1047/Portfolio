import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../Navbar';
import Footer from '../Footer';

export function Error404() {
  const location = useLocation();
  return (
    <div className="not-found">
      <Navbar simple />
      <main className="container not-found__body">
        <p className="mono accent">error 404</p>
        <h1>Nothing lives at {location.pathname}</h1>
        <p className="muted">That page doesn't exist, but the rest of the site does.</p>
        <a className="btn btn--primary" href="/">
          Take me home <span aria-hidden="true">→</span>
        </a>
      </main>
      <Footer year={new Date().getFullYear()} />
    </div>
  );
}
