import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SelectedContext from "./SelectedContext";

export default function ReportDetails() {
  const { selected } = useContext(SelectedContext);
  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3100/${selected}/${id}`);
        console.log(res.data); // Log the response data to inspect it
        setBook(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBook();
  }, [selected, id]);

  const HandleType = () => {
    if (!book.image) {
      return null; // or a loading state if desired
    }

    const imagePath = book.image;
    const imageName = imagePath.substring(imagePath.lastIndexOf("/") + 1);
    const fileType = imageName.substring(imageName.lastIndexOf(".") + 1);

    if (fileType === "jpg" || fileType === "png") {
      return (
        <a href={`http://localhost:3100/images/${book.image}`} target="_blank">
          <img
            className=" w-25% h-24"
            src={`http://localhost:3100/images/${book.image}`}
            alt="Person"
          />
        </a>
      );
    } else if (fileType === "pdf" || fileType === "mp4" || fileType === "avi") {
      return (
        <a href={`http://localhost:3100/images/${book.image}`} target="_blank">
          📃
        </a>
      );
    } else {
      return null; // or handle other file types as needed
    }
  };

  const EmployeeDetails = () => {
    if (book.title === "cashregister") {
      return (
        <div>
          <h1 className="text-blue-900 text-2xl font-semibold bg-gray-400 text-left p-1 mb-2 mt-6">
            Employee Details ?
          </h1>
          <table className=" mb-10 w-full text-left border border-black">
            <tbody>
              <tr>
                <td className="p-2 font-semibold">Employee Name:</td>
              </tr>
              <tr className=" border-b border-black grid grid-cols-2">
                <td className="p-2 "> {book.employeename} </td>
              </tr>
              <tr className="grid grid-cols-2">
                <td className="p-2 font-semibold">Employee Role:</td>
              </tr>
              <tr className="grid grid-cols-2">
                <td className="p-2 ">{book.employeerole}</td>
              </tr>

              <tr className="grid grid-cols-2">
                <td className="p-2 font-semibold">Employee Description:</td>
              </tr>
              <tr className="grid grid-cols-2">
                <td className="p-2 ">{book.employeedescription}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div className="mx-5">
      <header className="my-5">
        <h1 className="text-blue-900 text-2xl font-extrabold">
          Report Details
        </h1>
        <hr className="text-blue-600 h-1 m-auto border-2 border-blue-500" />
      </header>
      <br />
      <h1 className="text-blue-900 text-2xl font-semibold bg-gray-400 text-left p-1 mb-2">
        About you
      </h1>

      <div className="grid grid-cols-2 font-semibold text-left mb-10">
        <label>Name: {book.yourname}</label>

        <label>Address: {book.youraddress} </label>

        <label>Phone: {book.yournumber} </label>

        <label>Email: {book.youremail}</label>

        <label>TinNumber: {book.tinnumber} </label>
      </div>

      <h1 className="text-blue-900 text-2xl font-semibold bg-gray-400 text-left p-1 mb-2">
        Details about the Person/Company
      </h1>

      <div>
        <table className="w-full text-left border border-black">
          <tbody>
            <tr>
              <th className="text-gray-800 font-semibold bg-gray-400 border border-black px-1">
                Company/Person
              </th>
            </tr>
            <tr className="grid grid-cols-2 text-left">
              <td className="p-2 font-semibold"> Name:</td>
              <td className="p-2 font-semibold">Address:</td>
            </tr>

            <tr className="grid grid-cols-2 text-left">
              <td className="ml-2">{book.name}</td>
              <td className="ml-2">{book.address}</td>
            </tr>

            <tr className="border-t border-black grid grid-cols-2">
              <td className="p-2 font-semibold">Phone:</td>
              <td className="p-2 font-semibold">Email:</td>
            </tr>
            <tr className="grid grid-cols-2">
              <td className="p-2 ">{book.number}</td>
              <td className="p-2 ">{book.email}</td>
            </tr>
          </tbody>
        </table>
        <EmployeeDetails />
        <h1 className="text-blue-900 text-2xl font-semibold bg-gray-400 text-left p-1 mb-2 mt-6">
          What Transpired ?
        </h1>

        <table className=" mb-10 w-full text-left border border-black">
          <tbody>
            <tr className="grid grid-cols-2">
              <td className="p-2 font-semibold">
                Description of the incident:
              </td>
            </tr>

            <tr className=" border-b border-black grid grid-cols-2">
              <td className="p-2 "> {book.comment} </td>
            </tr>
            <tr className="grid grid-cols-2">
              <td className="p-2 font-semibold">Date of the incident:</td>
            </tr>
            <tr className="grid grid-cols-2">
              <td className="p-2 ">{book.date}</td>
            </tr>

            <tr>
              <td></td>
            </tr>
            <tr className="border-t border-black">
              <td className="p-2 font-semibold">Proof :</td>
            </tr>
            <tr>
              <td className="p-2">
                <HandleType />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
