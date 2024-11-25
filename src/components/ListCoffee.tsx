import { ChangeEvent, useEffect, useMemo, useState } from "react";

interface ICoffee {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  image: string;
}

interface Props {
  search: string;
}

const blackListCoffees = ["Black Coffee", "Svart Te", "Frapino Caramel"];

const ListCoffee = ({ search }: Props) => {
  const [selectedCoffees, setSelectedCoffees] = useState<ICoffee[]>([]);
  const [coffees, setCoffees] = useState<ICoffee[]>([]);

  const sortedSelectedCoffees = useMemo(() => {
    const clonedSelectedCoffees = [...selectedCoffees];
    return clonedSelectedCoffees.sort((a, b) => a.title.localeCompare(b.title));
  }, [selectedCoffees]);

  const filteredCoffees = useMemo(() => {
    return coffees.filter((coffee) => {
      const isContainSearchKeyword = search
        ? coffee.title.includes(search)
        : true;
      const isInBlackListCoffees = blackListCoffees.includes(coffee.title);
      return !isInBlackListCoffees && isContainSearchKeyword;
    });
  }, [search, coffees]);

  const handleSelectCoffee =
    (coffee: ICoffee) => (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      if (checked) {
        setSelectedCoffees([...selectedCoffees, coffee]);
      } else {
        setSelectedCoffees(
          selectedCoffees.filter((item) => item.id !== coffee.id)
        );
      }
    };

  const getData = async () => {
    try {
      const response = await fetch("https://api.sampleapis.com/coffee/hot");
      const data = await response.json();
      if (data?.error) throw data;
      if (data?.length) setCoffees(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="fixed bottom-2 right-2 bg-gray-200 p-4">
        <p className="font-medium">Giỏ hàng:</p>
        <br />
        {sortedSelectedCoffees.map((item, index) => (
          <span>
            {index !== 0 && `, `}
            {item.title}
          </span>
        ))}
      </div>
      <ul>
        {filteredCoffees.map((coffee, index) => {
          return (
            <li
              key={coffee.id}
              className={`${
                index === 0 ? "bg-violet-400" : "bg-red-300"
              } px-4 py-2 my-2 text-[14px] text-black flex flex-col items-center`}
            >
              <input
                id={`coffee-input-${coffee.id}`}
                type="checkbox"
                className="w-4 h-4 ml-4"
                onChange={handleSelectCoffee(coffee)}
              />
              <label htmlFor={`coffee-input-${coffee.id}`}>
                {coffee.title}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ListCoffee;
