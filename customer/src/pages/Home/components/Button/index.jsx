import styled from "@emotion/styled";

const Button = styled.button`
  transition: all 0.2s ease;
  margin-top: 32px;
  border-radius: 4px;
  background-color: var(--deep-blue);
  padding: 16px 40px;
  color: var(--white);
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;

  &:hover {
    opacity: 0.8;
  }
`;

export default Button;
