import React from 'react';
import Map from './Map';
import Header from './Header';
import Footer from './Footer';

const ContactInfo = () => {

    return (
        <>
       <Header/>
       <div className="contact-info-row">
           <div className="map">
           <Map />
           </div>
           <div className="contacts">
               <div className="container-contacts">
              <span>Contacts Number: </span> 0884672541
               </div>
               <div className="container-contacts">
              <span>Contacts Email: </span> react@abv.bg
               </div>
               <div className="container-contacts">
               <span>Our office:</span>  Mladost 2 Block 222
               </div>
           </div>
       </div>
       <Footer />
       </>
    );
};
export default ContactInfo;
