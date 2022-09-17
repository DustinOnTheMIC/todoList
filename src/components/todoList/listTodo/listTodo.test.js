import React from "react";
import { shallow } from "enzyme";
import ListTodo from "./listTodo";

describe("ListTodo", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ListTodo />);
    expect(wrapper).toMatchSnapshot();
  });
});
