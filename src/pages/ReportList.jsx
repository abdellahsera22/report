import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SelectedContext from "./SelectedContext";

function ReportList() {
  const [books, setBooks] = useState([]);
  const { selected, setSelected } = useContext(SelectedContext); // Destructure selected and setSelected from the context
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(`http://localhost:3100/${selected}`);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, [selected]);

  const handleDelete = async (id, e) => {
    try {
      e.stopPropagation();
      await axios.delete(`http://localhost:3100/${selected}/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="ml-0 pt-16 ">
      <div className="">
        <h1 className="flex justify-center ml-80 fixed top-0 left-96 text-gray-500 font-extrabold text-xl mt-5">
          Reports
        </h1>
        <hr className="ml-96 mr-24 mb-7" />
        <div className="flex justify-end mr-80 ">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="border-none text-white bg-green-500 p-2 rounded-md hover:bg-green-200  hover:text-black"
          >
            Logout
          </button>
        </div>

        {Array.isArray(books) &&
          books.map((book) => {
            if (book.title === selected) {
              return (
                <div className=" md:mr-60">
                  <div
                    key={book.id}
                    className=" m-4  mx-20 h-20 bg-gray-300 rounded-md p-2 hover:shadow-2xl text-left "
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link to={`/ReportList/${book.id}`} className="">
                      <p>{book.title}</p>
                    </Link>
                    {isHovered && (
                      <div className="flex justify-end h-7  mr-24 ">
                        <button
                          className=" bg-blue-700 hover:bg-blue-400  w-14 rounded-md text-white hover:text-black "
                          onClick={(e) => {
                            handleDelete(book.id, e);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}

export default ReportList;
