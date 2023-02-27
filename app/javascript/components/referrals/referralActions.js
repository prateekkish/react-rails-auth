import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchReferralsKey = "ALL_REFERRALS";

const referralsFetchAPI = () => axios.get("/referrals");

const referralsCreateAPI = (referral) => axios.post("/referrals", { referral });

export const fetchReferrals = () => {
  return useQuery(fetchReferralsKey, referralsFetchAPI);
};

export const createReferral = () => {
  const queryClient = useQueryClient();

  return useMutation(referralsCreateAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(fetchReferralsKey);
    },
  });
};
