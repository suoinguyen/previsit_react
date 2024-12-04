import React from 'react';

function Footer() {
  return (
    <div className="bg-[#0C1E1B] text-white py-[50px] md:py-[100px]">
      <div className="container">
        <footer className="flex justify-between items-center">
          <div className="flex flex-col md:px-10">
            <a href='https://buildaptive.com/'> 
              <img src="./images/common/logo_white.svg"></img>
            </a>
          </div>
          <div className="flex flex-col md:flex-row w-full text-right items-center">
            <div className="flex flex-col w-full md:px-10">
              <a href="https://twitter.com/BuildAptive" target="_blank" rel="noreferrer">Twitter</a>
            </div>
          <div className="flex flex-col w-full md:px-10">
            <a href="https://buildaptive.com/privacy">Privacy Policy</a>
          </div>
          <div className="flex flex-col w-full md:px-10">
            <a href="https://buildaptive.com/terms">Terms of Service</a>
          </div>
          <div className="flex flex-col w-full md:px-10">
            <a href="https://buildaptive.instatus.com/" target="_blank" rel="noreferrer">System Status</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
