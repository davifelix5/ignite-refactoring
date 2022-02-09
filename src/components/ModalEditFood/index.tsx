import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import Input from '../Input';
import { FoodData } from '../../types';
import { FormHandles } from '@unform/core';

interface ModalEditFoodProps {
  isOpen: boolean
  closeModal: () => void
  handleUpdateFood: (food: FoodData) => Promise<void>
  editingFood: null | FoodData
}

export function ModalEditFood({ isOpen, closeModal, editingFood, handleUpdateFood }: ModalEditFoodProps) {
  const formRef = useRef<null | FormHandles>(null)

  async function handleSubmit(data: FoodData) {
    await handleUpdateFood(data)
    closeModal()
  }

  if (!editingFood) {
    return null
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}
