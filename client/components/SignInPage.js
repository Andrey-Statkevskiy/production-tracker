export const SignInPage = () => {
    return (
    <div className='signInContainer'>
      <h1 style={{ margin: '50px 0 150px 0' }}>Sign-in as...</h1>
      <div className='signInButtonContainer'>
        <button type="button" className="blueButton">Assembly Technician</button>
        <button className='blueButton'>Production Leader</button>
        <button className='blueButton'>TV</button>
      </div>
    </div>
  )
}

export default SignInPage;