import { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

import api from '../../services/api';
import { FoodData } from '../../types'

export function Dashboard() {

  const [foods, setFoods] = useState<FoodData[]>([])
  const [editingFood, setEditingFood] = useState<null | FoodData>(null)

  const [isEditFoodModalOpen, setIsEditFoodModalOpen] = useState(false)
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false)

  function closeAddFoodModal() {
    setIsAddFoodModalOpen(false)
  }

  function closeEditFoodModal() {
    setIsEditFoodModalOpen(false)
  }


  async function handleAddFood(food: FoodData) {
    try {
      const response = await api.post<FoodData>('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err);
    }

  }

  async function handleUpdateFood(food: FoodData) {
    try {

      if (!editingFood) {
        return
      }

      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated)

    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(foodId: number) {
    await api.delete(`/foods/${foodId}`);

    const foodsFiltered = foods.filter(food => food.id !== foodId);

    setFoods(foodsFiltered)
  }

  function handleStartEditingFood(food: FoodData) {
    setEditingFood(food)
    setIsEditFoodModalOpen(true)
  }

  useEffect(() => {
    api.get<FoodData[]>('/foods')
      .then((response) => {
        setFoods(response.data)
      })
  }, [])

  return (
    <>
      <Header openModal={() => setIsAddFoodModalOpen(true)} />
      <ModalAddFood
        isOpen={isAddFoodModalOpen}
        closeModal={closeAddFoodModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={isEditFoodModalOpen}
        closeModal={closeEditFoodModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleStartEditingFood}
            />
          ))}
      </FoodsContainer>
    </>
  )

}