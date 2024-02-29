import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Header from "./components/header/Header";
import EmployeeList from "./pages/EmployeeList/EmployeeList";
import Profile from "./pages/Profile/Profile";
import './App.scss';
import { createContext, useEffect, useState } from "react";

export const api = 'https://frontend-test-api.stk8s.66bit.ru/'; 

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route element={<Header/>}>
          <Route element={<EmployeeList/>} path='/'/>
          <Route element={<Profile/>} path='/profile/:id'/>
      </Route>
  )
);

export const DarkModeContext = createContext(null as any);
export const FiltersContext = createContext(null as any);

export default function App() {
  const darkModeJSON = localStorage.getItem('mode');
  const [mode, setMode] = useState(darkModeJSON ? JSON.parse(darkModeJSON) : false);

  const filtersJSON = localStorage.getItem('filters');
  const [filters, setFilters] = useState(filtersJSON ? JSON.parse(filtersJSON) : {
    'gender': '',
    'stack': '',
    'position': ''
  });

  const changeTheme = () => {
    var header = document.querySelector('.header-wrapper');
    var p = document.querySelectorAll('p');
    var h2 = document.querySelectorAll('h2');
    var h3 = document.querySelectorAll('h3');
    var h4 = document.querySelectorAll('h4');
    var tag = document.querySelectorAll('.tag');
    var search = document.querySelectorAll('.search');
    var icon = document.querySelectorAll('.icon');
    var filterButton = document.querySelectorAll('.filter-button');
    var filtersWrapper = document.querySelector('.filters-wrapper');
    var a = document.querySelectorAll('a');
    var grey = document.querySelectorAll('.grey');
    var falldown = document.querySelectorAll('.falldown');
    var listItems = document.querySelectorAll('.list-item');

    if (mode) {
      document.body.classList.add('dark-background');
      p?.forEach(e => e.classList.add('light-text'));
      h2?.forEach(e => e.classList.add('light-text'));
      h3?.forEach(e => e.classList.add('light-text'));
      h4?.forEach(e => e.classList.add('light-text'));
      filterButton?.forEach(e => e.classList.add('light-text'));
      header?.classList.add('dark-background', 'dark-shadow');
      filtersWrapper?.classList.add('lighter-dark');
      tag.forEach(e => e.classList.add('dark-background'));
      icon.forEach(e => e.classList.add('light-icon'));
      search?.forEach(e => e.classList.add('light-text'));
      a.forEach(e => e.classList.add('light-text'));
      grey.forEach(e => e.classList.add('lighter-dark'));
      falldown.forEach(e => e.classList.add('dark-background'));
      listItems.forEach(e => e.classList.remove('hover-light'));
      listItems.forEach(e => e.classList.add('hover-dark'));
    }
    else {
      document.body.classList.remove('dark-background');
      p?.forEach(e => e.classList.remove('light-text'));
      h2?.forEach(e => e.classList.remove('light-text'));
      h3?.forEach(e => e.classList.remove('light-text'));
      h4?.forEach(e => e.classList.remove('light-text'));
      filterButton?.forEach(e => e.classList.remove('light-text'));
      header?.classList.remove('dark-background', 'dark-shadow');
      filtersWrapper?.classList.remove('lighter-dark');
      tag.forEach(e => e.classList.remove('dark-background'));
      icon.forEach(e => e.classList.remove('light-icon'));
      search?.forEach(e => e.classList.remove('light-text'));
      a.forEach(e => e.classList.remove('light-text'));
      grey.forEach(e => e.classList.remove('lighter-dark'));
      falldown.forEach(e => e.classList.remove('dark-background'));
      listItems.forEach(e => e.classList.add('hover-light'));
      listItems.forEach(e => e.classList.remove('hover-dark'));
    }
  }

  const targetNode = document.body;

  const observer = new MutationObserver(changeTheme);
  const config = { childList: true, subtree: true };

  observer.observe(targetNode, config);


  useEffect(() => {
    changeTheme();
  }, [mode])
  return (
    <>
      <FiltersContext.Provider value={{filters, setFilters}}>
        <DarkModeContext.Provider value={{mode, setMode}}>
          <RouterProvider router={router}/>
        </DarkModeContext.Provider>
      </FiltersContext.Provider>
    </>
  )
}