'use strict'

// ?
/* helpers */
const insertAt = (base, toInsert, index) => base.substr(0, index) + toInsert + base.substr(index)

const applyRules = (html, type, rulesArray) => {
  for (let index = 0; index < rulesArray.length; index++) {
      const rule = rulesArray[index];
      if (rule.types == '*' || rule.types == type) html = rule.handler(html)
  }
return html
}
const applyRules1 = (html, type, rulesArray) => {
    for (let index = 0; index < rulesArray.length; index++) {
      const rule = rulesArray[index];
      if (rule.types == '*' || rule.types == type) html = rule.handler(html)
  }
return html
}
const applyRules2 = (html, type, rulesArray) => {
    for (let index = 0; index < rulesArray.length; index++) {
      const rule = rulesArray[index];
      if (rule.types == '*' || rule.types == type) html = rule.handler(html)
  }
return html
}
  // Règles
  const rules = [
      // pour tous


          //  any input that has type="number" must be changed to type="tel"
          {
              handler: html => html.replace(/type="number"/gm, 'type="tel"'),
              types: '*',
              stage: 'text'
          },
        //  if span or label has id then delete the id="..."
        {
          handler: html => {
              const s = new RegExp(/<span.*?.id=".*?".*?.>.+?<\/span>/gms)
              const l = new RegExp(/<label.*?.id=".*?".*?.>.+?<\/label>/gms)
              let _m
              const matches = []
              while (_m = s.exec(html)) {
                  matches.push(_m)
              }
              while (_m = l.exec(html)) {
                  matches.push(_m)
              }
              if (!matches.length) return html
                  const index = matches.length
              for (var i = 0; i < index; i++) {
                  if (index < 0) break;
                  let match = matches[i][0]
                  if(match.indexOf('<input') >-1 ) continue;
                  if (match.indexOf('id=') > -1) match = match.replace(/id=".*?"/gm, '')
                      html=html.replace(matches[i][0], match)
              }
              return html
          },
          types: '*',
          stage: 'text'
      },

      //         any select must have class selectstyle (and keep its other classes if it had others)
      {
          handler: html => {
              const s = new RegExp(/<select.*?.>/gms)
              let _m
              const matches = []
              while (_m = s.exec(html)) {
                  matches.push(_m)
              }
              if (!matches.length) return html
                  const index = matches.length
              for (var i = 0; i < index; i++) {
                  if (index < 0) break;
                  let match = matches[i][0]
                  if (match.indexOf('class=') > -1) match = match.replace(/class=".*?/gm, 'class="selectstyle ')
                    else  match = insertAt(match, 'class="selectstyle"', 8)
                      html=html.replace(matches[i][0], match)
              }
              return html
          },
          types: '*',
          stage: 'text'
      },

          // remplacer «£» → «&nbsp;»
          {
              handler: html => html.replace(/£/gi, '&nbsp;'),
              types: '*',
              stage: 'text'
          },
          // remplacer avec regex «<!-- Last Published ...»→ (rien)
          {
              handler: html => html.replace(/<!--.*Last Published.*?>/gm, ''),
              types: '*',
              stage: 'text'
          },
          // remplacer la chaine de caractères « w-form"» → «"»
          {
              handler: html => html.replace(/ w-form"/gmi, '"'),
              types: '*',
              stage: 'text'
          },
          // supprimer tous les « dataname="..."» → (rien)
          {
              handler: html => html.replace(/dataname=".*?"/gm, ''),
              types: '*',
              stage: 'text'
          },
          // CSS à ajouter avant la fin de </head>
          {
              handler: html => {
                  const toInsert = `
                  <link href="https://maxisetup.com/securites/css/verifications.min.css" rel="stylesheet" type="text/css">
                  <link href="css/css_cp_ville.css" rel="stylesheet" type="text/css">`
                  return insertAt(html, toInsert, html.indexOf('</head>') - 1)
              },
              types: '*',
              stage: 'text'
          },
          // <form id="formulaire" name="formulaire">
          {
              handler: html => html.replace(/<form id=".*?" name=".*?"/gm, '<form id="formulaire" name="formulaire"'),
              types: 'index',
              stage: 'text'
          },
            //  any id and name that has a uppercase letter must be changed to lowercase letters
            {
              handler: html => {
                  const id = new RegExp(/id=".*?"/gms)
                  const name = new RegExp(/name=".*?"/gms)
                  let _m
                  const matches = []
                  while (_m = id.exec(html)) {
                      matches.push(_m)
                  }
                  while (_m = name.exec(html)) {
                      matches.push(_m)
                  }
                  if (!matches.length) return html
                      const index = matches.length
                  for (var i = 0; i < index; i++) {
                      if (index < 0) break;
                      let match = matches[i][0]
                      if (match.indexOf('id=') > -1) match = match.toLowerCase()
                       html=html.replace(matches[i][0], match)
                   if (match.indexOf('name=') > -1) match = match.toLowerCase()
                       html=html.replace(matches[i][0], match)

               }
               return html
           },
           types: '*',
           stage: 'text'
       },

       //  any input that has the follow id must respect the following rules :
        {
          handler: html => {
            const input = new RegExp(/<input.*?>/gms)
          
            let _m
            const matches = []
            while (_m = input.exec(html)) {
                matches.push(_m)
            }
            
            if (!matches.length) return html
                const index = matches.length
            for (var i = 0; i < index; i++) {
              if (index < 0) break;
              let match = matches[i][0]
              if (match.indexOf('id=') > -1) {
                let match_id = match.match(/id=".*?"/gm)
                if(match_id[0].match(/(prenom|nom|email|tel|telportable|adresse|cp|ville|ville_auto|cp_et_ville|ddn|annee_naissance|input1|input20|commentaire)/g)){
                    match = match.replace(/name=".*?"/gm,'')
                    var name = match_id[0].replace(/id="/gm,'')
                    match = insertAt(match, 'name="'+name+' ', 7)
                }
              }
              html=html.replace(matches[i][0], match)
           }
           return html
           },
           types: '*',
           stage: 'text'
        },
        {
          handler: html => {
            const input = new RegExp(/<input.*?id="civ.*?".*?>.*?<span>/gm)
             let inp

             while(inp = input.exec(html)){
              // if(inp.indexOf(inp[0])>-1){
                  let match = inp[0]
                  if (match.indexOf('id="civ1"') > -1) {
                      match = match.replace(/name=".*?"/gm, '')
                      match = match.replace(/value=".*?"/gm, '')
                      match = match.replace(/id=".*?"/gm, 'id="civ1" name="civ" value="homme"')
                      match = match.replace(/<span>/gm, '<span for="civ1"')
                      
                  }
                  if (match.indexOf('id="civ2"') > -1) {
                      match = match.replace(/name=".*?"/gm, '')
                      match = match.replace(/value=".*?"/gm, '')
                      match = match.replace(/id=".*?"/gm, 'id="civ2" name="civ" value="femme"')
                      match = match.replace(/<span>/gm, '<span for="civ2"')
                      
                  }
                  html= html.replace(inp[0], match)
              // } 
            } return html
          
           },
           types: '*',
           stage: 'text'
        },

          // Tous les target sont des target="_blank"
          {
              handler: html => html.replace(/target=".*?"/gm, 'target="_blank"'),
              types: '*',
              stage: 'text'
          },
      // pour index

          // Ajouter les input hidden
          {
              handler: html => {
                  const toInsert = `
                  <input type='hidden' name="maxv1" id="maxv1" />
                  <input type='hidden' name="maxv2" id="maxv2" />
                  <input type='hidden' name="maxv3" id="maxv3" />
                  <input type='hidden' name="maxv4" id="maxv4" />
                  <input type='hidden' name="maxv5" id="maxv5" />
                  <input type='hidden' name="maxv6" id="maxv6" />
                  <input type='hidden' name="maxv7" id="maxv7" />
                  <input type='hidden' name="maxv8" id="maxv8" />
                  <input type='hidden' name="maxv9" id="maxv9" />
                  <input type='hidden' name="maxv10" id="maxv10" />
                  <input type='hidden' name="maxv11" id="maxv11" />
                  <input type='hidden' name="maxv12" id="maxv12" />
                  <input type='hidden' name="maxv13" id="maxv13" />
                  <input type='hidden' name="maxv14" id="maxv14" />
                  <input type='hidden' name="maxv15" id="maxv15" />
                  <input type="hidden" name="sms" id="sms" />
                  <input type="hidden" name="p1" id="p1" />
                  <input type="hidden" name="p2" id="p2" />
                  <input type="hidden" name="p3" id="p3" />
                  <input type="hidden" name="p4" id="p4" />
                  <input type="hidden" name="p5" id="p5" />
                  <input type="hidden" name="levier" id="levier" />
                  <input type="hidden" name="cam" id="cam" />
                  <input type="hidden" name="ver" id="ver" />
                  <input type="hidden" name="crea" id="crea" />
                  <input type="hidden" name="part" id="part" />
                  <input type="hidden" name="bas" id="bas" />
                  <input type="hidden" name="sc" id="sc" />
                  <input type="hidden" name="offer_id" id="offer_id" />
                  <input type="hidden" name="file_id" id="file_id" />
                  <input type="hidden" name="aff_id" id="aff_id" />
                  <input type="hidden" name="source" id="source" />`

                  const r = new RegExp(/<input.*?>/gm)
                  let _m
                  const matches = []
                  while (_m = r.exec(html)) {
                      matches.push(_m)
                  }

                  if (!matches.length) return html

                      const postition = matches[matches.length - 1]['index'] + matches[matches.length - 1][0].length

                  return insertAt(html, toInsert, postition)
              },
              types: 'index',
              stage: 'text'
          },
          // Ajouter le onclick à la Charte de confidentialité
          {
              handler: html => {
                  const subst = ` onClick="window.open('chartes/REMPLACERCHARTE.html','charte','resizable,height=800,width=600'); return false;">`;
                  let match1 = html.match(/<a.*?>Charte.*?/gm)
                 if ( match1 != null)
                  for (var i = 0; i < match1.length; i++) {
                      let match = match1[i].replace(/>/gm,subst)
                      html=html.replace(match1[0], match)
                  }
                  return html
              },
              types: 'index',
              stage: 'text'
          },
          // pour le CTA final, id="cta" et onclick="verif(); return false"
          {
              handler: html => {
                  const subst = `id="cta" onclick="verif(); return false"`
                  let match1 = html.match('<a.*?id="cta".*?>.+?</a>','gm')
                  if ( match1 != null)
                  for (var i = 0; i < match1.length; i++) {
                      let match = match1[i].replace(/id=".*?"/gm, subst)
                      html=html.replace(match1[0], match)
                  }
                  return html
              },
              types: 'index',
              stage: 'text'
          },
          // supprimer les div w-form-fail et w-form-done
          {
              handler: html => html.replace(/<div class="w-form-(fail|done)">\s+<div>[^<>]+<\/div>\s+<\/div>/gm, ''),
              types: '*',
              stage: 'text'
          },
          // ajouter inclusions JS
          {
            handler: html => {
                const toInsert = `
                <script type="text/javascript" src="https://maxisetup.com/campagnes/REMPLACERINSTRUCTIONS/instructions.js"></script>
                <script type="text/javascript" src="https://maxisetup.com/securites/js/securites.js"></script>
                <script type="text/javascript" src="https://maxisetup.com/securites/js/verifications.js"></script>
                <script type="text/javascript" src="https://www.maxisetup.com/securites/js/pouriframe.js"></script>`
                return insertAt(html, toInsert, html.indexOf('</body>') - 1)
            },
            types: 'index',
            stage: 'text'
        },
        {
            handler: html => {
                const toInsert = `
                <script type="text/javascript" src="https://maxisetup.com/campagnes/REMPLACERINSTRUCTIONS/instructions.js"></script>
                <script type="text/javascript" src="https://maxisetup.com/securites/js/securites.js"></script>
                <script type="text/javascript" src="https://maxisetup.com/securites/js/verifications.js"></script>
                <script type="text/javascript" src="https://www.maxisetup.com/securites/js/pouriframe.js"></script>`
                return insertAt(html, toInsert, html.indexOf('</body>') - 1)
            },
            types: 'confirmation_num',
            stage: 'text'
        },
            // ajouter pixel de clic
            {
                handler: html => {
                    const toInsert = `

                    <script type="text/javascript">
                    var hasoffers_domain = "https://tracking.maxiweb.co";
                    </script>
                    <script type="text/javascript" src="https://media.go2app.org/assets/js/dl.js"></script>`
                    return insertAt(html, toInsert, html.indexOf('</body>') - 1)
                },
                types: 'index',
                stage: 'text'
            },
        // confirmation
        {
            handler: html => {
                const toInsert = `
                ‍<!-- Offer Conversion -->
                <iframe src="https://tracking.maxiweb.co/aff_l?offer_id=<?=$_GET['offer_id'];?>&adv_sub=<?=$_GET['rd'];?>" scrolling="no" frameborder="0" width="1" height="1"></iframe>
                <!-- // End Offer Conversion -->`
                return insertAt(html, toInsert, html.indexOf('</body>') - 1)
            },
            types: 'confirmation',
            stage: 'text'
        },
        {
            handler: html => {
                const toInsert = `
                ‍<!-- Offer Conversion -->
                <iframe src="https://tracking.maxiweb.co/aff_l?offer_id=<?=$_GET['offer_id'];?>&adv_sub=<?=$_GET['rd'];?>" scrolling="no" frameborder="0" width="1" height="1"></iframe>
                <!-- // End Offer Conversion -->`
                return insertAt(html, toInsert, html.indexOf('</body>') - 1)
            },
            types: 'confirmation_num',
            stage: 'text'
        },
        {
            handler: html => {
                const toInsert = `
                ‍<!-- Offer Conversion -->
                <iframe src="https://tracking.maxiweb.co/aff_l?offer_id=<?=$_GET['offer_id'];?>&adv_sub=<?=$_GET['rd'];?>" scrolling="no" frameborder="0" width="1" height="1"></iframe>
                <!-- // End Offer Conversion -->`
                return insertAt(html, toInsert, html.indexOf('</body>') - 1)
            },
            types: 'conftransition',
            stage: 'text'
        },
            // to copy) add iframe before 
            {
                handler: html => {
                    const toInsert = `
                    ‍<div id="iframe-maxi" style="display:none;position:fixed;height:100vh;z-index:999999;">
                    <?php $file ="https://maxisidebox.com/maxipop_[[A CHOISIR SELON LA THEMATIQUE]].html"; readfile($file);?>
                    </div>
                    <script src="https://maxisidebox.com/maxipop.js" type="text/javascript"></script>`
                    return insertAt(html, toInsert, html.indexOf('</body>') - 1)
                },
                types: 'confirmation',
                stage: 'text'
            },
            {
                handler: html => {
                    const toInsert = `
                    ‍<div id="iframe-maxi" style="display:none;position:fixed;height:100vh;z-index:999999;">
                    <?php $file ="https://maxisidebox.com/maxipop_[[A CHOISIR SELON LA THEMATIQUE]].html"; readfile($file);?>
                    </div>
                    <script src="https://maxisidebox.com/maxipop.js" type="text/javascript"></script>`
                    return insertAt(html, toInsert, html.indexOf('</body>') - 1)
                },
                types: 'confirmation2',
                stage: 'text'
            },
            {
             handler: html => html.replace(/>partenaires<\/a>/gm, ' onClick="window.open(\'PARTENAIRES\',\'charte\',\'resizable,height=800,width=600\'); return false;">partenaires<\/a>'),
             types: '*',
             stage: 'text'
         },
         {
             handler: html => html.replace(/<a>Mentions légales (CCWA)<\/a>/gm, '<a href="https://www.google.com" target="_blank">Mentions légales (CCWA)</a>'),
             types: '*',
             stage: 'text'
         },
         {
             handler: html => html.replace(/<a>Mentions légales<\/a>/gm, '<a href="MLANNONCEUR" target="_blank">Mentions légales</a>'),
             types: '*',
             stage: 'text'
         },
         {
             handler: html => html.replace(/<a>Mentions légales (Annonceur 1)<\/a>/gm, '<a href="MLANNONCEUR1" target="_blank">Mentions légales (Annonceur 1)</a>'),
             types: '*',
             stage: 'text'
         },
         {
             handler: html => html.replace(/<a>Mentions légales (Annonceur 2)<\/a>/gm, '<a href="MLANNONCEUR2" target="_blank">Mentions légales (Annonceur 2)</a>'),
             types: '*',
             stage: 'text'
         },

         ]   
         const rules1 = [
      // pour tous

      {
          handler: html => {
            const toInsert = `
            ‍<script>
            $(document).ready(function(){
                $('form').attr('data-type','multiblock');
                var form_div = $('form').children('div');
                for (var i = 0; i < form_div.length; i++) {

                    $(form_div[i]).removeAttr('class');
                    $(form_div[i]).attr('class','blocetape ');
                    $(form_div[i]).removeAttr('id');
                    $(form_div[i]).attr('id','bloc'+(i+1));
                    if(i>0) $(form_div[i]).addClass('hide');
                    var radio = $(form_div[i]).children('input [type="radio"]');
                    if(radio.length >0)
                        for (var j = 0; j < radio.length; i++) {
                            $(radio[j]).removeAttr('data-now');
                            $(radio[j]).attr('data-now','bloc'+(i+1));
                            $(radio[j]).removeAttr('data-next');
                            $(radio[j]).attr('data-next','bloc'+(i+2));
                        }
                        else{
                            var a_next = $(form_div[i]).children('a [id="next"]');
                            if(a_next.length>0)
                                {   $(a_next[0]).removeAttr('data-now');
                            $(a_next[0]).removeAttr('data-next');
                            $(a_next[0]).attr('data-now','bloc'+(i+1));
                            $(a_next[0]).attr('data-next','bloc'+(i+2));
                        }
                        var a_prev = $(form_div[i]).children('a [id="previous"]');
                        if(a_prev.length>0)
                            {   $(a_prev[0]).removeAttr('data-now');
                        $(a_prev[0]).removeAttr('data-old');
                        $(a_prev[0]).attr('data-now','bloc'+(i+1));
                        $(a_prev[0]).attr('data-old','bloc'+(i));
                    }
                }

            }

        })
        </script>`
        return insertAt(html, toInsert, html.indexOf('</body>') - 1)
    },
    types: 'Multi-Step',
    stage: 'text'
},

]

const rules2 = [
        {
          handler: html => {
            const url = ["REMPLACERCHARTE","PARTENAIRES", "MLANNONCEUR","MLANNONCEUR1","MLANNONCEUR2","REMPLACERINSTRUCTIONS"]
            const new_url = ["","", "https://www.google.com","","",""]
            for (var i = 0; i < url.length; i++) {
               html= html.replace(url[i],new_url[i])
            }
            const toInsert = `
               <?php $source = substr($_GET['source'], 0, -4); ?>`;
               const script = new RegExp(/<script.*?id="PMCcontainerMQBL".*?>/gmi)
               let ind = script.exec(html)
               if(ind!=null){
                var index =  html.indexOf(ind[0]) - 1;
                   html=insertAt(html, toInsert, index)
               }
                
            const toInsert1 = `&idaud=<?=$source;?>`;
                const script1 = new RegExp(/";pmcS/gmi)
                let ind1= script1.exec(html)
                if(ind1!=null)
               {
                var index =  html.indexOf(ind1[0]) - 1;
                   html=insertAt(html, toInsert1, index)
                   
               }
                
            return html;
            },
            types: 'Assuragency-Iframe',
            stage: 'text'
        },
        {
          handler: html => {
            const url = ["REMPLACERCHARTE","PARTENAIRES", "MLANNONCEUR","MLANNONCEUR1","MLANNONCEUR2","REMPLACERINSTRUCTIONS"]
            const new_url = ["https://www.google.com","", "https://www.google.com","","","cpf_anglais"]
            for (var i = 0; i < url.length; i++) {
               html= html.replace(url[i],new_url[i])
            }
            const old_id = ["12moistravail_oui","12moistravail_non", "cpfutilise_oui","cpfutilise_non","cpfutilise_nsp",
            "niveau_mauvais","niveau_moyen","niveau_bon","niveau_excellent","joignable_matin",
            "joignable_apresmidi","joignable_soir"]           

            const new_id = ["choix1a","choix1b","choix2a","choix2b","choix2c","choix3a",
            "choix3b","choix3c","choix3d","choix4a","choix4b","choix4c"]
            for (var j = 0; j < old_id.length; j++) {
               html = changeAt(html, old_id[j], new_id[j])
            }
                         
             return html
         },
                
           
            types: 'Dedeco-CPF',
            stage: 'text'
        },
        {
          handler: html => {
            const url = ["REMPLACERCHARTE","PARTENAIRES", "MLANNONCEUR","MLANNONCEUR1","MLANNONCEUR2","REMPLACERINSTRUCTIONS"]
            const new_url = ["https://www.google.com","https://www.google.com", "","https://www.google.com","","multiclient_pinel"]
            for (var i = 0; i < url.length; i++) {
               html= html.replace(url[i],new_url[i])
            }
            // replace input 
            const old_id = ["impot_moins_2500","impot_entre_2500_5000", "impot_entre_5000_10000","impot_plus_10000","situation_celibataire_concubinage",
            "situation_marie_pacse","situation_veuf","situation_divorce"]           

            const new_id = ["choix1a","choix1b","choix1c","choix1d","choix2a","choix2b",
            "choix2c","choix2d"]
                for (var j = 0; j < old_id.length; j++) {
                   html = changeAt(html, old_id[j], new_id[j])
                }
                    
             return html
         },
           
            types: 'MultiClient-Pinel',
            stage: 'text'
        },
    // for the input that has id="revenu", id & name = "input1" and required=""
        {
          handler: html => {
            const input = new RegExp(/<input.*?id="revenu".*?>/gmi)
               let inp = input.exec(html)
               if(inp!=null){
                if(inp.indexOf(inp[0])>-1){
                    let match = inp[0]
                    if (match.indexOf('id=') > -1) {
                        match = match.replace(/name=".*?"/gm, '')
                        match = match.replace(/id=".*?"/gm, 'id="input1" name="input1" required')
                    }
                    return html.replace(inp[0], match)
                } return html
            } return html
          },
            types: 'MultiClient-Pinel',
            stage: 'text'
        },
// for the input that has id="codesms", id & name = "codesms", for the next <a> afterwards id="cta_sms"
        {
          handler: html => {
            const input = new RegExp(/<input.*?id="codesms".*?>.*?<a/gmi)
               let inp = input.exec(html)
               if(inp!=null){
                if(inp.indexOf(inp[0])>-1){
                    let match = inp[0]
                    if (match.indexOf('id=') > -1) {
                        match = match.replace(/name=".*?"/gm, '')
                        match = match.replace(/id=".*?"/gm, 'id="codesms" name="codesms"')
                        match = match.replace(/<a/gm, '<a id="cta_sms" ')
                    }
                    return html.replace(inp[0], match)
                } return html
            } return html
          },
            types: 'MultiClient-Pinel',
            stage: 'text'
        },

//        for the input that has id="new_telephone", id & name ="new_telephone", for the next <a> afterwards id="renvoyer_sms".
        {
          handler: html => {
            const input = new RegExp(/<input.*?id="new_telephone".*?>.*?<a/gmi)
               let inp = input.exec(html)
               if(inp!=null){
                if(inp.indexOf(inp[0])>-1){
                    let match = inp[0]
                    if (match.indexOf('id=') > -1) {
                        match = match.replace(/name=".*?"/gm, '')
                        match = match.replace(/id=".*?"/gm, 'id="new_telephone" name="new_telephone"')
                        match = match.replace(/<a/gm, '<a id="renvoyer_sms" ')
                    }
                    return html.replace(inp[0], match)
                } return html
            } return html
          },
            types: 'MultiClient-Pinel',
            stage: 'text'
        },
//          just before this input id="new_telephone", add
//          <input type="hidden" name="id_lead" id="id_lead" value="<?=$_GET['idl'];?>" >

        {
            handler: html => {
                const toInsert = `
                ‍<input type="hidden" name="id_lead" id="id_lead" value="<?=$_GET['idl'];?>" >`
                const input = new RegExp(/<input.*?id="new_telephone"/gmi)
               let inp = input.exec(html)
               if(inp!=null){
                if(inp.indexOf(inp[0])>-1){
                    return insertAt(html, toInsert, html.indexOf(inp[0]) - 1)
                }}
                return html
            },
            types: 'MultiClient-Pinel',
            stage: 'text'
        },
    //   just after this input id="new_telephone", add
    //   <input type="hidden" name="verifcode" id="verifcode" value='<?php echo $sms; ?>' />
         {
            handler: html => {
                const toInsert = `
                ‍<input type="hidden" name="verifcode" id="verifcode" value='<?php echo $sms; ?>' />`
                const input = new RegExp(/<input.*?id="new_telephone".*?>/gmi)
               let inp = input.exec(html)
               if(inp!=null){
                if(inp.indexOf(inp[0])>-1){
                    return insertAt(html, toInsert, html.indexOf(inp[0]) +inp[0].length)
                }}
                return html
            },

            types: 'MultiClient-Pinel',
            stage: 'text'
        },

    //    in INDEX,
    //                     add below the input hidden previously added
//                         <?php session_start(); $siteKey = "maxiweb".$_GET['offer_id']; $_SESSION['ca'] = date('is');?>
//                         <input type="hidden" name="ac_id" id="ac_id" value="<?=$siteKey;?>"/>
        {
            handler: html => {
                var type = document.querySelector('#type-select').value
                if(type=='index'){
                    const toInsert = `
                    ‍<?php session_start(); $siteKey = "maxiweb".$_GET['offer_id']; $_SESSION['ca'] = date('is');?>`
                    const input = new RegExp(/<input type="hidden" name="ac_id" id="ac_id" value=".*?".*?>/gmi)
                   let inp = input.exec(html)
                   if(inp!=null){
                    if(inp.indexOf(inp[0])>-1){
                        return insertAt(html, toInsert, html.indexOf(inp[0]) +inp[0].length)
                    }}
                    return html
                }else return html
                
            },

            types: 'MultiClient-Pinel',
            stage: 'text'
        },

//       in CONFIRMATION_NUM,
//                     add before the doctype
//                         
        {
            handler: html => {
                var type = document.querySelector('#type-select').value
                if(type=='confirmation_num'){
                    const toInsert = `
                    ‍<?php  $sms = base64_decode($_GET['sms']);?>`
                        return insertAt(html, toInsert, 0)
                }else return html
                
            },

            types: 'MultiClient-Pinel',
            stage: 'text'
        },

        // add before </body>
        {
            handler: html => {
                var type = document.querySelector('#type-select').value
                if(type=='confirmation_num'){
                    const toInsert = `
                    ‍<?php if( (date('Y') - $_GET['annee']) >= 25 && (date('Y') - $_GET['annee']) <= 55 ) { ?>
                           <iframe src="https://tracking.maxiweb.co/aff_l?offer_id=<?=$_GET['offer_id'];?>&adv_sub=<?=$_GET['rd'];?>" scrolling="no" frameborder="0" width="1" height="1"></iframe>
                        <? } ?>
`
                        return insertAt(html, toInsert, html.indexOf('</body>') - 1)
                }else return html
                
            },

            types: 'MultiClient-Pinel',
            stage: 'text'
        },

//                 in CONFIRMATION,
//                     add before </body>
        {
            handler: html => {
                var type = document.querySelector('#type-select').value
                if(type=='confirmation'){
                    const toInsert = `
                   <?php if ($_SESSION['sms'] == 1) {
                             include("confirm.php");
                            session_destroy();        
                       } ?>`
                        return insertAt(html, toInsert, html.indexOf('</body>') - 1)
                }else return html
                
            },

            types: 'MultiClient-Pinel',
            stage: 'text'
        },
        // DELETE the lead pixel
        {
            handler: html => {
                var type = document.querySelector('#type-select').value
                if(type=='confirmation'){
                    const start = new RegExp(/<!--.Offer.Conversion.-->/gmi)
                    const end = new RegExp(/<!--.*?End.Offer.Conversion.-->/gmi)
                    // const iframe = new RegExp(/<iframe.*>.*?<.iframe>/)
                    let start1 = start.exec(html)
                    let end1 = end.exec(html)
                    // let iframe1 = iframe.exec(html)
                       if(start1!=null&&end1!=null){
                        var index_start = html.indexOf(start1)
                        var index_end = html.indexOf(end1)+end1[0].length
                        html=html.substr(0,index_start-1)+html.substr(index_end)
                        return html
                      }
                }else return html
                
            },

            types: 'MultiClient-Pinel',
            stage: 'text'
        },
        



]

const changeAt = (html, old_id, new_id) =>{
    const input = new RegExp('<input.*?id="'+old_id+'".*?>.*?<span>','gmi')
       let inp = input.exec(html)
       if(inp!=null){
        if(inp.indexOf(inp[0])>-1){
            let match = inp[0]
            var new_id = new_id
            var new_name = new_id.substr(0,new_id.length-1)
            if (match.indexOf('id=') > -1) {
                match = match.replace(/name=".*?"/gm, '')
                match = match.replace(/value=".*?"/gm, '')
                match = match.replace(/id=".*?"/gm, 'id="'+new_id+'" name="'+new_name+'" value="'+old_id+'"')
                match = match.replace(/<span>/gm, '<span for="'+new_id+'"')
                
            }
            return html.replace(inp[0], match)
        } return html
    } return html
}

var downloadFile = function(filename, content) {
  const blob = new Blob([content], { type: 'text/plain' });

// let photo = document.getElementById("image-file").files[0];
    // var data = new FormData();
    // data.append("data" , blob);
    // var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
    // xhr.open( 'post', '/converterphp/controll.php', true );
    // xhr.send(data);
  // const a = document.createElement('a');
  // a.setAttribute('download', filename);
  // a.setAttribute('href', window.URL.createObjectURL(blob));
  // a.click();
var formdata = new FormData();
formdata.append("file", blob); 
formdata.append("file_name",filename);
  var ajax = new XMLHttpRequest();
     ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          const a = document.createElement('a');
          a.setAttribute('download', filename);
          a.setAttribute('href', window.URL.createObjectURL(blob));
          a.click();
        }
      };

    ajax.open("POST", "/converterphp/controll.php");
    ajax.send(formdata); 
  
      //  var formData = new FormData();
      // formData.append('file', blob);

      //   var xhttp = new XMLHttpRequest();
      //   xhttp.onreadystatechange = function() {
      //     if (this.readyState == 4 && this.status == 200) {
           
      //     }
      //   };
      //   xhttp.open("POST", "/converterphp/controll.php", true);
      //   xhttp.send(formData);
};

const fileSelector = document.querySelector('#customFile');
const typeSelector = document.querySelector('#type-select');
const typeFormSelector = document.querySelector('#type-form-select');
const typeClientSelector = document.querySelector('#type-client-select');
let fileList = []
let name = ''
const buttonSelector = document.querySelector('#validate-btn');

fileSelector.addEventListener('change', (e) => {
  fileList = e.target.files;
  name = e.target.value
});

buttonSelector.addEventListener('click', (e) => {
  e.stopPropagation()
  let reader = new FileReader();
  reader.onload = function(event) {
      var html = applyRules(event.target.result, typeSelector.value, rules)
      html = applyRules1(html, typeFormSelector.value, rules1)
      html = applyRules2(html, typeClientSelector.value, rules2)
      let filename = name.split('\\')
      filename = filename[filename.length - 1]
      filename = 'updated-' + filename
      downloadFile(filename, html)
  };

  if(fileList[0]) reader.readAsText(fileList[0]);
  return false
})   


