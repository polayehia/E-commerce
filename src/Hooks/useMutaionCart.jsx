import { useMutation, useQueryClient } from "@tanstack/react-query";
import deletewish from '../APIS/wishlist'
import { cleardata } from "../APIS/CartApis";

export default function useMutaionCart(fn) {
   const queryClient=useQueryClient()
    return useMutation({mutationFn:fn,
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ['getcartapi'] })
            queryClient.invalidateQueries({ queryKey: ['getwish'] })

              if (fn==cleardata) {
                queryClient.setQueriesData('getcartapi',null)
              }
              if (fn==deletewish) {
                queryClient.setQueriesData('getwish',null)
              }
             

        }
    })
}
