import React from 'react';

const Awards = () => {
    return (
        <div style={{ 
            height: '100vh',
            width: '100%',
            backgroundImage: 'url(/cssupernovapic.jpg)',
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            overflowY: 'auto',
            padding: '2vh 5vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            opacity: 1.2,
          }}>
        <div style={styles.container}>
            <p style={{color: 'white', textAlign: 'center', fontSize: '45px', marginTop: '8%', marginLeft: '15%', marginRight: '15%', fontWeight: 'bold'}}>
        Awards
      </p>
            <p style={styles.description}>Welcome to the Awards page. Showcase your achievements here!</p>
        </div>
        </div>
    );
};

export default Awards;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
    },
    description: {
        fontSize: '18px',
        textAlign: 'center',
        color:'white',
        fontWeight:'bold',
    },
};