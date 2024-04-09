import React from "react";
import Modal from "../Modals/Modal";
import ModalContent from "../Modals/ModalContent";
import ModalToggler from "../Modals/ModalToggler";
import { HiQuestionMarkCircle } from "react-icons/hi";
export default function PermissionModal(props) {
  return (
    <div className="absolute bottom-5 right-5">
      <Modal>
        <ModalToggler>
          <div>
            <HiQuestionMarkCircle size={50} />
          </div>
        </ModalToggler>
        <ModalContent
          title="Permission List"
          description={`The list of permissions for the ${props.module} module.`}
          onExit={() => console.log("exit")}
        >
          <div>
            <ul className="justify-start">
              <li>
                <span className="inline-block">
                  <p className="font-semibold inline-block">Parents:</p>
                  {props.parents}
                </span>
              </li>
              <li>
                <span className="inline-block">
                  <p className="font-semibold inline-block">Children: </p>
                  {props.children}
                </span>
              </li>
              <li>
                <span className="inline-block">
                  <p className="font-semibold inline-block">Guest: </p>
                  {props.guest}
                </span>
              </li>
              <li>
                <span className="inline-block">
                  <p className="font-semibold inline-block">Parents:</p>
                  {props.stranger}
                </span>
              </li>
            </ul>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
