import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import Input from '../Input';
import { FoodData } from '../../types';
import { FormHandles } from '@unform/core';

interface ModalAddFoodProps {
  isOpen: boolean
  closeModal: () => void
  handleAddFood: (food: FoodData) => Promise<void>
}

export function ModalAddFood({ isOpen, closeModal, handleAddFood }: ModalAddFoodProps) {

  const formRef = useRef<null | FormHandles>(null)

  async function handleSubmit(data: FoodData) {
    await handleAddFood(data)
    closeModal()
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}
