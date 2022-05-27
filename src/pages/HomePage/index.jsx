import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import Main from '../../components/Main/Main';
import Modal from '../../components/Modal/Modal';
import OrderDetails from '../../components/OrderDetails/OrderDetails';

function App() {
  const { closeModalAction } = useActions();
  const { error } = useSelector((store) => store.ingredientsState);
  const { modalIsOpen, modalMode } = useSelector((store) => store.modalState);
  const { orderNumber } = useSelector((store) => store.orderState);
  return (
    <>
      <div className="App">
        {error ? (
          <div className="error-App">
            <p className="text text_type_main-large">
              Произошла ошибка, при получении данных
            </p>
          </div>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <Main />
          </DndProvider>
        )}
      </div>
      <Modal
        show={modalIsOpen && modalMode === 'orderDetails'}
        onClose={() => closeModalAction()}
      >
        <OrderDetails item={orderNumber} />
      </Modal>
    </>
  );
}

export default App;
