'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext'
import { loginUser, logoutUser, getUserProfile, setAccessToken } from '../lib/api'
import type { LoginData, AuthResponse, UserProfile } from '../lib/api'

export function useLogin() {
  const { setUser, setAccessToken: setContextAccessToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: LoginData): Promise<AuthResponse> => loginUser(data),
    onSuccess: (data) => {
      setUser(data.user)
      setContextAccessToken(data.accessToken)
      setAccessToken(data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })
}

export function useLogout() {
  const { logout } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout()
      setAccessToken(null)
      queryClient.clear()
    },
    onError: (error) => {
      logout()
      setAccessToken(null)
      queryClient.clear()
      console.error('Logout failed:', error)
    },
  })
}

export function useUserProfile() {
  const { isAuthenticated } = useAuth()

  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: (): Promise<UserProfile> => getUserProfile(),
    enabled: isAuthenticated,
    retry: false,
  })
}
