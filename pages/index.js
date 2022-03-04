import Head from 'next/head'
import Image from 'next/image'

import Typist from "react-typist"
import { Container, Navbar, Nav, Row, Col, Button } from 'react-bootstrap'
import styles from '../styles/Index.module.scss'
import { delBasePath } from 'next/dist/shared/lib/router/router'

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, where, query} from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

const firebaseConfig = {
  apiKey: "AIzaSyCU9YGCgqgSh5dUAxNnc0vmrJP5GvbPwDU",
  authDomain: "println-it.firebaseapp.com",
  projectId: "println-it",
  storageBucket: "println-it.appspot.com",
  messagingSenderId: "819476371230",
  appId: "1:819476371230:web:7f85d5c674cd48d9255b0f",
  measurementId: "G-NXVLGKE3RX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function validateEmail(email) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
    return (false)
}

export default function Home() {

  
  async function handleNewsletterSubscription(e) {
    e.preventDefault()
    console.log(process.env)
    const email = e.target[0].value 
    const newsletterCol = collection(db, "newsletter")

    if (validateEmail(email)) {
      const q = query(newsletterCol, where("email", "==", email))
      const d = await getDocs(q)
      
      if (d.size == 0) {
        addDoc(newsletterCol, {
          active: true,
          test: true,
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

  return (
    <>
      <Head>
        <title>println</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.layout__herosection}>
        <div className="mb-0 alert alert-primary d-flex justify-content-center">
          Come talk to us on social media!  
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
              <Col xs={6}>
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
