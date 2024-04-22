import mainBG from '../../Assets/signUp/mainBG.png';

const SignInUpImageContainer = () => {
  return (
    <div className="signUp-image-container d-none d-lg-block">
      <div className="image-title">Trade with confidence</div>
      <img src={mainBG} alt="Trade with confident" />
    </div>
  );
};

export default SignInUpImageContainer;
