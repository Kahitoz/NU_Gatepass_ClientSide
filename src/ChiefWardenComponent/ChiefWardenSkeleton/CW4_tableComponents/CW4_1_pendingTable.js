import React,{ useState,useEffect } from 'react'
import designs from '../../ChiefWardenStyling/CW4_TableCSS';
import moment from "moment";
import ModalPending from "./Modal/ModalPending";
import ModalReject from "./Modal/ModalRejected";
import ModalAccept from "./Modal/ModalApproved";

 const CW4_1_pendingTable = ({data}) => {
    const [userData, setUserData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [pgNo, setPgNo] = useState(1);
    const [status, setStatus] = useState("Pending");
    const buttonIncluded=['Pending','Approved','Rejected'];
  const [TbData, setTbData] = useState([]);
  useEffect(() => {
    const paginate = (array, page_size, page_number) => {
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    };

    const paginatedData = paginate(data, 5, pgNo);
    setTbData(paginatedData);
  }, [pgNo, data]);

  const handleNextPage = () => {
    setPgNo((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (pgNo > 1) {
      setPgNo((prevPage) => prevPage - 1);
    }
  };
    
    return (
        <div>
        {/* {showModal && <Modal setOpenModal={setShowModal} data={userData} />} */}
        {status === "Pending" && showModal && <ModalPending setOpenModal={setShowModal} data={userData} />}
        {status === "Approved" && showModal && <ModalAccept setOpenModal={setShowModal} data={userData} />}
        {status === "Rejected" && showModal && <ModalReject setOpenModal={setShowModal} data={userData} />}
        <div>
          <div className={`${designs.d1}`}>
            <div className={`${designs.d2}`}>
              <h1 className={`${designs.d5}`}>Name</h1>
              <h1 className={`${designs.d5}`}>Enrollment</h1>
              <h1 className={`${designs.d5}`}>Contact</h1>
              <h1 className={`${designs.d5}`}>Gatepass Type</h1>
              <h1 className={`${designs.d5}`}>Applied Date</h1>
              <h1 className={`${designs.d5}`}>Applied Time</h1>
              <h1 className={`${designs.d5}`}>Requested to</h1>
              <h1 className={`${designs.d5}`}>Status</h1>
              <h1 className={`${designs.d5}`}>Actions</h1>
            </div>
          </div>
  
          <div className={`${designs.d3}`}>
            {TbData.map((item, idx) => (
              <div className={`${designs.d4} hover:bg-row_hover_bg hover:-translate-y-1 hover:duration-75`} key={idx}>
                <h1 className={`${designs.d5} `}>{item.name}</h1>
                <h1 className={`${designs.d5}`}>{item.user_id}</h1>
                <h1 className={`${designs.d5}`}>{item.contact_number}</h1>
                <h1 className={`${designs.d5}`}>{item.gatepass_name}</h1>
                <h1 className={`${designs.d5}`}>
                  {moment(item.from_date).format("YYYY-MM-DD")}
                </h1>
                <h1 className={`${designs.d5}`}>
                  {moment(item.from_time).format("HH:mm:ss")}
                </h1>
                <h1 className={`${designs.d5}`}>{item.Requested_to}</h1>
                <h1 className={`${designs.d5}`}>{item.status}</h1>
                {buttonIncluded.includes(item.status) ? 
                <div className={`${designs.d5}`}>
                  <button
                    id={`button ${idx}`}
                    name={item.request_id}
                    onClick={() => {
                      setShowModal(true);
                      setUserData(
                        data.filter((obj) => {
                          return obj.request_id == item.request_id;
                        })
                      );
                    }}
                    className=" bg-Navbar_bg p-2 text-white hover:border-2"
                  >
                    Open
                  </button>
                </div>
                : <div className={`${designs.d5}`}>N/A</div>} 
          </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
          onClick={handlePreviousPage}
          disabled={pgNo === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
          onClick={handleNextPage}
          disabled={TbData.length < 5}
        >
          Next
        </button>
      </div>
    </div>
    </div>
    );
      
}
export default CW4_1_pendingTable;