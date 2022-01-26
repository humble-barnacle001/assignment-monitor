const Subject = ({ subject_id, data }) => {
    const { name, ...assignments } = data;
    return (
        <div key={subject_id}>
            <style jsx>
                {`
                    .hover:hover {
                        cursor: pointer;
                    }
                `}
            </style>
            <div className='d-flex flex-row justify-content-between'>
                <h2 className='p-10'>{name}</h2>
                <h3 className='p-10 my-auto'>
                    <span
                        className='hover text-danger'
                        onClick={(e) =>
                            console.log(
                                "delete subject",
                                subject_id,
                                e.target.id
                            )
                        }
                    >
                        <i className='bi bi-trash' id={subject_id}></i>
                    </span>
                </h3>
            </div>
            <div className='row'>
                <div className='col-11 col-lg-8 m-auto'>
                    {Object.keys(assignments).length > 0 ? (
                        <table className='table table-bordered'>
                            <thead>
                                <tr className='text-primary'>
                                    <th className='text-center'>Details</th>
                                    <th className='text-center'>Assigned On</th>
                                    <th className='text-center'>Submit By</th>
                                    <th className='text-center'>Done</th>
                                    <th className='text-center'>Edit</th>
                                    <th className='text-center d-none d-sm-flex'>
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(assignments).map(
                                    (assignment_id) => {
                                        const assignment =
                                            assignments[assignment_id];
                                        return (
                                            <tr key={assignment_id}>
                                                <td className='text-center text-secondary-dm'>
                                                    {assignment.details}
                                                </td>
                                                <td className='text-center'>
                                                    {new Date(
                                                        assignment.on
                                                    ).toLocaleString("en-IN", {
                                                        dateStyle: "short",
                                                    })}
                                                </td>
                                                <td className='text-center'>
                                                    {new Date(
                                                        assignment.by
                                                    ).toLocaleString("en-IN", {
                                                        dateStyle: "short",
                                                    })}
                                                </td>
                                                <td className='text-center'>
                                                    {assignment.done ? (
                                                        <i className='bi bi-check-square'></i>
                                                    ) : (
                                                        <span
                                                            className='m-auto hover'
                                                            onClick={(e) =>
                                                                console.log(
                                                                    "done",
                                                                    subject_id,
                                                                    e.target.id
                                                                )
                                                            }
                                                        >
                                                            <i
                                                                className='bi bi-square'
                                                                id={`done-${assignment_id}`}
                                                            ></i>
                                                        </span>
                                                    )}
                                                </td>
                                                <td className='text-center'>
                                                    <span
                                                        className='m-auto hover'
                                                        onClick={(e) =>
                                                            console.log(
                                                                "edit",
                                                                subject_id,
                                                                e.target.id
                                                            )
                                                        }
                                                    >
                                                        <i
                                                            className='bi bi-pencil'
                                                            id={`edit-${assignment_id}`}
                                                        ></i>
                                                    </span>
                                                </td>
                                                <td className='text-center d-none d-sm-flex'>
                                                    <span
                                                        className='text-danger m-auto hover'
                                                        onClick={(e) =>
                                                            console.log(
                                                                "delete",
                                                                subject_id,
                                                                e.target.id
                                                            )
                                                        }
                                                    >
                                                        <i
                                                            className='bi bi-x-lg'
                                                            id={`dele-${assignment_id}`}
                                                        ></i>
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <p className='text-center text-secondary'>
                            <b>Nothing added!! Add some data to start.</b>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Subject;
