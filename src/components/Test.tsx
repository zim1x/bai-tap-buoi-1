import { ChangeEvent, useEffect, useState } from "react";
import debounce from "lodash/debounce";

import ListCoffee from "./ListCoffee";

function Test() {
  const [search, setSearch] = useState("");

  const handleSearchChange = debounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    300
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      alert("Chúc mừng bạn trúng thưởng iPhone 17");
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <input
        placeholder="Search here"
        type="text"
        onChange={handleSearchChange}
        className="mb-4 border-red-500 border"
      />
      <ListCoffee search={search} />
    </>
  );
}

export default Test;
