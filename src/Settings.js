import React from 'react';

const Settings = () => {
    return (
        // Main container with background image and app background common styles
    <div style={{ 
            height: '100vh',
            width: '100%',
            backgroundImage: 'url(/cssupernovapic.jpg)', // Add the background image
            backgroundSize: 'cover', //  image covers the entire area
            backgroundPosition: 'center', // Center the image
            overflowY: 'auto',
            padding: '2vh 5vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            opacity: 1.2,
          }}>
{/*Header with description text and styles for settings page*/}
        <div style={styles.pageSet}>
        <p style={{color: 'white', textAlign: 'center', fontSize: '45px', marginTop: '8%', marginLeft: '15%', marginRight: '15%', fontWeight: 'bold'}}>
    Settings
  </p>
        <p style={styles.descriptionSet}> Come back soon to make an account with Eureka! </p>
        </div>
    </div>
    );
};

export default Settings;
//styles of header and description
const styles = {
    pageSet: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        color: 'white',
        fontWeight:'bold',
    },
    descriptionSet: {
        fontSize: '18px',
        textAlign: 'center',
    },
};