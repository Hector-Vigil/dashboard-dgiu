import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TableModal from "../../components/charts/tableModal/tableModal";
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paperDark: {
    position: "absolute",
    backgroundColor: "#27293d",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    width: "75%",
    height: "50%",
    overflow: "auto",
  },
  paperLight: {
    position: "absolute",
    backgroundColor: "#fff",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    width: "75%",
    height: "50%",
    overflow: "auto",
  },
  modalHeaderDark: {
    color: "#f4f4f4",
    textAlign: "center",
    fontWeight: "lighter",
<<<<<<< HEAD
=======
  },
  modalHeaderLight: {
    color: "#3b3f51",
    textAlign: "center",
    fontWeight: "normal",
>>>>>>> 1f17a6f3ab79ecc96a0b0371a5c7cff67dff5639
  },
}));

export default function StudentsModal({
  openModal,
  studentsCloseModalHandler,
  data,
  darkMode,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  if (data) console.log(data);
  const body = (
<<<<<<< HEAD
    <div style={modalStyle} className={classes.paper}>
      <h2 className={classes.modalHeader}>ESTUDIANTES</h2>
      {data && <TableModal data={data} />}
=======
    <div
      style={modalStyle}
      className={darkMode ? classes.paperDark : classes.paperLight}
    >
      <h2
        className={
          darkMode ? classes.modalHeaderDark : classes.modalHeaderLight
        }
      >
        ESTUDIANTES
      </h2>
      {data && <TableModal darkMode={darkMode} data={data} />}
>>>>>>> 1f17a6f3ab79ecc96a0b0371a5c7cff67dff5639
      <StudentsModal />
    </div>
  );

  return (
    <Modal
      open={openModal}
      onClose={studentsCloseModalHandler}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {data ? body : null}
    </Modal>
  );
}
