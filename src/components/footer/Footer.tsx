import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { IconName, IconProp } from '@fortawesome/fontawesome-svg-core';
import './Footer.css'
import {Navbar, Button,Form} from 'react-bootstrap';
import NewLogo from '../../assets/NewLogo.svg';

function SocialMedia({name, refLink} : {name: IconProp, refLink: string}) {
    return <a className="icon" href={refLink} target="_blank"><FontAwesomeIcon icon={name as IconName} /></a>;
}

function Footer(){
    return (
        <footer>
            <div className="footer-container">
                <div className='left-side'>
                    <Navbar.Brand className ='brand-container'>
                    <img className='footer-logo' src={NewLogo} width="100" height="100" alt="1 Thing Org logo"/>
                    <Navbar.Text className='text-container'>
                        <div className='footer-text' >
                            1 Thing<br/>
                            Against<br/>
                            Racism
                        </div>
                        </Navbar.Text>
                </Navbar.Brand>
                    {/* <p>
                        1 Thing Against Racism is a grassroots, non-profit organization of volunteers founded in [DATE]. 
                        We believe ending racism and hate begins with uniting people through compassion and advocacy. 
                        Together we can make the world a more beautiful place — one thing at a time.
                    </p> */}
                    <div className='social-icons'>
                        <SocialMedia name={faInstagram} refLink='mailto:info@1thing.org' />
                        <SocialMedia name={faTwitter} refLink='https://twitter.com/1Thing_Org' />
                        <SocialMedia name={faLinkedin} refLink='https://www.linkedin.com/company/1-thing-org/' />
                        <SocialMedia name={faFacebook} refLink='https://www.facebook.com/people/One-Thing-Org/100081311228444/' />
                    </div>
                    <p className="copy-right">1 Thing Against Racism © 2022 All rights reserved. </p>
                </div> 
                <div className="split-line"></div>
                <div className='right-side'>
                    <p>Sign up for our newsletter for updates on the organization and the projects we’re working on.</p>
                    <div className="subscribe-form">
                         <Form.Control type="email" placeholder="Email" aria-label="Email address"/>
                         <Button className="button" href="#">
                            <div className="subscribe">Subscribe</div>
                         </Button>
                         </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;