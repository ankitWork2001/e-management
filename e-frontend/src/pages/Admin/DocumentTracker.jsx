import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import API from "../../api/Api"; // Axios instance

function DocumentTracker() {
  const [search, setSearch] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  // Fetch documents from backend
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await API.get("/documents/");
        // Map backend response to frontend-friendly format
        const data = response.data.map((doc, index) => ({
          id: doc._id || index + 1, // Use _id or index as identifier
          resume: doc.resume,
          idCard: doc.idCard,
          offerLetter: doc.offerLetter,
          certificate: doc.certificate,
        }));
        setDocuments(data);
        setSearchResult(data);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      }
    };
    fetchDocuments();
  }, []);

  const cancelSearch = () => {
    setSearch("");
    setSearchResult(documents);
    setToggleSearch(false);
  };

  const filterDocuments = () => {
    const filtered = documents.filter((doc) =>
      doc.id.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filtered);
  };

  return (
    <div className="mt-10 px-5">
      {/* Search */}
      <div className="flex gap-5">
        <div className="flex gap-3 md:w-[60%]">
          <div className="w-full flex items-center rounded-lg gap-2 bg-black py-2 px-2">
            <IoIosSearch className="text-[#A0AEC0] text-lg" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none text-lg w-full bg-black text-white"
            />
          </div>
          <div className="bg-[#0075FF] px-3 flex items-center py-2 rounded-lg text-xl hover:cursor-pointer">
            {toggleSearch ? (
              <RxCross2 onClick={cancelSearch} />
            ) : (
              <IoSearchSharp
                onClick={() => {
                  setToggleSearch(true);
                  filterDocuments();
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Document Table */}
      <div className="mt-10 overflow-x-auto scrollbar h-[55vh]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="px-4 py-3">Document ID</th>
              <th className="px-4 py-3">Resume</th>
              <th className="px-4 py-3">ID Card</th>
              <th className="px-4 py-3">Offer Letter</th>
              <th className="px-4 py-3">Certificate</th>
            </tr>
          </thead>
          <tbody>
            {searchResult.map((doc, index) => (
              <tr key={index} className="border-b border-gray-700 text-[#D8D8D8]">
                <td className="px-4 py-3">{doc.id}</td>
                <td
                  className={`px-4 py-3 ${
                    doc.resume === "Uploaded" ? "text-[#21AF5A]" : "text-[#F5A130]"
                  }`}
                >
                  {doc.resume || "Pending"}
                </td>
                <td
                  className={`px-4 py-3 ${
                    doc.idCard === "Uploaded" ? "text-[#21AF5A]" : "text-[#F5A130]"
                  }`}
                >
                  {doc.idCard || "Pending"}
                </td>
                <td
                  className={`px-4 py-3 ${
                    doc.offerLetter === "Uploaded" ? "text-[#21AF5A]" : "text-[#F5A130]"
                  }`}
                >
                  {doc.offerLetter || "Pending"}
                </td>
                <td
                  className={`px-4 py-3 ${
                    doc.certificate === "Uploaded" ? "text-[#21AF5A]" : "text-[#F5A130]"
                  }`}
                >
                  {doc.certificate || "Pending"}
                </td>
              </tr>
            ))}
            {searchResult.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-5 text-center text-gray-400">
                  No documents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DocumentTracker;
