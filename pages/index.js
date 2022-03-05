import Head from 'next/head'

import Typist from "react-typist"
import { Container, Navbar, Nav, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap'
import styles from '../styles/Index.module.scss'

import { getFirestore, collection, addDoc, getDocs, where, query} from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app'

import { validateEmail } from '../lib/utils'


export default function Home({firebaseConfig}) {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  async function handleNewsletterSubscription(e) {
    e.preventDefault()
    const email = e.target[0].value 
    const newsletterCol = collection(db, "newsletter")

    if (validateEmail(email)) {
      const q = query(newsletterCol, where("email", "==", email))
      const d = await getDocs(q)

      if (d.size == 0) {
        addDoc(newsletterCol, {
          active: true,
          email: email,
          timestamp: Date.now()
        })
        alert("Thank you for registering to our newsletter")
      } else {
        alert("You are already registered to our newsletter")
      }
    } else {
      alert("You entered an invalid email.")
    }
  }

  const renderTooltip = (props) => (
    <Tooltip {...props}>
    Which we do not have.
    </Tooltip>
  );

  return (
    <>
      <Head>
        <title>println</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.layout__herosection}>
        <div className="mb-0 alert alert-primary d-flex justify-content-center">
          Come talk to us on&nbsp;
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <span>social media!</span>
          </OverlayTrigger>  
        </div>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="#" className='text-white'>Brand</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className='justify-content-end' id="basic-navbar-nav">
              <Nav className="align-items-center">
                <Nav.Link href="#" className='text-white px-4'>Home</Nav.Link>
                <Nav.Link href="#" className='text-white px-4'>About</Nav.Link>
                <Nav.Link href="#" className="ps-4"><Button>Login</Button></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className={styles.herosection__pages}>
          <Container>
            <Row className="h-100">
              <Col xs={12} md={6}>
                <h1 className="fw-bold text-white"> Print it into the cloud, read it everywhere. </h1>
                <p className="text-light">Println aims to help developers stay up to date with what their software is doing, whether it runs in the cloud, or not.</p>
              </Col>
              <Col className="d-flex justify-content-center align-items-center">
                <h1 className="text-white">
                  &gt; Print
                  <Typist startDelay={2000} cursor={{blink: true}} stdTypingDelay={200} className='d-inline-block'>
                      <span>line</span>
                      <Typist.Backspace count={4} delay={2000} />
                      <span>ln</span>
                  </Typist>
                </h1>
              </Col>
            </Row>
            <Row className='justify-content-center mt-7'>
              <Col md={6}>
                <h2 className="text-center text-white ">Subscribe to our newsletter!</h2>
                <p  className="text-center text-white fw-light">To get the latest news regarding development of our service, consider subscribing to our newsletter.</p>
                <form className="form" method="post" onSubmit={handleNewsletterSubscription}>
                    <Row className='justify-content-center'>
                      <Col md={6}>
                        <input className="form-control" type="email" name="email" placeholder="Your Email" />
                      </Col>
                      <Col md={2}>
                        <button type="submit" className="btn btn-primary">Subscribe</button>
                      </Col>
                    </Row>
                </form>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  )
}

Home.getInitialProps = async (ctx) => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID
  };

  if (process.env.FIREBASE_MEASUREMENTID != undefined) {
    firebaseConfig["measurementId"] = process.env.FIREBASE_MEASUREMENTID
  }
  return {firebaseConfig: firebaseConfig}
}