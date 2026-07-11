import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import SearchBox from "./components/SearchBox";

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

test("navigates to a search route when the form is submitted", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <SearchBox />
              <LocationDisplay />
            </>
          }
        />
      </Routes>
    </MemoryRouter>,
  );

  await user.type(screen.getByLabelText(/search/i), "earbuds");
  await user.click(screen.getByRole("button", { name: /search/i }));

  expect(screen.getByTestId("location")).toHaveTextContent("/search/earbuds");
});
