import React from 'react';

const Button = ({ label, onClick }) => {
    return (
        <button onClick={onClick} style={styles.button}>
            {label}
        </button>
    );
};

const styles = {
    button: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default Button;