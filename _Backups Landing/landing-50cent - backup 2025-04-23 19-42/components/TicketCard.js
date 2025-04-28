// components/TicketCard.js
'use client'

export default function TicketCard({ type, price, link }) {
  return (
    <div className="flex flex-col justify-between bg-white rounded-lg shadow-lg p-6 w-[300px] h-[400px]">
      {/* Заголовок и цена */}
      <div>
        <h3 className="text-2xl font-semibold mb-2">{type}</h3>
        <p className="text-xl text-gray-800">{price}</p>
      </div>
      {/* Кнопка */}
      <a href={link} className="mt-auto">
        <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded">
          Купить
        </button>
      </a>
    </div>
  )
}
