import React, { useContext, useState } from "react";
import { BookContent, BookMark, Colour, FontType, Tsize, View } from "../global";
import ScrollToTop from "../scroll";
import { IonCard, IonCardContent, IonAlert, IonToast, IonButton, IonButtons, IonToolbar, IonLabel } from "@ionic/react";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { CollectionsBookmark, ArrowBackSharp, MenuBookSharp } from "@material-ui/icons";
import { motion } from "framer-motion";

function Song(props) {
 let index2 = 1;
 let present2 = 0;
 let iarr2 = [];
 let left = false;
 let ztextr;
 const [showAlert3, setShowAlert3] = useState(false);
 const [showAlert4, setShowAlert4] = useState(false);
 const [bookMark, dispatch2] = useContext(BookMark);
 const [tsize, setTsize] = useContext(Tsize);
 let { path, url } = useRouteMatch();
 const [showToast, setShowToast] = useState(false);
 const [toastText, setToastText] = useState();
 let history = useHistory();
 let { songid } = useParams();
 let id = Number(songid);

 let inputs2 = [];
 bookMark.map((ele) => {
  inputs2.push({
   name: ele.name,
   type: "radio",
   label: ele.name,
   value: ele.name,
  });
 });
 inputs2.push({
  name: "New Bookmark",
  type: "radio",
  label: "New Bookmark",
  value: "New Bookmark",
 });

 const content = useContext(BookContent);

 function addtobookmark(folder) {
  let name = content[props.i1].chap.length > 0 ? content[props.i1].chap[props.i2].song[id].name.slice(3) : content[props.i1].song[id].name.slice(3);

  let check = false;
  bookMark.map((dele) => {
   if (dele.name === folder) {
    dele.songs.map((ele) => {
     if (ele.name === name) {
      check = true;
      setToastText("Song is already bookmark");
      setShowToast(true);
     }
    });
   }
  });
  if (!check) {
   dispatch2({ type: "add", folder: folder, name: name, path: url });

   setToastText("Added to the Bookmark");
   setShowToast(true);
  }
 }

 let id2 =
  content[props.i1].chap.length > 0
   ? id + 1 >= content[props.i1].chap[props.i2].song.length
     ? content[props.i1].chap[props.i2].eindex
     : content[props.i1].chap[props.i2].song[id + 1].index
   : id + 1 >= content[props.i1].song.length
   ? content[props.i1].inside.length
   : content[props.i1].song[id + 1].index;

 let fun2 =
  content[props.i1].chap.length > 0
   ? content[props.i1].inside.slice(content[props.i1].chap[props.i2].song[id].index, id2)
   : content[props.i1].inside.slice(content[props.i1].song[id].index, id2);

 while (true) {
  if (fun2.indexOf("Text " + index2.toString(), present2) !== -1) {
   present2 = fun2.indexOf("Text " + index2.toString(), present2);
   iarr2.push(index2.toString());
   index2++;
  } else {
   break;
  }
 }
 if (fun2.indexOf("(refrain)") !== -1) {
  ztextr = fun2.slice(fun2.indexOf("(refrain)"), fun2.indexOf("Text 1")).split(/\r\n|\n/);
 }

 const [clr, setClr] = useContext(Colour);
 let color;
 if (clr) color = "#FFEB3B";
 else color = "#00CBFE";
 let color2;
 if (clr) color2 = "";
 else color2 = "#04010f";
 const [view, setView] = useContext(View);

 let wwmb;
 if (view === "3" && fun2.indexOf(";") !== -1) wwmb = false;
 else wwmb = true;
 const [wwm, setWwm] = useState(wwmb);
 const [font, setFont] = useContext(FontType);
 let fon;
 if (!font) fon = "Calibri";
 else fon = "Times New Roman";

 return (
  <div>
   <ScrollToTop />
   <IonToolbar className="ionhead" color={clr ? "warning" : "primary"}>
    <IonButtons slot="start">
     <IonButton onClick={() => history.goBack()}>
      <ArrowBackSharp />
     </IonButton>
    </IonButtons>
    <IonButtons slot="start">
     <IonLabel style={{ fontFamily: `${fon}` }}>
      {content[props.i1].chap.length > 0 ? content[props.i1].chap[props.i2].song[id].name.slice(3) : content[props.i1].song[id].name.slice(3)}
     </IonLabel>
    </IonButtons>
    <IonButtons slot="end">
     <IonButton
      onclick={() => {
       setWwm(!wwm);
      }}
     >
      <MenuBookSharp />
     </IonButton>
    </IonButtons>
    <IonButtons slot="end" onClick={() => setShowAlert3(true)}>
     <IonButton>
      <CollectionsBookmark />
     </IonButton>
    </IonButtons>
   </IonToolbar>
   <motion.div
    exit={{
     opacity: 0,
    }}
    animate={{ opacity: 1 }}
    initial={{ opacity: 0 }}
    transition={{ type: "linear", duration: 1 }}
   >
    <div style={{ height: "32px" }}></div>

    {!wwm && fun2.indexOf(";") === -1 ? (
     <p style={{ backgroundColor: `${color}`, padding: "6px 0 4px 0", fontFamily: `${fon}` }}>
      <IonCard color={clr} style={{ color: `${color2}`, fontFamily: `${fon}` }}>
       <IonCardContent>
        <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>
         Sorry Prabhuji/Mataji, we are currently not having the word to word meanings for this Song/Song Book
        </p>
       </IonCardContent>
      </IonCard>
     </p>
    ) : (
     <p style={{ backgroundColor: `${color}`, padding: "6px 0 4px 0", fontFamily: `${fon}` }}>
      {fun2.indexOf("(refrain)") !== -1 ? (
       <IonCard color={clr} style={{ color: `${color2}`, fontFamily: `${fon}` }}>
        <IonCardContent>
         {ztextr.map((vad, i) => {
          if (vad.indexOf(";") !== -1) {
           left = true;
          }

          if (vad.indexOf(";") !== -1) {
           if (wwm) return null;

           let dk = vad.length - 1;

           while (vad[dk] === " ") {
            dk--;
           }

           if (vad.indexOf(".") === -1 && vad[dk] !== "!" && vad[dk] !== "?") {
            ztextr[i + 1] = ztextr[i].concat(ztextr[i + 1]);
           } else {
            return (
             <div>
              <br />
              <p style={{ fontSize: `${tsize}px` }}>{vad}</p>
             </div>
            );
           }
          } else if (left && vad.indexOf(";") === -1) {
           if (i !== ztextr.length - 1) {
            ztextr[i + 1] = ztextr[i].concat(ztextr[i + 1]);
           } else {
            return (
             <div>
              <br />
              <p style={{ fontSize: `${tsize}px` }}>{vad}</p>
             </div>
            );
           }
          } else {
           let start = 0;
           while (true) {
            if (vad[start] === " ") {
             start++;
            } else {
             break;
            }
           }

           if (fun2.indexOf(";") === -1 && (vad[start] === "“" || vad[start] === "." || (vad[start] >= "A" && vad[start] <= "Z"))) {
            if (i !== ztextr.length - 1) {
             ztextr[i + 1] = ztextr[i].concat(ztextr[i + 1]);
            } else {
             return (
              <div>
               <br />
               <p style={{ fontSize: `${tsize}px` }}>{vad}</p>
              </div>
             );
            }
           } else {
            return <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>{vad}</p>;
           }
          }
         })}
        </IonCardContent>
       </IonCard>
      ) : null}

      {iarr2.map((sent, i) => {
       let test = fun2.indexOf("Text " + iarr2[iarr2.length - 1]);

       if (fun2.indexOf("Text 1", test + 15) === -1) {
        let ind1 = fun2.indexOf("Text " + sent);
        let ind2 = i < iarr2.length - 1 ? fun2.indexOf("Text " + iarr2[i + 1]) : fun2.length;

        let zen = "";
        if (i < 9) {
         zen = fun2.slice(ind1 + 6, ind2);
        } else if (i < 100) {
         zen = fun2.slice(ind1 + 7, ind2);
        } else {
         zen = fun2.slice(ind1 + 8, ind2);
        }
        let ztext = zen.split(/\r\n|\n/);

        left = false;

        return (
         <IonCard color={clr} style={{ color: `${color2}`, fontFamily: `${fon}` }}>
          <IonCardContent>
           <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>Text {sent} </p>
           {ztext.map((vad, i) => {
            if (vad.indexOf(";") !== -1) {
             left = true;
            }

            if (vad.indexOf(";") !== -1) {
             if (wwm) return null;

             let dk = vad.length - 1;

             while (vad[dk] === " ") {
              dk--;
             }

             if (vad.indexOf(".") === -1 && vad[dk] !== "!" && vad[dk] !== "?") {
              ztext[i + 1] = ztext[i].concat(ztext[i + 1]);
             } else {
              return (
               <div>
                <br />
                <p style={{ fontSize: `${tsize}px` }}>{vad}</p>
               </div>
              );
             }
            } else if (left && vad.indexOf(";") === -1) {
             if (vad.indexOf("Text " + sent) !== -1) {
              vad = vad.replace("Text " + sent, "");
             }
             if (i !== ztext.length - 1) {
              ztext[i + 1] = ztext[i].concat(ztext[i + 1]);
             } else {
              return (
               <div>
                <br />
                <p style={{ fontSize: `${tsize}px` }}>{vad}</p>
               </div>
              );
             }
            } else {
             let start = 0;
             while (true) {
              if (vad[start] === " ") {
               start++;
              } else {
               break;
              }
             }

             if (fun2.indexOf(";") === -1 && (vad[start] === "“" || vad[start] === "." || (vad[start] >= "A" && vad[start] <= "Z"))) {
              if (vad.indexOf("Text " + sent) !== -1) {
               vad = vad.replace("Text " + sent, "");
              }
              if (i !== ztext.length - 1) {
               ztext[i + 1] = ztext[i].concat(ztext[i + 1]);
              } else {
               return (
                <div>
                 <br />
                 <p style={{ fontSize: `${tsize}px` }}>{vad}</p>
                </div>
               );
              }
             } else {
              return <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>{vad}</p>;
             }
            }
           })}
          </IonCardContent>
         </IonCard>
        );
       } else {
        let ind1 = fun2.indexOf("Text " + sent);
        let ind2 = i < iarr2.length - 1 ? fun2.indexOf("Text " + iarr2[i + 1]) : fun2.indexOf("Text 1 ", ind1);

        let zen = "";
        if (i < 9) {
         zen = fun2.slice(ind1 + 6, ind2);
        } else {
         zen = fun2.slice(ind1 + 7, ind2);
        }
        let ztext = zen.split(/\r\n|\n/);

        let ind3 = fun2.indexOf("Text " + sent, ind1 + 8);
        let ind4 = i < iarr2.length - 1 ? fun2.indexOf("Text " + iarr2[i + 1], ind2 + 8) : fun2.length;

        let zen1 = fun2.slice(ind3, ind4);
        let ztext1 = zen1.split(/\r\n|\n/);
        return (
         <IonCard color={clr} style={{ color: `${color2}`, fontFamily: `${fon}` }}>
          <IonCardContent>
           <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>Text {sent}</p>
           {ztext.map((vad, i) => {
            return <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>{vad}</p>;
           })}
           {ind3 !== -1 ? <br /> : <p></p>}
           {ztext1.map((vad1) => {
            if (vad1.indexOf("Text " + sent) !== -1) {
             vad1 = vad1.replace("Text " + sent, "");
            }
            return <p style={{ fontSize: `${tsize}px` }}>{vad1}</p>;
           })}
          </IonCardContent>
         </IonCard>
        );
       }
      })}
     </p>
    )}
    <div style={{ height: "34px" }}></div>
    <IonAlert
     isOpen={showAlert3}
     onDidDismiss={() => setShowAlert3(false)}
     cssClass="my-custom-class"
     header={"Select a Bookmark folder"}
     inputs={inputs2}
     buttons={[
      {
       text: "Cancel",
       role: "cancel",
       cssClass: "secondary",
       handler: () => {},
      },
      {
       text: "Ok",
       handler: (res) => {
        if (res === "New Bookmark") {
         setShowAlert4(true);
        } else {
         addtobookmark(res);
        }
       },
      },
     ]}
    />

    <IonAlert
     isOpen={showAlert4}
     onDidDismiss={() => setShowAlert4(false)}
     cssClass="my-custom-class"
     header={"New Bookamrk"}
     inputs={[{ name: "newmark", type: "text", placeholder: "New Bookmark" }]}
     buttons={[
      {
       text: "Cancel",
       role: "cancel",
       cssClass: "secondary",
       handler: () => {},
      },
      {
       text: "Ok",
       handler: (res) => {
        addtobookmark(res.newmark);
       },
      },
     ]}
    />
    <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message={toastText} duration={2000} />
   </motion.div>
  </div>
 );
}

export default Song;
