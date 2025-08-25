import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between relative overflow-hidden">
      <div 
        className="w-full h-full absolute inset-0"
        style={{
          backgroundImage: "url('/pages/2.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-end px-6">
        <button
          onClick={handleContinue}
          className="text-white font-medium transition-all duration-200 active:scale-95 mb-60"
          style={{
            background: '#FF6B35',
            borderRadius: '25px',
            padding: '16px 64px',
            fontSize: '18px',
            fontWeight: '500',
            border: 'none',
            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
            cursor: 'pointer',
            minWidth: '200px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#E55A2B';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FF6B35';
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default LandingPage;