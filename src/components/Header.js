import React, {useEffect} from 'react';

function Header() {
  useEffect(() => {
    document.getElementById('hamberger-menu').addEventListener('click', function handleClick(event) {
      const is_active = document.querySelector('.header-navigation-wrap').classList.contains('active')
      if (is_active){
          document.querySelector('.header-navigation-wrap').classList.remove('active')
      }else{
          document.querySelector('.header-navigation-wrap').classList.add('active')
      }
      
    })
    document.querySelector('.close-navigation').addEventListener('click', function handleClick(event) {
      document.querySelector('.header-navigation-wrap').classList.remove('active')
    })
    
    document.getElementById('form-get-access').addEventListener('submit', function handleClick(event) {
      event.preventDefault()

      let email = document.getElementById('input-email').value
      if (!email){
        alert('Please type the email!')

        return
      }
      
      submitForm()
      async function submitForm() {
        let form_Data = new FormData()
        form_Data.append("email", email)
        const url = "https://manage.kmail-lists.com/ajax/subscriptions/subscribe?a=XGuCL9&g=V7TVVH";
        try {
          const response = await fetch(url, {
            method: "POST",
            body: form_Data
          });

          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
      
          const json = await response.json();
          console.log(json);

          if (json.success == true){
            alert('Thank you! Someone from our team will be in touch.')
            document.getElementById('input-email').value = ""
          }
        } catch (error) {
          console.error(error.message);
        }
      }
    })

    
  }, [])

  return (
    <div id='header-wrap' className="py-2 sticky w-full top-0 bg-white z-[9999] shadow-md">
      <div className="containerX flex justify-between">
        <a className='max-w-[180px] lg:max-w-[200px] w-[40%] md:w-auto self-center mr-3 md:mr-5' href='https://buildaptive.com/'>
          <img className="max-h-[30px]" src="./images/common/logo.svg" alt="BuildAptive"></img>
        </a>
        
        <div className="flex header-navigation-wrap">
          <ul className="header-navigation flex md:justify-center lg:w-auto lg:order-none">
            <span className="close-navigation"></span>
          </ul>
          <div className="w-full flex flex-wrap items-center text-[12px] xs:text-xs xl:text-base mb-4 lg:m-0">
            <a href='https://dashboard.ea.buildaptive.com/'
               className="flex justify-center items-center  px-[15px] md:px-[18px] h-[30px] text-[12px] md:text-[14px] leading-[15px] md:leading-[18px] rounded-[10px] md:w-auto ml-0 lg:ml-5 mr-2 lg:mr-0 whitespace-nowrap border-gray-300 bg-white border-solid border-[1px] transition-all"
               type="submit">
              Sign In
            </a>
            <form method='POST' action='' id='form-get-access'
                  className="w-full lg:w-auto flex items-center justify-left lg:justify-center mt-3 lg:mt-0 md:flex-row md:self-center text-center relative z-10 aos-init aos-animate h-[30px] ml-0 lg:ml-5 mr-2 lg:mr-0">
              <input name="email" type="email" required="true" id="input-email"
                     className="h-full text-[14px] py-0 px-[10px] rounded-tl-[10px] rounded-bl-[10px] bg-white text-black border-solid border-[1px] border-r-0 border-white lg:border-tertiary lg:w-[250px]"
                     placeholder="Enter Your Email"/>
              <button id="btn-get-access" type='submit'
                  className="h-full text-[14px] py-0 px-[10px] font-bold md:w-auto whitespace-nowrap rounded-none rounded-tr-[10px] rounded-br-[10px] border-white lg:border-tertiary bg-tertiary text-white border-solid border-[1px] transition-all hover:bg-tertiary"
                  >Get Access
              </button>
            </form>
          </div>
        </div>

        <div className="flex items-center lg:hidden ml-[20px] cursor-pointer " id="hamberger-menu">
          <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="fill-gray-500" d="M1.78223 2.50781H18.209C18.6484 2.50781 19.0088 2.14746 19.0088 1.70801C19.0088 1.26855 18.6484 0.916992 18.209 0.916992H1.78223C1.34277 0.916992 0.991211 1.26855 0.991211 1.70801C0.991211 2.13867 1.34277 2.50781 1.78223 2.50781ZM1.78223 6.46289H18.209C18.6484 6.46289 19.0088 6.10254 19.0088 5.67188C19.0088 5.22363 18.6484 4.86328 18.209 4.86328H1.78223C1.34277 4.86328 0.991211 5.22363 0.991211 5.67188C0.991211 6.10254 1.34277 6.46289 1.78223 6.46289ZM1.78223 10.4268H18.209C18.6484 10.4268 19.0088 10.0664 19.0088 9.61816C19.0088 9.17871 18.6484 8.82715 18.209 8.82715H1.78223C1.34277 8.82715 0.991211 9.1875 0.991211 9.61816C0.991211 10.0576 1.34277 10.4268 1.78223 10.4268Z" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Header;
