import { useQuery } from "@tanstack/react-query";
import { getGlobal } from "../queries";
import { keys } from "../keys";
import { defaultOptionsReactQuery } from "./utils";

export const useGetGlobal = () => {
  return useQuery({
    queryKey: [keys.GLOBAL],
    queryFn: getGlobal,
    ...defaultOptionsReactQuery,
  });
};
