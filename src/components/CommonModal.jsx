'use client'
import React from 'react'
import { Modal } from 'react-bootstrap'
import close from '@/images/close.svg'
import Image from 'next/image'

export const CommonModal = ({ show, handleClose, children }) => {
  return (
    <Modal show={show} onHide={handleClose} centered className='common-modal' data-lenis-prevent>
      
      <Modal.Body data-lenis-prevent>
        <div className='common-modal-content'>
            <button className='close-btn' onClick={handleClose}>
                <Image src={close} alt='close' />
            </button>
            {children}
        </div>
      </Modal.Body>
    </Modal>
  )
}
