import React from 'react';

const ConfirmationModal = ({ title, message, handleCancel, successAction, modalData }) => {
    return (
        <div>

            <input type="checkbox" id="confirmationModal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label htmlFor="confirmationModal" className="btn btn-error" onClick={() => successAction(modalData)}>Delete</label>
                        <button className='btn btn-ghost'
                            onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;