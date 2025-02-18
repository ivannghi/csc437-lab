import { useRef } from "react";

function Modal(props) {
    const modalRef = useRef(null);

    function handleClickOutside(event) {
        if(modalRef.current && ! modalRef.current.contains(event.target)){
            handleClose();
        }
    }

    function handleClose() {
        props.onCloseRequested();
    }

    if (props.isOpen){
        return (
            <div onClick={handleClickOutside} className="bg-[rgba(125,139,161,0.5)] fixed h-screen w-screen inset-0 flex justify-center items-center">
                <div ref={modalRef} className="bg-white p-6 rounded-md flex flex-col gap-4">
                    <header className="flex flex-row justify-between">
                        <h1 className="justify-start font-semibold ">{props.headerLabel}</h1>
                        <button aria-label="Close" onClick={handleClose} >X</button>
                    </header>
                    <p>{props.children}</p>
                </div>
            </div>
        );
    };
    return null;
    
}

export default Modal;