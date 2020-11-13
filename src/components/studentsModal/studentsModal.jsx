import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TableRanking from '../../components/charts/tableRanking/table-ranking.component';

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
  paper: {
    position: 'absolute',
    backgroundColor: '#27293d',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 1000,
  },
  modalContainerVerified: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'auto',
    backgroundColor: 'lightgreen',
  },
  modalContainerNotVerified: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'auto',
    backgroundColor: '#f70d1a',
  },
}));

export default function StudentsModal({ openModal, studentsCloseModalHandler, data }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  if (data) console.log(data);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      {data &&
        data.map((student) => (
          <div className={student.registered ? classes.modalContainerVerified : classes.modalContainerNotVerified}>
            <span>{student.name}</span>
            <span>{student.lastName}</span>
            <span>{student.province}</span>
            <span>{student.zone}</span>
          </div>
        ))}
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
