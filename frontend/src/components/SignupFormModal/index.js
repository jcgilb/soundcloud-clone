// frontend/src/components/SignupFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import "./SignupForm.css"

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button style={{ background: "#F26F23", height: "30", border: "none", padding: "6px", borderRadius: "3px", color: "white", fontSize: "14px" }} onClick={() => setShowModal(true)}>Create an account</button>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <SignupForm />
                    </Modal>
                )
            }
        </>
    );
}

export default SignupFormModal;