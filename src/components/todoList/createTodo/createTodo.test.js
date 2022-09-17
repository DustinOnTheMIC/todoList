import React from "react";
import { shallow } from "enzyme";
import CreateTodo from "./createTodo";

describe("CreateTodo", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CreateTodo />);
    expect(wrapper).toMatchSnapshot();
  });
});
