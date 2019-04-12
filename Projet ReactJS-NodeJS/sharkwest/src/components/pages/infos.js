import React, { Component } from 'react';

class AProposPage extends Component 
{
    render() 
    {
        return (
            <div className="container">
            <div class="row">
         
            <div class="col-lg-1 ">
            </div>
            <div class="col-lg-10 contenu_page_apropos ">
            <h1>A propos</h1><br/>
            <h3 class="title_page_apropos"><i class="fa fa-info-circle"></i> Qui sommes-nous ?</h3><br/>
            <p>Texte expliquant qui nous sommes, les études que<br/>
            nous faisons, dans quelle l'ecole/entreprise nous <br/>
            sommes, etc ...</p>
            <h3 class="title_page_apropos"><i class="fa fa-info-circle"></i> Pourquoi SHARKWEST ?</h3><br/>
            <p>Texte expliquant comment nous est venu l'idée de<br/>
            SHARKWEST, pourquoi ce nom, quels sont les enjeux, <br/>
            la portée, le perimetre du projet,...</p>
            <h3 class="title_page_apropos"><i class="fa fa-info-circle"></i> Comment nous contacter ?</h3><br/>
            <p>Par mail : contact-sharkwest@gmail.com</p>
              
              
            </div>
            <div class="col-lg-1 text-center"></div>
        </div>  
        </div>      
          



        );
    }
}
export default AProposPage;