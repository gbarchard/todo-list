import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export function useGoToDecks() {
  const navigate = useNavigate()
  return useCallback(() => navigate('/app/decks'), [navigate])
}
