import axios from "axios";

export async function getNotes(userDetails, updater) {
  console.log("Getting Notes ⏳");
  console.log(userDetails);
  let { data } = await axios.post(
    "https://sticky-note-fe.vercel.app/getUserNotes",
    userDetails
  );
  console.log(data);
  if (data.message === "success") {
    updater(data.Notes);
  }
}
