import { addSubject } from "../actions/transaction";

const AddSubject = () => {
    return (
        <div
            className='modal'
            id='addSubject'
            tabIndex='-2'
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
                            window.halfmoon.toggleModal("addSubject")
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
                                (input) => (data[input.id] = input.value)
                            );
                            const { addsubject: name } = data;
                            e.target.reset();
                            addSubject({ name });
                            window.halfmoon.toggleModal("addSubject");
                        }}
                    >
                        <div className='form-group'>
                            <label htmlFor='addsubject' className='required'>
                                Subject Name
                            </label>
                            <input
                                type='text'
                                id='addsubject'
                                className='form-control'
                                placeholder='Subject Name'
                                required='required'
                                autoComplete='none'
                                maxLength='30'
                            />
                        </div>
                        <input
                            className='btn btn-primary btn-block'
                            type='submit'
                            id='subject-submitBtn'
                            value='Add'
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddSubject;
