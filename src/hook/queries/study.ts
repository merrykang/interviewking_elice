import { useQuery } from "@tanstack/react-query";

export const studyServiceKeys = {
  useGetStudyInfo: ["getInfoStudyData"],
};

export const useGetStudyInfo = () => {
  return useQuery<any>(studyServiceKeys.useGetStudyInfo, getInfoStudyData, {
    staleTime: Infinity,
  });
};
