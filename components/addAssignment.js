import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useContext } from "react";
import { Context } from "../context";
import { addEditAssignment } from "../actions/transaction";

const AddAssignment = () => {
    const {
        state: { transaction },
    } = useContext(Context);

    return (
        <div
            className='modal'
            id='addAssignment'
            tabIndex='-1'
            role='dialog'
            data-overlay-dismissal-disabled='true'
            data-esc-dismissal-disabled='true'
        >
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    <button
                        className='btn close'
                        role='button'
                        aria-label='Close'
                        onClick={() =>
                            window.halfmoon.toggleModal("addAssignment")
                        }
                    >
                        <span aria-hidden='true'>&times;</span>
                    </button>
                    <h5 className='modal-title'>Add a new assignment</h5>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            let data = {};
                            Array.from(e.target).forEach(
                                (input) =>
                                    (data[input.id] =
                                        input.id.indexOf("done") != -1
                                            ? input.checked
                                            : ["by", "on"].includes(input.id) &&
                                              input.value
                                            ? new Date(input.value).getTime()
                                            : input.value)
                            );
                            const {
                                assignment: details,
                                by,
                                done,
                                on,
                                subject: subID,
                            } = data;
                            e.target.reset();
                            addEditAssignment(subID, { details, by, done, on });
                            window.halfmoon.toggleModal("addAssignment");
                        }}
                    >
                        <div className='form-group'>
                            <label htmlFor='subject' className='required'>
                                Subject
                            </label>
                            <div className='input-group'>
                                <select
                                    className='form-control'
                                    id='subject'
                                    required='required'
                                    defaultValue=''
                                >
                                    <option value='' disabled='disabled'>
                                        Select subject or add new subject
                                    </option>
                                    {transaction
                                        ? Object.keys(transaction).map(
                                              (subject_id) => (
                                                  <option
                                                      key={subject_id}
                                                      value={subject_id}
                                                  >
                                                      {
                                                          transaction[
                                                              subject_id
                                                          ].name
                                                      }
                                                  </option>
                                              )
                                          )
                                        : ""}
                                </select>
                                <div className='ml-5 input-group-append'>
                                    <span
                                        className='input-group-text rounded btn btn-danger'
                                        onClick={() =>
                                            window.halfmoon.toggleModal(
                                                "addSubject"
                                            )
                                        }
                                    >
                                        <i className='bi bi-plus-lg'></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='on' className='required'>
                                Assigned On
                            </label>
                            <DateTime
                                className='text-dark'
                                initialValue={new Date()}
                                inputProps={{ required: true, id: "on" }}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='by' className='required'>
                                Submit By
                            </label>
                            <DateTime
                                className='text-dark'
                                inputProps={{ required: true, id: "by" }}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='assignment' className='required'>
                                Assignment Details
                            </label>
                            <input
                                type='text'
                                id='assignment'
                                className='form-control'
                                placeholder='Short description of the assignment'
                                required='required'
                                autoComplete='none'
                                maxLength='30'
                            />
                        </div>
                        <div className='form-group'>
                            <div className='custom-switch'>
                                <input type='checkbox' id='done' />
                                <label htmlFor='done'>Assignment Done</label>
                            </div>
                        </div>
                        <input
                            className='btn btn-primary btn-block'
                            type='submit'
                            id='submitBtn'
                            value='Add'
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAssignment;
