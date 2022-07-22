import React, { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Modal, Container, Form, Button, Alert } from "react-bootstrap";
import addToMailchimp from "gatsby-plugin-mailchimp";
import Seo from "../components/seo";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto";

const Wrapper = styled.div`
  font-family: "Roboto", sans-serif;
`;

const StyledModal = styled(Modal)`
  .modal-content {
    background: #e5e5e5;
  }
  label {
    letter-spacing: 0.2em;
    font-size: 0.8rem;
  }
`;

const Footer = styled.footer`
  background: #000;
`;

const Homepage = () => {
  const [show, setShow] = useState(false);
  const [formMsg, setFormMsg] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const { email, phone, name } = formValues;
    addToMailchimp(email, {
      FNAME: name,
      PHONE: phone,
    }).then(data => {
      setFormMsg(data);
    });
  };

  return (
    <Wrapper>
      <Seo title="AG Air life" />
      <div className="text-center">
        <StaticImage
          src="../images/altaplata-3.jpg"
          alt="alta plata"
          layout="fullWidth"
        />
      </div>
      <Footer className="py-5">
        <Container className="text-center">
          <p className="text-white mb-4">¿Deseas recibir más información?</p>
          <Button
            variant="outline-light"
            onClick={() => {
              setShow(true);
            }}
          >
            Déjanos tus datos
          </Button>
        </Container>
      </Footer>
      <StyledModal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        size="lg"
        centered
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Container>
            <StaticImage
              src="../images/logo.png"
              alt="alta plata"
              width={100}
            />
            <h2 className="h4">
              {formMsg?.result === "success"
                ? "¡Gracias!"
                : "Déjanos tus datos para recibir más información"}
            </h2>
            {formMsg?.result !== "success" && (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label className="text-uppercase">Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="Nombre"
                    value={formValues.name}
                    onChange={e => {
                      setFormValues(prevValue => ({
                        ...prevValue,
                        name: e.target.value,
                      }));
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="phone">
                  <Form.Label className="text-uppercase">Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="Teléfono"
                    value={formValues.phone}
                    onChange={e => {
                      setFormValues(prevValue => ({
                        ...prevValue,
                        phone: e.target.value,
                      }));
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label className="text-uppercase">Correo</Form.Label>
                  <Form.Control
                    type="email"
                    name="Correo"
                    value={formValues.email}
                    onChange={e => {
                      setFormValues(prevValue => ({
                        ...prevValue,
                        email: e.target.value,
                      }));
                    }}
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="border-0"
                  style={{ background: "#000" }}
                >
                  Enviar
                </Button>
                {formMsg?.result === "error" && (
                  <Alert variant="danger" className="mt-3">
                    {formMsg.msg}
                  </Alert>
                )}
              </Form>
            )}
          </Container>
        </Modal.Body>
      </StyledModal>
    </Wrapper>
  );
};

export default Homepage;
