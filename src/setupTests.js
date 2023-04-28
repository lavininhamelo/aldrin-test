// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { getBoards, getCoinInfo } from "./api";

import { render } from "@testing-library/react";
import { CoinProvider } from "./contexts/CoinsContext";

export const customRender = (ui, options, { mockGetBoards = getBoards, mockGetCoinInfo = getCoinInfo }) =>
  render(
    <MemoryRouter>
      <CoinProvider getBoards={mockGetBoards} getCoinInfo={mockGetCoinInfo}>
        {ui}
      </CoinProvider>
    </MemoryRouter>,
    { ...options }
  );
