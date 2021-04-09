import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <section className="footer">
      <div className="row align-items-center justify-content-center">
        <footer className="page-footer font-small cyan darken-3">
          <div className="container">
            <div className="row">
              <div className="col-md-12 py-5">
                <div className="mb-2 flex-center">
                  <a href="https://www.facebook.com/mohammad.farhad.988?lst=100007808041474%3A100007808041474%3A1537619482">
                    <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                  </a>

                  <a href="https://twitter.com/farhad_wahed">
                    <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                  </a>

                  <a href="https://www.linkedin.com/in/mohammad-farhad-aa3b39194">
                    <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                  </a>

                  <a href="https://www.instagram.com/wahed_farhad">
                    <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-center">
            © 2021 Copyright: WAHED'S; All right reserved
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
