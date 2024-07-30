import { ITripSummary } from "@/typings/trip";
import { fetcher } from "./fetchers";

export async function createTrip(url : string, {arg} : {arg : ITripSummary}) {
   console.log(arg, JSON.stringify(arg));
   await fetcher<ITripSummary>(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(arg)
   });
}