import React from 'react';

const Awards = () => {
    return (
        // Main container with background image and app background common styles
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
            {/*Header with description and styles for awards page*/}
        <div style={styles.pageAward}>
            <p style={{color: 'white', textAlign: 'center', fontSize: '45px', marginTop: '8%', marginLeft: '15%', marginRight: '15%', fontWeight: 'bold'}}>
        Awards
      </p>
            <p style={styles.descriptionAward}>Welcome to the Awards page. Showcase your achievements here!</p>
        </div>
        </div>
    );
};

export default Awards;
//styles of header and description
const styles = {
    pageAward: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
    },
    descriptionAward: {
        fontSize: '18px',
        textAlign: 'center',
        color:'white',
        fontWeight:'bold',
    },
};