import { render, screen } from '@testing-library/react';
import { PostCard } from '.';
import { postCardMock } from './mock';

const props = postCardMock;

describe('<PostCard />', () => {
  it('should be rendered correctly', () => {
    render(<PostCard post={props} />);

    // Se a imagem com alt="title 1" está presente no componente
    expect(screen.getByRole("img", { name: "title 1" }))
      .toBeInTheDocument();
    
    // Se a imagem com alt contendo "title 1" possui src igual à string passada
    expect(screen.getByAltText(/title 1/i))
      .toHaveAttribute("src", "img/img.png");

    // Se o src da imagem possui o mesmo que foi passado nas props
    expect(screen.getByRole("img", { name: "title 1" }))
      .toHaveAttribute("src", props.cover);

    // Se há um heading cujo texto CORRESPONDE à regex passada 
    expect(screen.getByRole("heading", { name: /title 1/i }))
      .toBeInTheDocument();

    // Se há um elemento cujo texto é "body 1"
    expect(screen.getByText("body 1")).toBeInTheDocument();
  });

  it("should match the snapshot", () => {
    const { container } = render(<PostCard post={props} />)
    expect(container.firstChild).toMatchSnapshot();
  })
});