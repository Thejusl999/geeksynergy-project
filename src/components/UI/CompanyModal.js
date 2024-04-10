import React from "react";
import ReactDOM from "react-dom";

const CompanyModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
          <div className="modal d-block mt-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Company Details</h5>
                <button
                  type="button"
                  className="btn-close" onClick={props.onClose}
                ></button>
              </div>
              <div className="modal-body">
                <p>Company name: Geeksynergy Technologies Pvt. Ltd.</p>
                <p>Address: Sanjaynagar, Bengaluru-56</p>
                <p>Phone: XXXXXXXXX9</p>
                <span>
                  Email:{" "}
                  <a
                    href="mailto:XXXXXX@gmail.com"
                    className="text-decoration-none text-primary d-inline"
                  >
                    XXXXXX@gmail.com
                  </a>
                </span>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary" onClick={props.onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>,
          document.getElementById('overlay')
        )}
    </>
  );
};
export default CompanyModal;