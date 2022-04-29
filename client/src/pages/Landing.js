import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/Testing';
import {Logo} from '../components';
import {Link} from 'react-router-dom';

const Landing = () => {
  return (
   <Wrapper>
   <nav>
     <Logo />
   </nav>
    <div className="container page">
        {/* info */}
      <div className="info">
        <h1>
         job <span> tracking </span> app
        </h1>
        <p>
        I'm baby enamel pin chambray semiotics hot chicken wayfarers lyft. Ugh raw denim marfa blue bottle glossier. Gastropub air plant etsy godard fingerstache, small batch lomo brunch vegan.
        </p>
        <Link to="/register" className="btn btn-hero">Login/Register</Link>
      </div>

      <img src={main} alt='job hunt' className='img main-img'/>

    </div>
  </Wrapper>
  )
}

export default Landing
