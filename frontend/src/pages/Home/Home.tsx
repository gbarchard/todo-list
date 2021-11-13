import React from 'react'
import { useAddItemMutation, useDeleteItemMutation, useItemsQuery } from '../../generated/graphql'

export function Home() {
  const {data} = useItemsQuery()
  const [removeItem] = useDeleteItemMutation({ refetchQueries: ['Items'] })

  const remove = React.useCallback((id: string) => {
    removeItem({ variables: { id }})
  }, [removeItem])

  return (
    <div className="container flex flex-col justify-center items-center">
      <div className="text-4xl m-4">Home</div>
      <div className="w-full max-w-xs flex flex-col items-center justify-center">
        <ItemForm />
      </div>
      <div>
        {data?.items.map(item => (
          <div className="cursor-pointer" onClick={() => remove(item.id)}>{item.name}</div>
        ))}
      </div>
    </div>
  )
}

function ItemForm() {
  const [name, setName] = React.useState('')
  const [addItem] = useAddItemMutation({
    refetchQueries: ['Items']
  })

  const add = React.useCallback(() => {
    if (name) addItem({ variables: { name }})
    setName('')
  }, [addItem, name])

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-col items-center">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Item Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          type="text"
          placeholder="Insert Name Here..."
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="flex items-center justify-center">
        {name && (
          <button onClick={add} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Submit
          </button>
        )}
      </div>
    </div>
  )
}