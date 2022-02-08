import { FiEdit3, FiTrash } from 'react-icons/fi';

// @ts-ignore
import { Container } from './styles.ts'; 
import api from '../../services/api';
import { useState } from 'react';

interface Food {
  id: number
  image: string
  name: string
  price: number
  available: boolean
  description: string
}

interface FoodProps {
  food: Food
  handleDelete: (fooId: number) => void
  handleEditFood: (food: Food) => void
}

export function Food({ food, handleDelete, handleEditFood }: FoodProps) {
  const [isAvailable, setIsAvailable] = useState(food.available)

  async function toggleAvailable() {

    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    })

    setIsAvailable(isAvailable => !isAvailable)
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => handleEditFood(food)}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  )
}
