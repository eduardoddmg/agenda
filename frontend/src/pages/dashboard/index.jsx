import { useState, useContext, useEffect } from "react";
import { userContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { API_URI } from "../../util";
import axios from "axios";
import { BiPencil } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import { Layout, Modal, Table } from "../../components";

import * as S from "./styled.js";

import { Button, Input, useDisclosure, Tr, Td } from "@chakra-ui/react";

const FormModal = ({ isOpen, onClose, typeForm, defaultForm }) => {
  const { token, dispatch, getContact } = useContext(userContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    data.idUser = token;
    data._id = defaultForm._id;
    console.log(token);
    if (typeForm) {
      const resp = await axios.put(
        `${API_URI}/api/contact/updateContact`,
        data
      );
      console.log(resp);
    } else {
      const resp = await axios.post(
        `${API_URI}/api/contact/createContact`,
        data
      );
      console.log(resp);
    }
    getContact(token, dispatch);
    setShowForm(false);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <S.Form noBorder w="100%" onSubmit={handleSubmit(onSubmit)}>
        <h1>Adicionar contato</h1>
        <Input
          type="text"
          placeholder="name"
          {...register("name")}
          defaultValue={defaultForm.name}
        />
        <Input
          type="number"
          placeholder="phoneNumber"
          {...register("phoneNumber")}
          defaultValue={defaultForm.phoneNumber}
        />
        <Input
          type="email"
          placeholder="email"
          {...register("email")}
          defaultValue={defaultForm.email}
        />
        <Button colorScheme="blue" type="submit">
          submit
        </Button>
      </S.Form>
    </Modal>
  );
};

export function Dashboard() {
  const defaultFormInitialValue = { name: "", phoneNumber: "", email: "" };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loadingState, setLoadingState] = useState(true);
  const [typeForm, setTypeForm] = useState(0);
  const [defaultForm, setDefaultForm] = useState(defaultFormInitialValue);
  const { username, token, contacts, dispatch, firstLogin, getContact } =
    useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    firstLogin();
    setLoadingState(false);
    !token && navigate("/");
  }, []);

  const createContact = () => {
    onOpen();
    setTypeForm(0);
    setDefaultForm(defaultFormInitialValue);
  };

  const editContact = (data) => {
    onOpen();
    setTypeForm(1);
    setDefaultForm(data);
  };

  const deleteContact = async (data) => {
    const resp = await axios.delete(
      `${API_URI}/api/contact/deleteContact?idContact=${data._id}`
    );
    getContact(token, dispatch);
  };

  return (
    <Layout>
      {loadingState ? (
        <h1> carregando... </h1>
      ) : (
        <S.Container>
          <h1>Seja bem-vindo, <b>{username}</b></h1>
          <Button onClick={createContact} colorScheme="blue" mb="2em">
            criar
          </Button>
          <Table header={["nome", "telefone", "email"]}>
            {contacts &&
              contacts.map((contact, index) => {
                return (
                  <Tr key={index}>
                    <Td>{contact.name}</Td>
                    <Td>{contact.phoneNumber}</Td>
                    <Td>{contact.email}</Td>
                    <Td>
                      <S.Button
                        color="orangered"
                        onClick={() => editContact(contact)}
                      >
                        <BiPencil />
                      </S.Button>
                    </Td>
                    <Td>
                      <S.Button
                        color="red"
                        onClick={() => deleteContact(contact)}
                      >
                        <BsFillTrashFill />
                      </S.Button>
                    </Td>
                  </Tr>
                );
              })}
          </Table>
          {open && (
            <FormModal
              isOpen={isOpen}
              onClose={onClose}
              typeForm={typeForm}
              defaultForm={defaultForm}
            />
          )}
        </S.Container>
      )}
    </Layout>
  );
}
