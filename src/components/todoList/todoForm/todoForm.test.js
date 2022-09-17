import React from "react";
import { shallow } from "enzyme";
import TodoForm from "./todoForm";

describe("TodoForm", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TodoForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
