import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
}


function TodoForm(props) {
    const { onSubmit } = props;

    function hanldeOnchange(e) {
        console.log(e.target.value);
        setValue(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!onSubmit) return;
        const formValues = {
            title: value,
        };
        onSubmit(formValues);

        setValue('');
    }

    const [value, setValue] = useState('');
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={hanldeOnchange} />
        </form>
    );

}

export default TodoForm;