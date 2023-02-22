import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import { TextInput } from '.';

describe("<TextInput />", () => {
  it("should have a value in searchValue", () => {
    const fn = jest.fn();
    render(<TextInput onChange={fn} value={"Test"} />);

    const input = screen.getByPlaceholderText(/buscar/i);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("Test");
  });

  it("should call handleChange on key pressed", () => {
    const fn = jest.fn();
    render(<TextInput onChange={fn} searchValue={"Test"} />);

    const input = screen.getByPlaceholderText(/buscar/i);

    const value = "some value";
    userEvent.type(input, value);

    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it("should match snapshot", () => {
    const fn = jest.fn();
    const { container } = render(<TextInput onChange={fn} searchValue={"Test"} />);
    expect(container).toMatchSnapshot();
  });
})