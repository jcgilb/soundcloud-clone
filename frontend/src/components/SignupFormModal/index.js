import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button style={{ background: "#FFB703", border: "1px solid var(--selective-yellow)", padding: "6px", borderRadius: "3px", color: "white", fontSize: "14.5px" }} onClick={() => setShowModal(true)}>Create an account</button>
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