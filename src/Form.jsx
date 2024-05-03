import React, { useReducer, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Checkbox,
  Button,
  Table,
  Thead,
  Tbody,
  TableContainer,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const initialState = {
  name: "",
  gender: "",
  role: "",
  married: false,
  users: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_NAME":
      return {
      ...state,
        name: action.payload,
      };
    case "UPDATE_GENDER":
      return {
      ...state,
        gender: action.payload,
      };
    case "UPDATE_ROLE":
      return {
      ...state,
        role: action.payload,
      };
    case "UPDATE_MARRIED":
      return {
      ...state,
        married: action.payload,
      };
    case "ADD_USER":
      return {
      ...state,
        users: [...state.users, { name: state.name, gender: state.gender, role: state.role, married: state.married }],
        name: "",
        gender: "",
        role: "",
        married: false,
      };
    default:
      return state;
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_USER" });
  };

  return (
    <div className="outer">
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Name"
              value={state.name}
              onChange={(e) => dispatch({ type: "UPDATE_NAME", payload: e.target.value })}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
            <FormLabel>Gender</FormLabel>
            <Select
              value={state.gender}
              onChange={(e) => dispatch({ type: "UPDATE_GENDER", payload: e.target.value })}
            >
              <option>select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Prefer Not to Say</option>
            </Select>
            <FormLabel>Role</FormLabel>
            <Select
              value={state.role}
              onChange={(e) => dispatch({ type: "UPDATE_ROLE", payload: e.target.value })}
            >
              <option>select</option>
              <option>FrontEnd Developer</option>
              <option>Backend Developer</option>
              <option>FullStack Developer</option>
            </Select>
            <Checkbox
              value={state.married}
              onChange={(e) => dispatch({ type: "UPDATE_MARRIED", payload: e.target.checked })}
            >
              Married
            </Checkbox>
            <Button colorScheme="teal" size="md" type="submit">
              Button
            </Button>
          </FormControl>
        </form>
      </div>
      <div>
        {state.users.length > 0? (
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>S.No</Th>
                  <Th>User</Th>
                  <Th>Gender</Th>
                  <Th>Role</Th>
                  <Th>Married</Th>
                </Tr>
              </Thead>
              <Tbody>
                {state.users.map((user, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.gender}</Td>
                    <Td>{user.role}</Td>
                    <Td>{user.married? "Married" : "Single"}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          ) : (
            <div>
              <h1>No users found</h1>
            </div>
          )}
      </div>
    </div>
  );
};

export default Form;