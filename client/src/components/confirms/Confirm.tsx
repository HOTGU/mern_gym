import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";

import Button from "../Button";
import { modalContainerVariants, modalItemVariants } from "../../libs/framer";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  onAction: () => void;
  disabled?: boolean;
  text: string;
}

const Confirm = ({
  isOpen,
  onClose,
  label,
  onAction,
  disabled,
  text,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen ? ( // modal container
        <motion.div
          variants={modalContainerVariants}
          initial={modalContainerVariants.start}
          animate={modalContainerVariants.end}
          exit={modalContainerVariants.exit}
          className="absolute top-0 left-0 w-screen h-screen z-10 bg-black/50 flex items-center justify-center overflow-hidden"
        >
          {/* modal body */}
          <motion.div
            variants={modalItemVariants}
            initial={modalItemVariants.start}
            animate={modalItemVariants.end}
            exit={modalItemVariants.exit}
            className="h-full sm:h-2/3 w-full sm:w-2/3 lg:w-1/2 bg-white rounded flex flex-col z-20"
          >
            {/* modal head */}
            <div className="relative h-16 flex justify-center items-center">
              <div className="text-center font-bold text-2xl">{label}</div>
              <div
                onClick={onClose}
                className="absolute h-full right-0 w-16 flex items-center justify-center"
              >
                <AiOutlineClose size={24} />
              </div>
            </div>
            {/* modal body */}
            <div className="flex-1 px-6">{text}</div>
            {/* modal foot */}
            <div className="px-6 py-4 flex gap-6">
              <Button
                label="아니오"
                onAction={onClose}
                theme="secondary"
                disabled={disabled}
                small
              />
              <Button
                label="네"
                onAction={onAction}
                small
                disabled={disabled}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Confirm;
