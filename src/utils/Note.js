import axios from "axios";

const token =
  document.cookie
    .split(";")
    .filter((str) => str.trim().includes("token"))[0]
    ?.split("=")[1] || null;

const userInfo = JSON.parse(
  document.cookie
    .split(";")
    .filter((str) => str.trim().includes("userData"))[0]
    ?.split("=")[1]
);

export async function getNotes(updater) {
  const userDetails = {
    token,
    userID: userInfo._id,
  };

  let { data } = await axios.post(
    "https://sticky-note-fe.vercel.app/getUserNotes",
    userDetails
  );

  console.log("%c### Your Notes 👇", "background-color: #e2a937; color: #fff");
  console.log(data.Notes);
  if (data.message === "success") {
    updater(data.Notes);
  } else if (data.message === "no notes found") {
    updater([]);
  }
}

export async function deleteNote(NoteID, updater) {
  const deletedNoteInfo = {
    NoteID,
    token,
  };

  let { data } = await axios.delete(
    "https://sticky-note-fe.vercel.app/deleteNote",
    { data: deletedNoteInfo }
  );

  if (data.message == "deleted") {
    console.log("success");
    getNotes(updater);
  }
}

export async function updateNote(NoteID, title, desc, updater) {
  const updatedDetails = {
    title,
    desc,
    token,
    NoteID,
  };
  let { data } = await axios.put(
    "https://sticky-note-fe.vercel.app/updateNote",
    updatedDetails
  );

  console.log(data);

  if (data.message == "updated") {
    console.log("UPDATED DONE ✅");
    getNotes(updater);
  }
}
