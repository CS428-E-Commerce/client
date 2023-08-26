import styled from "@emotion/styled";

import { formatPixelValue } from "services/common_service";

const Button = styled.button`
  transition: all 0.2s ease;
  margin-top: 32px;
  border-radius: 4px;
  background-color: ${({ outline }) =>
    outline ? "transparent" : "var(--deep-blue)"};
  padding: 16px 40px;
  color: ${({ outline }) => (outline ? "var(--deep-blue)" : "var(--white)")};
  border: ${({ outline }) => outline && "1px solid var(--deep-blue)"};
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  width: ${({ width }) => width && formatPixelValue(width)};

  &:hover {
    opacity: 0.8;
  }
`;

export default Button;
