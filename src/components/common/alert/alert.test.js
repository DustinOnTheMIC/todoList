import React from "react";
import { shallow } from "enzyme";
import Alert from "./alert";

describe("Alert", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Alert />);
    expect(wrapper).toMatchSnapshot();
  });
});
