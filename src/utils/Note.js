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
  console.log(data);
  if (data.message === "success") {
    updater(data.Notes);
  }
}

export async function deleteNote(e) {
  const deletedNoteInfo = {
    NoteID: e.target.closest(".note").dataset.id,
    token,
  };

  console.log({ deletedNoteInfo });

  let { data } = await axios.delete(
    "https://sticky-note-fe.vercel.app/deleteNote",
    { data: deletedNoteInfo }
  );

  console.log({ deleted_data: data });

  if (data.message == "deleted") {
    console.log("success");
    getNotes();
  }
}
