import axios from "axios";
import { useMutation, useQuery } from "react-query";

const referralsAPI = () => axios.get("/referrals");

export const fetchReferrals = () => {
  return useQuery("ALL_REFERRALS", referralsAPI);
};
