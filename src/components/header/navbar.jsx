import React, { useState } from 'react'
import "./navbar.css";

export default function Navbar() {
    const [showSearchZone, setShowSearchZone] = useState(false);



    return (<main className='navbar'>
    <div className="logo">
        <img src="header/logo.png" alt="logoImage" className='logoImage' />
    </div>

    {
        showSearchZone ? <div className="zoneSearch" >
            <input type="text" className="zoneSearchInput" />
            <p onClick={()=>setShowSearchZone(false)} className='closeSearch'>X</p>
        </div>
        : <div className="menu">
            <div className="categories">
                categories 
            </div>
            <div>Home</div>
            <div>About Us</div>
            <div>Contact Us</div>
        </div>
    }
 
    <div className="searchCart">
        <div onClick={()=>{setShowSearchZone(true)}}>
            search
        </div>
        <div>
            cart
        </div>
    </div>
  </main>)
}
