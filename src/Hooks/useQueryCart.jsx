import { useQuery } from '@tanstack/react-query';
export default function useQueryCart(key,fn) {
  return useQuery({queryKey:[key],queryFn:fn})
}
