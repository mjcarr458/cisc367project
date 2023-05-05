import { CDBSlider, CDBContainer } from 'cdbreact';

const Slider = () => {
    return (
      <CDBContainer>
        <CDBSlider value={50} setValue={0} style={{ width: '100%' }} />
      </CDBContainer>
    );
  };
  export default Slider;