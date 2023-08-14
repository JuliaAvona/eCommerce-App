import styles from './Error.module.css';
import React from "react";
import {Nav} from "react-bootstrap";
import {Pages} from "../../types/enums";

const Error = () => {
  return (
        <div className="mt=20">
            <img src="https://serviceholod.by/wp-content/uploads/2020/02/pustoy-holodilnik-mozhno-li-vklyuchat-1024x681.jpg" alt="holod"/>
           <div className={styles.text1}>
               <pre>Error Page 404</pre>
               <pre>It's empty, try again later.</pre>
               <div className="btn btn-dark">
                   <Nav.Link href={Pages.main} className='m-2'>To home page.</Nav.Link>
               </div>
           </div>
        </div>
      )
};

export default Error;
