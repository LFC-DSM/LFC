import { useState } from 'react'
import { useItemsControllerFindAll, useItemsControllerCreate } from './api/backend'

function App() {
  const [name, setName] = useState('')

  const { data: items, isLoading, refetch } = useItemsControllerFindAll()

  const { mutate: createItem, isPending } = useItemsControllerCreate({
    mutation: {
      onSuccess: () => {
        setName('')
        refetch()
      },
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) createItem({ data: { name } })
  }

  return (
    <main
      style={{ fontFamily: 'sans-serif', maxWidth: 480, margin: '2rem auto', padding: '0 1rem' }}
    >
      <h1>Items</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          style={{ flex: 1, padding: '0.4rem 0.6rem' }}
        />
        <button type="submit" disabled={isPending}>
          {isPending ? 'Adding…' : 'Add'}
        </button>
      </form>

      {isLoading && <p>Loading…</p>}

      <ul>
        {items?.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>
            {item.description && <span> — {item.description}</span>}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
