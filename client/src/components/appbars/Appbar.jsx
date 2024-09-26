import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Dropdown } from '@mui/base/Dropdown';
import Sidebar from './Sidebar';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import naruto from '../../assets/tests/Naruto Redraws.jpeg';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '../utils/Button';

export default function Appbar({ login, signup }) {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.authUser);
    // useEffect(()=>{
    //     console.log(user)
    // },[])

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const [isOpen, setOpen] = useState(false);
    const [state, setState] = useState({ left: false });
    const toggleDrawer = (anchor, open) => event => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            setOpen(false);
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <>
            <div
                className={`flex justify-between items-center bg-[rgba(0,0,0,0.4)] w-screen h-[10vh] px-5 ${
                    !(login || signup) && 'border-b-2 border-neutral-600'
                }`}
            >
                <div className=" flex items-center space-x-1 text-zinc-100">
                    {['left'].map(anchor => (
                        <div className="sm:hidden" key={anchor}>
                            <button onClick={toggleDrawer(anchor, true)}>
                                <MenuIcon
                                    sx={{ fontSize: 40, color: 'white' }}
                                />
                            </button>
                            <SwipeableDrawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                                className=" bg-transparent"
                            >
                                <Sidebar hidden={false} />
                            </SwipeableDrawer>
                        </div>
                    ))}
                    <div
                        className="cursor-pointer text-white font-serif text-2xl font-semibold tracking-wide"
                        onClick={() => {
                            navigate('/music');
                        }}
                    >
                        HOBINIX
                    </div>
                </div>
                <div className="flex justify-around items-center space-x-2">
                    {/* <Switch {...label} defaultChecked /> */}
                    {login ? (
                        <Button
                            value="Register"
                            style="text-white py-2"
                            onClick={() => {
                                navigate('/signup');
                            }}
                        />
                    ) : signup ? (
                        <Button
                            value="Login"
                            style="text-white py-2"
                            onClick={() => {
                                navigate('/login');
                            }}
                        />
                    ) : (
                        <Dropdown>
                            <TriggerButton>
                                <Avatar src={naruto} />
                            </TriggerButton>
                            <Menu slots={{ listbox: StyledListbox }}>
                                <StyledMenuItem
                                    onClick={() => {
                                        navigate(`/user/${user.username}`);
                                    }}
                                >
                                    <AccountCircleIcon /> Profile
                                </StyledMenuItem>
                                <StyledMenuItem
                                    onClick={() => {
                                        navigate('/logout');
                                    }}
                                >
                                    <LogoutIcon /> Log out
                                </StyledMenuItem>
                            </Menu>
                        </Dropdown>
                    )}
                </div>
            </div>
        </>
    );
}

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledListbox = styled('ul')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px #047857;
  z-index: 1;
  `
);

const StyledMenuItem = styled(MenuItem)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `
);

const TriggerButton = styled(MenuButton)(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
//   box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 50%;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:focus-visible {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  `
);
