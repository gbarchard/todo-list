import React from 'react'

export function Home(props: {}) {
  return (
    <div className="container flex flex-col justify-center items-center">
      <div className="text-4xl m-4">Home</div>
      <div className="w-full max-w-xs flex flex-col items-center justify-center">
        <ItemForm />
      </div>
    </div>
  )
}

function ItemForm() {
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-col items-center">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Item Name
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Insert Name Here..." />
      </div>
      <div className="flex items-center justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Submit
        </button>
      </div>
    </form>
  )
}