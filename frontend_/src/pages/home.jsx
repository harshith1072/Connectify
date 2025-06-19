import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState('');
    const { addToUserHistory } = useContext(AuthContext);

    const handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    };

    return (
        <>
            {/* Inline CSS */}
            <style>{`
                body {
                    margin: 0;
                    font-family: 'Segoe UI', sans-serif;
                    background: linear-gradient(to right, #fdfbfb, #ebedee);
                }

                .navBar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 30px;
                    background-color: #a5d6a7;
                    color: #1b5e20;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }

                .navBar h2 {
                    margin: 0;
                    font-weight: 600;
                }

                .navBar p {
                    margin: 0 10px;
                    cursor: pointer;
                    font-weight: 500;
                }

                .meetContainer {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: calc(100vh - 70px);
                    padding: 40px;
                    gap: 80px;
                }

                .leftPanel {
                    max-width: 500px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    gap: 25px;
                }

                .leftPanel h2 {
                    font-size: 2.2rem;
                    color: #263238;
                }

                .meetingInput {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    width: 100%;
                }

                .rightPanel img {
                    width: 350px;
                    max-width: 100%;
                    animation: float 3s ease-in-out infinite;
                }

                @keyframes float {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0); }
                }

                .MuiOutlinedInput-root {
                    background: white;
                }

                .MuiButton-contained {
                    background-color: #66bb6a !important;
                    color: white !important;
                    font-weight: 600;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
            `}</style>

            {/* NavBar */}
            <div className="navBar">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h2>Connectify</h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        onClick={() => navigate('/history')}
                        style={{ color: '#1b5e20' }}
                    >
                        <RestoreIcon />
                    </IconButton>
                    <p
                        onClick={() => navigate('/history')}
                        style={{ color: '#1b5e20' }}
                    >
                        History
                    </p>

                    <Button
                        variant="contained"
                        onClick={() => {
                            localStorage.removeItem('token');
                            navigate('/auth');
                        }}
                        style={{
                            marginLeft: '10px',
                            backgroundColor: '#1b5e20',
                            color: 'white',
                        }}
                    >
                        LOGOUT
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="meetContainer">
                <div className="leftPanel">
                    <h2>Connect Face-to-Face,<br />Anywhere</h2>

                    <div className="meetingInput">
                        <TextField
                            onChange={(e) => setMeetingCode(e.target.value)}
                            id="outlined-basic"
                            label="Meeting Code"
                            variant="outlined"
                            fullWidth
                        />
                        <Button
                            onClick={handleJoinVideoCall}
                            variant="contained"
                            fullWidth
                        >
                            JOIN
                        </Button>
                    </div>
                </div>

                <div className="rightPanel">
                    <img src="/logo3.png" alt="Connectify Illustration" />
                </div>
            </div>
        </>
    );
}

export default withAuth(HomeComponent);
