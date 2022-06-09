import React,{useState} from 'react';

import { ReactComponent  as MessengerIcon} from './icons/messenger.svg'
import { ReactComponent  as CogIcon} from './icons/cog.svg'
import { ReactComponent  as BellIcon} from './icons/bell.svg'
import { ReactComponent  as CaretIcon} from './icons/caret.svg'
import { ReactComponent  as LeftArrawIcon} from './icons/left-arrow.svg'
import { ReactComponent  as RightTriangleIcon} from './icons/right-triangle.svg'
import { CSSTransition} from 'react-transition-group'
function App() {
  return (
    <NavBar>
      <NavItem icon={<MessengerIcon/>}/>
      <NavItem icon={<BellIcon/>}/>
      <NavItem icon={<CogIcon/>}/>
      <NavItem icon={<CaretIcon/>}>
      <DropdownMenu/>
        </NavItem>
   
    </NavBar>
  );
}
function NavBar(props){
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}
function NavItem(props){
  const [open,setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={()=> setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function DropdownMenu(){
  const [activeMenu,setActiveMenu] = useState('main');
  const [menuHeight,setMenuHeight] = useState(null);
  function calcHeight(el){
    const height = el.offsetHeight
    console.log('height',height)
        setMenuHeight(height)
  }
  function DropdownItem(props){
  
    return (
      <a hrf="#" className='menu-item' onClick={()=>props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className='icon-button'>{props.leftIcon}</span>
        {props.children}
        <span className='icon-right'>{props.rightIcon}</span>
      </a>
    )
  }
  return (
    <div className='dropdown' style={{height:menuHeight}}>
      <CSSTransition 
      in={activeMenu==='main'}
      unmountOnExit 
      timeout={500}
      classNames="menu-primary"
      onEnter={calcHeight}
      >
         <div className='menu'>
          <DropdownItem>My profile</DropdownItem>
          <DropdownItem
          leftIcon={<CogIcon/>}
          rightIcon={<RightTriangleIcon/>}
          goToMenu='settings'
          >
            settings
          </DropdownItem>
          </div>
      </CSSTransition>

      <CSSTransition 
      in={activeMenu==='settings'} 
      unmountOnExit 
      timeout={500}
      classNames="menu-secondary"
      onEnter={calcHeight}
      >
         <div className='menu'>
          <DropdownItem  leftIcon={<LeftArrawIcon/>} goToMenu='main' />
          <DropdownItem>item 1</DropdownItem>
          <DropdownItem>item 2</DropdownItem>
          <DropdownItem>item 3</DropdownItem>
          <DropdownItem>item 4</DropdownItem>
          <DropdownItem>item 5</DropdownItem>
          <DropdownItem>item 6</DropdownItem>
          <DropdownItem>item 7</DropdownItem>
          
          </div>
      </CSSTransition>
      
    </div>
  )
}
export default App;
